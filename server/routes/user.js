const express = require('express');
const router = express.Router();
const { insertUser, findAll, findByPhone, updateUser } = require('../models/User');

// 保存用户信息
router.post('/users', (req, res) => {
  try {
    const { name, company, position, phone, email, ticket_type } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        code: -1,
        message: '姓名和手机号为必填项'
      });
    }

    // 检查手机号是否已注册
    const existing = findByPhone.get(phone);
    
    if (existing) {
      // 已存在则更新
      updateUser.run(name, company, position, email, ticket_type, existing.id);
      
      return res.json({
        code: 0,
        message: '更新成功',
        data: { id: existing.id }
      });
    }

    // 新增用户
    const result = insertUser.run(name, company, position, phone, email, ticket_type);

    res.json({
      code: 0,
      message: '报名成功',
      data: { id: result.lastInsertRowid }
    });

  } catch (error) {
    console.error('保存用户失败:', error);
    res.status(500).json({
      code: -1,
      message: '服务器错误，请稍后重试'
    });
  }
});

// 获取用户列表
router.get('/users', (req, res) => {
  try {
    const users = findAll.all();
    
    res.json({
      code: 0,
      data: users,
      total: users.length
    });

  } catch (error) {
    console.error('获取用户列表失败:', error);
    res.status(500).json({
      code: -1,
      message: '服务器错误'
    });
  }
});

// 根据手机号查询用户
router.get('/users/:phone', (req, res) => {
  try {
    const user = findByPhone.get(req.params.phone);
    
    if (!user) {
      return res.status(404).json({
        code: -1,
        message: '未找到该用户'
      });
    }

    res.json({ code: 0, data: user });

  } catch (error) {
    console.error('查询用户失败:', error);
    res.status(500).json({ code: -1, message: '服务器错误' });
  }
});

module.exports = router;
