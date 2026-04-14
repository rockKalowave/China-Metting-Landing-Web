const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API 路由
app.use('/api', userRouter);

// 健康检查
app.get('/', (req, res) => {
  res.json({
    name: 'KACE 2026 Server',
    status: 'running',
    endpoints: [
      'POST /api/users - 保存/更新用户信息',
      'GET /api/users - 获取用户列表',
      'GET /api/users/:phone - 查询用户'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════╗
║     KACE 2026 Server Running          ║
║     http://localhost:${PORT}              ║
╚═══════════════════════════════════════╝

API 接口:
  POST /api/users   - 保存报名信息
  GET  /api/users   - 获取用户列表  
  GET  /api/users/:phone - 查询用户

请求示例:
POST /api/users
{
  "name": "张三",
  "company": "Kalodata",
  "position": "产品经理",
  "phone": "13800138000",
  "email": "zhangsan@kalodata.com",
  "ticket_type": "VIP通票"
}
  `);
});
