//countclick.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import '../styles/Countclick.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

function Countclick() {
  const { keycloak } = useKeycloak();
  const [clickSummary, setClickSummary] = useState([]);
  const [error, setError] = useState(null);

  const totalClicks = clickSummary.reduce((sum, item) => sum + item.click_count, 0);
  const fetchClickSummary = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:8080/api/dashboard/click-summary', {
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      });

      if (!res.ok) throw new Error(`ผิดพลาด: ${res.status}`);
      const data = await res.json();
      setClickSummary(data || []);
    } catch (err) {
      console.error('❌ API error:', err);
      setError(err.message);
    }
  }, [keycloak.token]);

  useEffect(() => {
    if (keycloak.authenticated) {
      fetchClickSummary();
    }
  }, [keycloak.authenticated, fetchClickSummary]);

  return (
    <div className="countclick-container">
      {error && <div className="countclick-error">❌ {error}</div>}
      <div className="countclick-header">
        <p>📑 สถิติการให้บริการ</p>
      </div>
      <div className="dashboard-total-click-box">
        <div className="dashboard-total-click-content">
          <span className="dashboard-total-click-label">จำนวนการคลิกทั้งหมด</span>
          <h1 className="dashboard-total-click-number">{totalClicks} ครั้ง</h1>
        </div>
      </div>

      {clickSummary.length > 0 && (
        <div className="bar-chart-box">
          <h3 className="bar-chart-title">📊 กราฟแท่งแสดงจำนวนการคลิกของแต่ละประกัน</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={clickSummary} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="click_count" fill="#0a3977" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default Countclick;
