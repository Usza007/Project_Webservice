import React, { useState, useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { Link } from 'react-router-dom';
import '../styles/RegisteredWebsites.css';

function RegisteredWebsites() {
  const { keycloak } = useKeycloak();
  const [websites, setWebsites] = useState([]);
  const [newWebsite, setNewWebsite] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const token = keycloak.token;

  const fetchWebsites = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:8080/api/websites', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Failed to fetch');

      const data = await res.json();
      setWebsites(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('โหลดเว็บไซต์ไม่สำเร็จ', err);
      setMessage('❌ โหลดข้อมูลล้มเหลว');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (keycloak.authenticated) {
      fetchWebsites();
    }
  }, [keycloak]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const res = await fetch('http://localhost:8080/api/websites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ website_url: newWebsite }),
      });

      if (!res.ok) throw new Error('ไม่สามารถเพิ่มเว็บไซต์ได้');

      setMessage('✅ เพิ่มเว็บไซต์สำเร็จ');
      setNewWebsite('');
      await fetchWebsites();
    } catch (err) {
      setMessage('❌ เพิ่มเว็บไซต์ล้มเหลว: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('แน่ใจว่าต้องการลบเว็บไซต์นี้?')) return;

    try {
      const res = await fetch(`http://localhost:8080/api/websites/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('ลบไม่สำเร็จ');

      setMessage('✅ ลบเว็บไซต์สำเร็จ');
      await fetchWebsites();
    } catch (err) {
      setMessage('❌ ลบเว็บไซต์ล้มเหลว: ' + err.message);
    }
  };

  return (
    <div className="container">
      <div className="header-row">
        <h2 className="header">🌐 เว็บไซต์ที่ลงทะเบียน</h2>
        <Link to="/dashboard" className="link">
          <button className="back-button">⬅️ กลับไปที่ Dashboard</button>
        </Link>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="https://example.com"
            value={newWebsite}
            onChange={(e) => setNewWebsite(e.target.value)}
            required
            className="input"
          />
          <button type="submit" className="add-button" disabled={isLoading}>
            {isLoading ? 'กำลังประมวลผล...' : '➕ เพิ่มเว็บไซต์'}
          </button>
        </form>
      </div>

      {message && (
        <p className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
          {message}
        </p>
      )}

      {isLoading ? (
        <div className="loading-container">
          <div className="loading-indicator"></div>
          <p className="loading-text">กำลังโหลดข้อมูล...</p>
        </div>
      ) : (
        <div className="websites-card">
          {websites.length > 0 ? (
            websites.map((w) => (
              <div key={w.id} className="website-item">
                <div className="website-info">
                  <strong className="website-url">{w.website_url}</strong>
                  <div className="website-created-at">
                    ลงทะเบียนเมื่อ: {new Date(w.created_at).toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(w.id)}
                  className="delete-button"
                  disabled={isLoading}
                >
                  🗑️ ลบ
                </button>
              </div>
            ))
          ) : (
            <p className="no-data-text">
              {message ? '' : 'ยังไม่มีเว็บไซต์ที่ลงทะเบียน'}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default RegisteredWebsites;
