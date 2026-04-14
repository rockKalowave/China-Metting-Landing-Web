
// const sqlite3 = require('sqlite3').verbose();

// const Database = require('better-sqlite3');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, '../database.db');
// 正确创建实例
const db = new sqlite3.Database(dbPath);
// 创建用户信息表
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    company TEXT,
    position TEXT,
    phone TEXT NOT NULL UNIQUE,
    email TEXT,
    ticket_type TEXT,
    status TEXT DEFAULT 'pending',
    created_at TEXT DEFAULT (datetime('now', 'localtime')),
    updated_at TEXT DEFAULT (datetime('now', 'localtime'))
  )
`);

// 查询所有用户
const findAll = db.prepare(`
  SELECT * FROM users 
  ORDER BY created_at DESC
`);

// 根据手机号查询
const findByPhone = db.prepare(`
  SELECT * FROM users WHERE phone = ?
`);

// 新增用户
const insertUser = db.prepare(`
  INSERT INTO users (name, company, position, phone, email, ticket_type) 
  VALUES (?, ?, ?, ?, ?, ?)
`);

// 更新用户
const updateUser = db.prepare(`
  UPDATE users 
  SET name = ?, company = ?, position = ?, email = ?, ticket_type = ?, updated_at = datetime('now', 'localtime')
  WHERE id = ?
`);

module.exports = {
  db,
  insertUser,
  findAll,
  findByPhone,
  updateUser
};
