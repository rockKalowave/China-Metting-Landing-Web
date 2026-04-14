const express = require('express');
const router = express.Router();
const { insertUser, findAll, findByPhone, updateUser } = require('../models/User');

// 保存用户信息
router.post('/users', (req, res) => {
  const { name, company, position, phone, email, ticket_type } = req.body;

  if (!name || !phone) {
    return res.status(400).json({
      code: -1,
      message: '姓名和手机号为必填项'
    });
  }

  // 检查手机号是否已注册
  findByPhone(phone, (err, existing) => {
    if (err) {
      console.error('查询用户失败:', err);
      return res.status(500).json({ code: -1, message: '服务器错误，请稍后重试' });
    }

    if (existing) {
      // 已存在则更新
      updateUser(name, company, position, email, ticket_type, existing.id, (updateErr) => {
        if (updateErr) {
          console.error('更新用户失败:', updateErr);
          return res.status(500).json({ code: -1, message: '服务器错误，请稍后重试' });
        }
        return res.json({ code: 0, message: '更新成功', data: { id: existing.id } });
      });
    } else {
      // 新增用户
      insertUser(name, company, position, phone, email, ticket_type, (insertErr, result) => {
        if (insertErr) {
          console.error('新增用户失败:', insertErr);
          return res.status(500).json({ code: -1, message: '服务器错误，请稍后重试' });
        }
        return res.json({ code: 0, message: '报名成功', data: { id: result.lastID } });
      });
    }
  });
});

// 获取用户列表
router.get('/users', (req, res) => {
  findAll((err, users) => {
    if (err) {
      console.error('获取用户列表失败:', err);
      return res.status(500).json({ code: -1, message: '服务器错误' });
    }
    res.json({ code: 0, data: users, total: users.length });
  });
});

// 根据手机号查询用户
router.get('/users/:phone', (req, res) => {
  findByPhone(req.params.phone, (err, user) => {
    if (err) {
      console.error('查询用户失败:', err);
      return res.status(500).json({ code: -1, message: '服务器错误' });
    }
    if (!user) {
      return res.status(404).json({ code: -1, message: '未找到该用户' });
    }
    res.json({ code: 0, data: user });
  });
});

module.exports = router;
