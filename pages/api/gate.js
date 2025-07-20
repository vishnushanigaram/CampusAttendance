// pages/api/gate.js
const pool = require('../../db');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { studentId, status } = req.body;

  if (!studentId || !status || (status !== 'in' && status !== 'out')) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    // Check if the student exists
    const [rows] = await pool.query('SELECT * FROM students WHERE studentId = ?', [studentId]);
    const student = rows[0];
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Update the gate status
    await pool.query('UPDATE students SET gateStatus = ? WHERE studentId = ?', [status, studentId]);
    res.status(200).json({ message: `Student ${studentId} marked as ${status === 'in' ? 'Checked In' : 'Checked Out'}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
