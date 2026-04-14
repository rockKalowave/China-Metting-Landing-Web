const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user');
const payRouter = require('./routes/pay');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 原始体中间件（支付回调需要）
app.use('/api/pay/notify', bodyParser.raw({ type: 'application/json' }));

// API 路由
app.use('/api', userRouter);
app.use('/api/pay', payRouter);

// 健康检查
app.get('/', (req, res) => {
  res.json({
    name: 'KACE 2026 Server',
    status: 'running',
    endpoints: [
      'POST   /api/users           - 保存/更新用户信息',
      'GET    /api/users           - 获取用户列表',
      'GET    /api/users/:phone    - 查询用户',
      'POST   /api/pay/h5          - H5支付下单（外部浏览器）',
      'POST   /api/pay/jsapi       - JSAPI支付下单（微信内）',
      'POST   /api/pay/notify      - 微信支付回调通知',
      'GET    /api/pay/query/:no   - 查询支付状态',
      'POST   /api/pay/close       - 关闭未支付订单',
    ],
  });
});

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║     KACE 2026 Server Running           ║
║     http://localhost:${PORT}               ║
╚════════════════════════════════════════╝

用户接口:
  POST   /api/users           - 保存报名信息
  GET    /api/users           - 获取用户列表
  GET    /api/users/:phone    - 查询用户

微信支付(v3):
  POST   /api/pay/h5          - H5支付（浏览器）
  POST   /api/pay/jsapi       - JSAPI支付（微信内）
  POST   /api/pay/notify      - 支付结果通知
  GET    /api/pay/query/:no   - 查询订单状态
  POST   /api/pay/close       - 关闭订单

H5支付请求示例:
POST /api/pay/h5
{
  "out_trade_no": "KACE_13800138000_1712345678",
  "total": 1299,
  "description": "KACE 2026 尊享VIP票"
}
  `);
});
