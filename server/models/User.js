
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../database.db');
const db = new sqlite3.Database(dbPath);

// 创建用户信息表
db.run(`
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
function findAll(callback) {
  db.all(`SELECT * FROM users ORDER BY created_at DESC`, callback);
}

// 根据手机号查询
function findByPhone(phone, callback) {
  db.get(`SELECT * FROM users WHERE phone = ?`, [phone], callback);
}

// 新增用户
function insertUser(name, company, position, phone, email, ticket_type, callback) {
  db.run(
    `INSERT INTO users (name, company, position, phone, email, ticket_type) VALUES (?, ?, ?, ?, ?, ?)`,
    [name, company, position, phone, email, ticket_type],
    function (err) {
      callback(err, this);
    }
  );
}

// 更新用户
function updateUser(name, company, position, email, ticket_type, id, callback) {
  db.run(
    `UPDATE users SET name = ?, company = ?, position = ?, email = ?, ticket_type = ?, updated_at = datetime('now','localtime') WHERE id = ?`,
    [name, company, position, email, ticket_type, id],
    function (err) {
      callback(err, this);
    }
  );
}

module.exports = {
  db,
  insertUser,
  findAll,
  findByPhone,
  updateUser
};
