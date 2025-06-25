import React, { useEffect, useState, useCallback } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import '../styles/Popular.css';
import ClickDoughnutChart from '../components/ClickDoughnutChart';

function Popular() {
    const { keycloak } = useKeycloak();
    const [clickSummary, setClickSummary] = useState([]);
    const [error,setError] = useState(null);

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
    }, [keycloak.token, setError]);

    useEffect(() => {
        if (keycloak.authenticated) {
            fetchClickSummary();
        }
    }, [keycloak.authenticated, fetchClickSummary]);

    return (
        <div className="popular-container">
            <div className="popular-main">
                <section className="popular-section">
                    <h3 className="popular-section-header">📋 ประกันที่ถูกคลิกมากที่สุด 5 รายการแรก</h3>
                    {clickSummary?.length === 0 ? (
                        <div className="popular-empty-state">
                            <p className="popular-empty-text">ยังไม่มีข้อมูลการคลิก</p>
                        </div>
                    ) : (
                        <>
                            <div className="popular-table-wrapper">
                                <table className="popular-table">
                                    <thead>
                                        <tr className="popular-table-header">
                                            <th className="popular-header-cell-left">ชื่อประกัน</th>
                                            <th className="popular-header-cell">จำนวนคลิก</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clickSummary
                                            .sort((a, b) => b.click_count - a.click_count)
                                            .slice(0, 5) 
                                            .map((item, i) => (
                                                <tr key={i} className={i % 2 === 0 ? 'popular-row-even' : 'popular-row-odd'}>
                                                    <td className="popular-cell">{item.name}</td>
                                                    <td className="popular-cell-count">{item.click_count}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </section>

                <section className="popular-section">
                    <h3 className="popular-section-header">📈 สัดส่วนประกันที่ถูกคลิกมากที่สุด 5 รายการ</h3>
                    <ClickDoughnutChart
                        clickSummary={[...clickSummary]
                            .sort((a, b) => b.click_count - a.click_count)
                            .slice(0, 5)}
                    />
                </section>
            </div>
        </div>
    );
}

export default Popular;
