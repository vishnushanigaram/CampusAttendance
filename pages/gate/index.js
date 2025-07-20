// pages/gate/index.js

export default function GateDashboard() {
    return (
      <div className="gate-container">
        <h1>Gate Dashboard</h1>
        <input type="text" className="student-id-input" placeholder="Enter Student ID" />
        <div className="gate-buttons">
          <button className="checkin-btn">Check In</button>
          <button className="checkout-btn">Check Out</button>
        </div>
        <div className="status-container">
          <p className="in-status">Checked In</p>
          <p className="out-status">Checked Out</p>
        </div>
      </div>
    );
  }
  