# KACE 2026 Server - Node.js 后端接口

## 项目结构

```
server/
├── index.js           # 服务入口文件
├── package.json       # 依赖配置
├── models/
│   └── User.js        # 用户模型（SQLite）
└── routes/
    └── user.js        # 用户接口路由
```

## 快速开始

### 安装依赖

```bash
cd server
npm install
```

### 启动服务

```bash
# 开发模式（自动重启）
npm run dev

# 生产模式
npm start
```

服务运行在 `http://localhost:3000`

## API 接口文档

### 1. 保存/更新用户信息

**POST** `/api/users`

**请求体：**
```json
{
  "name": "张三",           // 必填
  "company": "Kalodata",   // 选填
  "position": "产品经理",   // 选填
  "phone": "13800138000",  // 必填（唯一）
  "email": "zhangsan@kalodata.com",  // 选填
  "ticket_type": "VIP通票"  // 选填
}
```

**响应：**
```json
{
  "code": 0,
  "message": "报名成功",
  "data": { "id": 1 }
}
```

### 2. 获取用户列表

**GET** `/api/users`

**响应：**
```json
{
  "code": 0,
  "data": [...],
  "total": 10
}
```

### 3. 查询用户

**GET** `/api/users/:phone`

**响应：**
```json
{
  "code": 0,
  "data": { ... }
}
```

## 数据库

使用 **SQLite** 存储数据，数据库文件位于 `server/data/kace.db`

**用户表结构：**
| 字段 | 类型 | 说明 |
|------|------|------|
| id | INTEGER | 主键 |
| name | TEXT | 姓名 * |
| company | TEXT | 公司名称 |
| position | TEXT | 职位 |
| phone | TEXT | 手机号 * (唯一) |
| email | TEXT | 邮箱 |
| ticket_type | TEXT | 票种类型 |
| status | TEXT | 状态 (pending/paid/cancelled) |
| created_at | TEXT | 创建时间 |
| updated_at | TEXT | 更新时间 |

## 前端调用示例

```javascript
// 提交报名表单
async function submitForm(formData) {
  try {
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    const result = await response.json();
    
    if (result.code === 0) {
      alert('报名成功！');
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error('提交失败:', error);
  }
}

// 使用示例
submitForm({
  name: '张三',
  company: 'Kalodata',
  position: '产品经理',
  phone: '13800138000',
  email: 'zhangsan@kalodata.com',
  ticket_type: 'VIP通票'
});
```
