const express = require('express');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const WxPayPlugin = require('wechatpay-axios-plugin');
const wxpayConfig = require('../config/wxpay');

const router = express.Router();

// ==================== 工具函数 ====================

/** 读取商户私钥（用于 JSAPI 调起支付签名） */
function getMerchantPrivateKey() {
  const pem = fs.readFileSync(wxpayConfig.privateKeyPath).toString();
  return crypto.createPrivateKey(pem);
}

/**
 * JSAPI 调起支付签名（与 API 签名格式不同，参数顺序为 appId+timeStamp+nonceStr+package）
 */
function jsapiSign(appId, timeStamp, nonceStr, packageVal) {
  const signStr = `${appId}\n${timeStamp}\n${nonceStr}\n${packageVal}\n`;
  const privateKey = getMerchantPrivateKey();
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(signStr);
  return sign.sign(privateKey, 'base64');
}

/** AES-256-GCM 解密回调数据 */
function decryptResource(resource, apiv3Key) {
  const { ciphertext, associated_data, nonce } = resource;
  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    Buffer.from(apiv3Key, 'utf8'),
    Buffer.from(nonce, 'utf8'),
    { authTagLength: 16 }
  );
  decipher.setAAD(Buffer.from(associated_data || '', 'utf8'));
  let decrypted = decipher.update(Buffer.from(ciphertext, 'base64'), undefined, 'utf8');
  decrypted += decipher.final('utf8');
  return JSON.parse(decrypted);
}

/**
 * 创建微信支付 Axios 实例
 * wechatpay-axios-plugin 自动处理请求签名、响应验签
 */
function getWxPayClient() {
  const merchantPrivateKey = getMerchantPrivateKey();

  // 微信平台证书公钥（用于验签，生产环境必填）
  const certPath = path.resolve(__dirname, '../certs/apiclient_cert.pem');
  let wechatpayCertificate = null;
  try {
    wechatpayCertificate = fs.readFileSync(certPath).toString();
  } catch {
    console.warn('[wxpay] 未找到平台证书文件:', certPath, '(生产环境必须配置)');
  }

  return new WxPayPlugin(
    null,
    {
      merchantId: wxpayConfig.mchid,
      serialNo: wxpayConfig.serialNo,
      merchantPrivateKey: merchantPrivateKey,
      certs: wechatpayCertificate ? { [wxpayConfig.serialNo]: wechatpayCertificate } : undefined,
    }
  );
}

// ==================== H5 支付 ====================

router.post('/h5', async (req, res) => {
  try {
    const { out_trade_no, total, description } = req.body;
    if (!out_trade_no || !total) {
      return res.status(400).json({ code: -1, message: '缺少订单号或金额' });
    }

    const wxpay = getWxPayClient();
    const result = await wxpay.post({
      url: '/v3/pay/transactions/h5',
      data: {
        appid: wxpayConfig.appid,
        mchid: wxpayConfig.mchid,
        description: description || 'KACE 2026 展会门票',
        out_trade_no,
        notify_url: wxpayConfig.notifyUrl,
        amount: { currency: 'CNY', total: Math.round(total) },
        scene_info: {
          payer_client_ip: req.ip || '127.0.0.1',
          h5_info: { type: 'Wap', app_name: 'KACE 2026', app_url: req.headers.origin || '' },
        },
      },
    });

    if (result.h5_url) {
      return res.json({ code: 0, data: { h5_url: result.h5_url, out_trade_no } });
    }

    console.error('H5 下单失败:', result);
    res.status(400).json({ code: -1, message: result.message || '创建支付订单失败', detail: result });

  } catch (error) {
    console.error('H5 支付异常:', error);
    const msg = error?.response?.data?.message || error.message || '服务器错误';
    res.status(500).json({ code: -1, message: msg });
  }
});

// ==================== JSAPI 支付 ====================

router.post('/jsapi', async (req, res) => {
  try {
    const { out_trade_no, total, description, openid } = req.body;
    if (!out_trade_no || !total || !openid) {
      return res.status(400).json({ code: -1, message: '缺少订单号、金额或openid' });
    }

    const wxpay = getWxPayClient();
    const result = await wxpay.post({
      url: '/v3/pay/transactions/jsapi',
      data: {
        appid: wxpayConfig.appid,
        mchid: wxpayConfig.mchid,
        description: description || 'KACE 2026 展会门票',
        out_trade_no,
        notify_url: wxpayConfig.notifyUrl,
        payer: { openid },
        amount: { currency: 'CNY', total: Math.round(total) },
      },
    });

    if (result.prepay_id) {
      // 用原生 crypto 生成 JSAPI 调起支付的签名
      const payTimestamp = String(Math.floor(Date.now() / 1000));
      const payNonceStr = crypto.randomBytes(16).toString('hex');
      const packageVal = `prepay_id=${result.prepay_id}`;
      const paySign = jsapiSign(wxpayConfig.appid, payTimestamp, payNonceStr, packageVal);

      return res.json({
        code: 0,
        data: {
          appId: wxpayConfig.appid,
          timeStamp: payTimestamp,
          nonceStr: payNonceStr,
          package: packageVal,
          signType: 'RSA',
          paySign,
          out_trade_no,
        },
      });
    }

    console.error('JSAPI 下单失败:', result);
    res.status(400).json({ code: -1, message: result.message || '创建支付订单失败', detail: result });

  } catch (error) {
    console.error('JSAPI 支付异常:', error);
    const msg = error?.response?.data?.message || error.message || '服务器错误';
    res.status(500).json({ code: -1, message: msg });
  }
});

