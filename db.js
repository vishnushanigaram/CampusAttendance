// db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',       // Replace with your MySQL username
  password: 'vkt@1028',   // Replace with your MySQL password
  database: 'campus_attendance',     // Make sure this matches your created database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
