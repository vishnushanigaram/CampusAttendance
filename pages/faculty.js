import { useEffect, useState } from 'react';

export default function FacultyDashboard() {
  const [students, setStudents] = useState([]);
  const [attendanceMap, setAttendanceMap] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await fetch('/api/faculty/students');
    const data = await res.json();
    setStudents(data.students);
  };

  const toggleAttendance = (studentId, status) => {
    setAttendanceMap(prev => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const submitAttendance = async () => {
    const entries = Object.entries(attendanceMap);

    if (entries.length === 0) {
      setMessage('No attendance marked.');
      return;
    }

    try {
      for (let [studentId, status] of entries) {
        const student = students.find(s => s.studentId === studentId);
        const className = student.class;

        if (status === 'present' && student.gateStatus !== 'in') {
          setMessage(`Cannot mark ${studentId} as present. Not in campus.`);
          continue;
        }

        await fetch('/api/faculty/mark-attendance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ studentId, className, status }),
        });
      }

      setMessage('Attendance submitted successfully');
      fetchStudents();
      setAttendanceMap({});
    } catch (err) {
      setMessage('Error submitting attendance');
    }
  };

  const classes = {};
  students.forEach(student => {
    if (!classes[student.class]) {
      classes[student.class] = [];
    }
    classes[student.class].push(student);
  });

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Faculty Attendance Dashboard</h1>
      {message && <p>{message}</p>}

      {Object.keys(classes).map(className => (
        <div key={className}>
          <h2>{className}</h2>
          <ul>
            {classes[className].map(student => (
              <li key={student.studentId} style={{ marginBottom: '1rem' }}>
                <strong>{student.studentId}</strong> - {student.name} ({student.gateStatus})
                <br />
                <button
                  onClick={() => toggleAttendance(student.studentId, 'present')}
                  disabled={student.gateStatus !== 'in'}
                  style={{
                    marginRight: '0.5rem',
                    backgroundColor:
                      attendanceMap[student.studentId] === 'present' ? 'green' : '',
                    color: attendanceMap[student.studentId] === 'present' ? 'white' : '',
                  }}
                >
                  Mark Present
                </button>
                <button
                  onClick={() => toggleAttendance(student.studentId, 'absent')}
                  style={{
                    backgroundColor:
                      attendanceMap[student.studentId] === 'absent' ? 'red' : '',
                    color: attendanceMap[student.studentId] === 'absent' ? 'white' : '',
                  }}
                >
                  Mark Absent
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <button onClick={submitAttendance} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
        Submit Attendance
      </button>
    </div>
  );
}
