import React, { useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import Popular from '../components/Popular';
import Countclick from '../components/Countclick';

function Home() {
  const { keycloak, initialized } = useKeycloak();
  const [registerError, setRegisterError] = useState(null);
  const navigate = useNavigate();
  const [clickSummary] = useState([]);

  useEffect(() => {
    if (initialized && keycloak.authenticated) {
      fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      })
        .then(res => {
          if (!res.ok) {
            throw new Error('การสมัคร Affiliator ไม่สำเร็จ');
          }
        })
        .catch(err => {
          console.error('❌ Register failed:', err);
          setRegisterError(err.message);
        });
    } else if (initialized && !keycloak.authenticated) {
      keycloak.login();
    }
  }, [initialized, keycloak]);

  if (!initialized) {
    return <div className="home-loading">🔄 Loading...</div>;
  }

  return (
    <div className="home-container">
      {keycloak.authenticated ? (
        <>
          {registerError && (
            <p className="home-error">⚠️ {registerError}</p>
          )}
          <div className="home-hero">
            <h1>ยินดีต้อนรับสู่ระบบ Affiliate Insurances ของเรา</h1>
            <p>เริ่มต้นการใช้งานโดยเลือกฟังก์ชันที่คุณต้องการ</p>
          </div>
          <div className="home-cards">
            <div className="home-card" onClick={() => navigate('/dashboard')}>
              <h2>📊 Dashboard</h2>
              <p>ดูภาพรวมการทำงาน</p>
            </div>
            <div className="home-card" onClick={() => navigate('/websites')}>
              <h2>🌐 Websites</h2>
              <p>จัดการเว็บไซต์ที่เชื่อมต่อกับระบบ</p>
            </div>
            <div className="home-card" onClick={() => navigate('/insurances')}>
              <h2>🛡️ Insurances</h2>
              <p>ดูข้อมูลประกันที่เข้าร่วม</p>
            </div>
          </div>
          <div className='countclick'>
            <Countclick clickSummary={clickSummary} />
          </div>
          <div className="Popular">
            <Popular clickSummary={clickSummary} />
          </div>
        </>
      ) : (
        <div className="home-logging-in">🔐 Logging in...</div>
      )}
    </div>
  );
}

export default Home;
