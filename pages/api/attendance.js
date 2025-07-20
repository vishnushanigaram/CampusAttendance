// pages/api/attendance.js
const pool = require('../../db');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const { studentId, attendance } = req.body;
  try {
    // Retrieve the student record by studentId
    const [rows] = await pool.query('SELECT * FROM students WHERE studentId = ?', [studentId]);
    const student = rows[0];
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    // Allow attendance update only if gateEntry is true (student is on campus)
    if (!student.gateEntry) {
      return res.status(400).json({ message: 'Student is not on campus. Attendance cannot be marked.' });
    }
    
    // Update the attendance status (true = present)
    await pool.query('UPDATE students SET attendance = ? WHERE studentId = ?', [attendance, studentId]);
    res.status(200).json({ message: 'Attendance updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
