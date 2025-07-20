// pages/api/students.js
const pool = require('../../db');

export default async function handler(req, res) {
  try {
    const [rows] = await pool.query('SELECT studentId, name, class, gateStatus FROM students');
    res.status(200).json({ students: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
