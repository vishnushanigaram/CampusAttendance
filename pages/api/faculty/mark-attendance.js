// pages/api/faculty/mark-attendance.js
const pool = require('../../../db');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { studentId, className, status } = req.body;

  if (!studentId || !className || !['present', 'absent'].includes(status)) {
    return res.status(400).json({ message: 'Missing or invalid data' });
  }

  try {
    // Check student exists and gate status
    const [rows] = await pool.query('SELECT gateStatus FROM students WHERE studentId = ?', [studentId]);
    if (!rows.length) return res.status(404).json({ message: 'Student not found' });

    if (status === 'present' && rows[0].gateStatus !== 'in') {
      return res.status(400).json({ message: 'Student is not in campus. Cannot mark present.' });
    }

    const today = new Date().toISOString().split('T')[0];

    // Insert or update attendance
    await pool.query(
      `INSERT INTO attendance (studentId, class, date, status)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE status = ?`,
      [studentId, className, today, status, status]
    );

    // Update class count only once per day
    await pool.query(
      `INSERT INTO classes (class, total_classes)
       VALUES (?, 1)
       ON DUPLICATE KEY UPDATE total_classes = total_classes + 1`,
      [className]
    );

    res.status(200).json({ message: `Student ${studentId} marked as ${status}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
