// pages/index.js
import { useState } from 'react';
export default function GateDashboard() {
  const [studentId, setStudentId] = useState('');
  const [message, setMessage] = useState('');

  const handleGateAction = async (status) => {
    if (!studentId) {
      setMessage('Please enter a valid Student ID');
      return;
    }
    
    const res = await fetch('/api/gate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, status }),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Gate Dashboard</h1>
      <input
        type="text"
        placeholder="Enter Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />
      <button onClick={() => handleGateAction('in')} disabled={!studentId}>
        Check In
      </button>
      <button onClick={() => handleGateAction('out')} disabled={!studentId}>
        Check Out
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}