// pages/student/index.js

export default function StudentDashboard() {
    return (
      <div className="student-dashboard-container">
        <h1>Student Dashboard</h1>
        <div className="attendance-summary">
          <p>Class A: 6 / 20 classes attended</p>
          <p className="attendance-percentage">Attendance Percentage: 30.00%</p>
        </div>
      </div>
    );
  }
  