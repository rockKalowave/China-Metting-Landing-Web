/**
 * 微信支付配置
 * 
 * 使用前请替换以下配置为你的真实商户信息：
 * 1. mchid - 商户号
 * 2. serialNo - 商户API证书序列号（登录商户平台 -> 账户中心 -> API安全 查看）
 * 3. privateKeyPath - 商户API证书私钥文件路径
 * 4. apiv3Key - APIv3密钥（32字节，商户平台设置）
 * 5. appid - 公众号/小程序 AppID（JSAPI支付需要）
 * 6. notifyUrl - 支付回调通知地址
 */

const path = require('path');

module.exports = {
  // 商户号
  mchid: process.env.WX_MCHID || 'your_merchant_id',

  // 公众号/小程序 AppID（JSAPI/H5 支付需要）
  appid: process.env.WX_APPID || 'your_app_id',

  // 商户API证书序列号
  serialNo: process.env.WX_SERIAL_NO || 'your_serial_no',

  // 商户API证书私钥路径（pem格式）
  privateKeyPath: path.resolve(__dirname, '../certs/apiclient_key.pem'),

  // APIv3密钥（32位字符串）
  apiv3Key: process.env.WX_APIV3_KEY || 'your_apiv3_key_32bytes',

  // 支付结果通知地址（必须可公网访问）
  notifyUrl: process.env.WX_NOTIFY_URL || 'https://yourdomain.com/api/pay/notify',
};