// ==================== 支付结果通知（回调）====================

router.post('/notify', async (req, res) => {
  try {
    const headers = req.headers;
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    // 1. 验签
    const timestamp = headers['wechatpay-timestamp'];
    const nonce = headers['wechatpay-nonce'];
    const signature = headers['wechatpay-signature'];

    if (!timestamp || !nonce || !signature) {
      return res.status(401).json({ code: 'FAIL', message: '缺少验签信息' });
    }

    // 构建验签串并验证
    const signStr = `${timestamp}\n${nonce}\n${JSON.stringify(body)}\n`;

    try {
      const certPath = path.resolve(__dirname, '../certs/wechatpay_cert.pem');
      const publicKey = fs.readFileSync(certPath);
      const verify = crypto.createVerify('RSA-SHA256').update(signStr);

      if (!verify.verify(publicKey, signature, 'base64')) {
        console.error('微信支付回调验签失败');
        return res.status(401).json({ code: 'FAIL', message: '验签失败' });
      }
    } catch (verifyErr) {
      console.warn('验签跳过（未配置平台证书 wechatpay_cert.pem）:', verifyErr.message);
      // 开发环境可跳过，生产环境必须在 certs/ 下放置微信平台证书
    }

    // 2. 解密支付数据
    const decrypted = decryptResource(body.resource, wxpayConfig.apiv3Key);

    console.log('=== 支付通知 ===');
    console.log('交易状态:', decrypted.trade_state);
    console.log('订单号:', decrypted.out_trade_no);
    console.log('微信单号:', decrypted.transaction_id);
    console.log('支付金额:', decrypted.amount?.total);

    // 3. 更新用户订单状态
    if (decrypted.trade_state === 'SUCCESS') {
      const User = require('../models/User');
      User.findByPhone(decrypted.out_trade_no.replace('KACE_', ''), (err, user) => {
        if (!err && user) {
          User.db.run(
            "UPDATE users SET status = 'paid', updated_at = datetime('now','localtime') WHERE id = ?",
            [user.id],
            () => {}
          );
        }
      });
    }

    // 4. 必须返回 SUCCESS
    res.json({ code: 'SUCCESS', message: '成功' });

  } catch (error) {
    console.error('支付回调异常:', error);
    res.status(500).json({ code: 'FAIL', message: '处理失败' });
  }
});

// ==================== 查询订单 ====================

router.get('/query/:outTradeNo', async (req, res) => {
  try {
    const { outTradeNo } = req.params;
    const wxpay = getWxPayClient();

    const result = await wxpay.get({
      url: `/v3/pay/out-trade-no/${outTradeNo}/mchid/${wxpayConfig.mchid}`,
    });

    res.json({
      code: 0,
      data: {
        trade_state: result.trade_state,
        trade_state_desc: result.trade_state_desc,
        transaction_id: result.transaction_id,
        amount: result.amount,
        out_trade_no: result.out_trade_no,
      },
    });

  } catch (error) {
    console.error('查询订单异常:', error);
    const msg = error?.response?.data?.message || error.message || '查询失败';
    res.status(500).json({ code: -1, message: msg });
  }
});

// ==================== 关闭订单 ====================

router.post('/close', async (req, res) => {
  try {
    const { out_trade_no } = req.body;
    if (!out_trade_no) {
      return res.status(400).json({ code: -1, message: '缺少订单号' });
    }

    const wxpay = getWxPayClient();
    await wxpay.post({
      url: `/v3/pay/out-trade-no/${out_trade_no}/close`,
      data: { mchid: wxpayConfig.mchid },
    });

    res.json({ code: 0, message: '关闭成功' });

  } catch (error) {
    console.error('关闭订单异常:', error);
    const msg = error?.response?.data?.message || error.message || '关闭失败';
    res.status(500).json({ code: -1, message: msg });
  }
});

module.exports = router;
