// pages/api/faculty/update-classes.js
const pool = require('../../../db');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { className } = req.body;

  if (!className) {
    return res.status(400).json({ message: 'Class name is required' });
  }

  try {
    // Increase total class count for the given class
    await pool.query(
      'INSERT INTO classes (class, total_classes) VALUES (?, 1) ON DUPLICATE KEY UPDATE total_classes = total_classes + 1',
      [className]
    );

    res.status(200).json({ message: `Class count updated for ${className}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
