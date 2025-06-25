// Insurance.jsx
import React, { useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { Link } from 'react-router-dom';
import InsuranceCategoryList from '../components/InsuranceList';
import '../styles/Insurances.css';

function Insurances() {
    const { keycloak } = useKeycloak();
    const [insurances, setInsurances] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
    const [isLoading, setIsLoading] = useState(true);
    const [showJson, setShowJson] = useState(false); 

    const token = keycloak.token;

    useEffect(() => {
        if (keycloak.authenticated) {
            fetch('http://localhost:8080/api/insurances', {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((res) => res.json())
                .then((data) => {
                    setInsurances(data);
                    setFiltered(data);
                    setCategories(['ทั้งหมด', ...new Set(data?.map((ins) => ins.category))]);
                    setIsLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setIsLoading(false);
                });
        }
    }, [keycloak, token]);

    const filterByCategory = (cat) => {
        setSelectedCategory(cat);
        setFiltered(cat === 'ทั้งหมด' ? insurances : insurances.filter((ins) => ins.category === cat));
    };

    const registeredSite = keycloak.tokenParsed?.registered_site || 'N/A';
    const user = {
        id: keycloak.tokenParsed?.sub || "default-id"
    };
    

    return (
        <div className="container">
            <div className="header-row">
                <h2 className="header">🛡️ รายการประกันทั้งหมด</h2>
                <Link to="/dashboard" className="link">
                    <button className="back-button">⬅️ กลับไปที่ Dashboard</button>
                </Link>
            </div>

            {error && <div className="error">{`❌ ${error}`}</div>}

            <div className="category-container">
                <div className="category-group">
                    {categories?.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => filterByCategory(cat)}
                            className={`category-button ${selectedCategory === cat ? 'active' : ''}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {!isLoading && (
                <div className="json-toggle-wrapper">
                    <button onClick={() => setShowJson(!showJson)} className="json-button">
                        {showJson ? 'ซ่อนข้อมูล JSON' : 'แสดงข้อมูล JSON'}
                    </button>
                </div>
            )}

            {showJson && (
                <div className="json-output">
                    <pre>{JSON.stringify(filtered, null, 2)}</pre>
                </div>
            )}

            {isLoading ? (
                <div className="loading-container">
                    <div className="loading-indicator"></div>
                    <p className="loading-text">กำลังโหลดข้อมูลประกัน...</p>
                </div>
            ) : filtered?.length > 0 ? (
                <InsuranceCategoryList data={filtered} token={token} registeredSite={registeredSite} user={user}/>
            ) : (
                <div className="no-data-container">
                    <div className="no-data-icon">🔍</div>
                    <p className="no-data-text">ไม่พบข้อมูลประกันในหมวดหมู่ "{selectedCategory}"</p>
                    <button onClick={() => filterByCategory('ทั้งหมด')} className="reset-filter-button">
                        แสดงประกันทั้งหมด
                    </button>
                </div>
            )}
        </div>
    );
}

export default Insurances;
