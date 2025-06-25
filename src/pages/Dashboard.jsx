import React, { useEffect, useState, useCallback } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';
import ClickDoughnutChart from '../components/ClickDoughnutChart';

function Dashboard() {
  const { keycloak } = useKeycloak();
  const [clickSummary, setClickSummary] = useState([]);
  const [error, setError] = useState(null);
  const [showJson, setShowJson] = useState(false);

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
    <div className="dashboard-container">
      <div className="dashboard-header-area">
        <div className="dashboard-user-info">
          <h2 className="dashboard-header">🎉 Welcome, {keycloak.tokenParsed?.preferred_username}</h2>
          <p className="dashboard-subtext">📧 {keycloak.tokenParsed?.email}</p>
        </div>
      </div>

      {error && <div className="dashboard-error">❌ {error}</div>}

      <div className="dashboard-main">
        <div className="dashboard-action-cards">
          <Link to="/websites" className="dashboard-card-link">
            <div className="dashboard-card">
              <span className="dashboard-card-icon">🌐</span>
              <p className="dashboard-card-text">จัดการเว็บไซต์</p>
            </div>
          </Link>
          <Link to="/insurances" className="dashboard-card-link">
            <div className="dashboard-card">
              <span className="dashboard-card-icon">📄</span>
              <p className="dashboard-card-text">ดูประกันทั้งหมด</p>
            </div>
          </Link>
        </div>

        <section className="dashboard-section">
          <h3 className="dashboard-section-header">📋 สถิติการคลิกประกันทั้งหมด</h3>
          {clickSummary?.length === 0 ? (
            <div className="dashboard-empty-state">
              <p className="dashboard-empty-text">ยังไม่มีข้อมูลการคลิก</p>
            </div>
          ) : (
            <>
              <div className="dashboard-table-wrapper">
                <table className="dashboard-table">
                  <thead>
                    <tr className="dashboard-table-header">
                      <th className="dashboard-header-cell">ชื่อประกัน</th>
                      <th className="dashboard-header-cell">จำนวนคลิก</th>
                      <th className="dashboard-header-cell">คลิกล่าสุด</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clickSummary.map((item, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'dashboard-row-even' : 'dashboard-row-odd'}>
                        <td className="dashboard-cell">{item.name}</td>
                        <td className="dashboard-cell-count">{item.click_count}</td>
                        <td className="dashboard-cell">{new Date(item.last_click).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="dashboard-json-toggle-wrapper">
                <button onClick={() => setShowJson(!showJson)} className="dashboard-json-button">
                  {showJson ? 'ซ่อนข้อมูล JSON' : 'แสดงข้อมูล JSON'}
                </button>
              </div>

              {showJson && (
                <pre className="dashboard-json-view">
                  {JSON.stringify(clickSummary, null, 2)}
                </pre>
              )}
            </>
          )}
        </section>

        <section className="dashboard-section">
          <h3 className="dashboard-section-header">📈 สัดส่วนการคลิกประกัน</h3>
          <ClickDoughnutChart clickSummary={clickSummary} />
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
