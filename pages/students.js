// pages/students.js
import { useState } from 'react';

export default function StudentDashboard() {
  const [studentId, setStudentId] = useState('');
  const [attendance, setAttendance] = useState([]);
  const [message, setMessage] = useState('');

  const fetchAttendance = async () => {
    if (!studentId) {
      setMessage('Enter a valid Student ID');
      return;
    }

    const res = await fetch(`/api/students/attendance-percentage?studentId=${studentId}`);
    const data = await res.json();

    if (data.attendance?.length) {
      setAttendance(data.attendance);
      setMessage('');
    } else {
      setMessage('No attendance data found');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Student Attendance Dashboard</h1>
      <input
        type="text"
        placeholder="Enter Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />
      <button onClick={fetchAttendance} style={{ marginLeft: '10px' }}>
        Check Attendance
      </button>

      {message && <p>{message}</p>}

      {attendance.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Attendance Summary:</h3>
          <ul>
            {attendance.map((entry, index) => (
              <li key={index}>
                <strong>{entry.class}</strong>: {entry.attended} / {entry.total} classes attended
                <br />
                <span style={{ fontWeight: 'bold', color: entry.percentage < 75 ? 'red' : 'green' }}>
                  {entry.percentage}% attendance
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
