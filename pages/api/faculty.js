// pages/faculty.js
import { useEffect, useState } from 'react';

export default function FacultyDashboard() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await fetch('/api/faculty/students');
    const data = await res.json();
    setStudents(data.students);
  };

  const handleMark = (studentId, status) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSubmit = async () => {
    const entries = Object.entries(attendance);
    if (entries.length === 0) {
      setMessage('No attendance marked.');
      return;
    }

    try {
      for (const [studentId, status] of entries) {
        const student = students.find(s => s.studentId === studentId);
        if (!student) continue;

        const res = await fetch('/api/faculty/mark-attendance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            studentId,
            className: student.class,
            status,
          })
        });

        const result = await res.json();
        if (res.status !== 200) {
          console.warn(result.message);
        }
      }

      setMessage('Attendance submitted successfully.');
      setAttendance({});
      fetchStudents(); // Refresh status
    } catch (error) {
      setMessage('Error submitting attendance.');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Faculty Attendance Dashboard</h1>
      {message && <p>{message}</p>}

      {students.map((student) => (
        <div key={student.studentId} style={{ marginBottom: '1rem' }}>
          <strong>{student.studentId}</strong> - {student.name} ({student.gateStatus})
          <br />
          <button
            onClick={() => handleMark(student.studentId, 'present')}
            disabled={student.gateStatus !== 'in'}
          >
            Mark Present
          </button>
          <button
            onClick={() => handleMark(student.studentId, 'absent')}
          >
            Mark Absent
          </button>
        </div>
      ))}

      <button onClick={handleSubmit} style={{ marginTop: '2rem' }}>
        Submit Attendance
      </button>
    </div>
  );
}
