// pages/faculty/index.js

export default function FacultyDashboard() {
    return (
      <div className="faculty-container">
        <h1>Faculty Dashboard</h1>
        <div className="student-list">
          <div className="student-card">
            <h3>B001 - Ramu</h3>
            <button className="mark-present">Mark Present</button>
            <button className="mark-absent">Mark Absent</button>
          </div>
          <div className="student-card">
            <h3>B002 - Pavi</h3>
            <button className="mark-present">Mark Present</button>
            <button className="mark-absent">Mark Absent</button>
          </div>
          <div className="student-card">
            <h3>B003 - Nani</h3>
            <button className="mark-present">Mark Present</button>
            <button className="mark-absent">Mark Absent</button>
          </div>
          {/* Repeat this block for other students */}
        </div>
        <button className="submit-btn">Submit Attendance</button>
      </div>
    );
  }
  