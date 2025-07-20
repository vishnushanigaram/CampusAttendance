// pages/api/students/attendance-percentage.js
const pool = require('../../../db');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { studentId } = req.query;

  if (!studentId) {
    return res.status(400).json({ message: 'Student ID is required' });
  }

  try {
    // Get attendance count for each class
    const [attendance] = await pool.query(
      'SELECT class, COUNT(*) as attended_classes FROM attendance WHERE studentId = ? GROUP BY class',
      [studentId]
    );

    // Get total classes conducted for each class
    const [totalClasses] = await pool.query('SELECT * FROM classes');

    // Calculate attendance percentage
    let attendanceData = attendance.map(a => {
      let totalClass = totalClasses.find(c => c.class === a.class)?.total_classes || 0;
      let percentage = totalClass ? (a.attended_classes / totalClass) * 100 : 0;
      return {
        class: a.class,
        attended: a.attended_classes,
        total: totalClass,
        percentage: percentage.toFixed(2)
      };
    });

    res.status(200).json({ attendance: attendanceData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
