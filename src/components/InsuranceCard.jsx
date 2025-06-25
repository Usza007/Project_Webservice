// InsuranceCard.jsx
import React from 'react';
import { logInsuranceClick } from '../api/click';
import '../styles/Insurances.css';

function InsuranceCard({ insurance, token, registeredSite, user }) {
    const handleCopyClick = () => {
        const baseUrl = "http://localhost:8080/track";
        const fullUrl = `${baseUrl}?ref=${insurance.id}&site=${encodeURIComponent(insurance.detail_url)}&aff=${user.id}`;
        navigator.clipboard.writeText(fullUrl);
        alert("ลิงก์ถูกคัดลอกแล้ว!");
    };
    return (
        <div className="card">
            <div className="card-header">
                <h4 className="insurance-name">{insurance.name}</h4>
                <div className="company-pill">{insurance.company}</div>
            </div>
            <div className="card-category">{insurance.category}</div>
            <div className="price">
                <span className="price-value">฿{insurance.price.toLocaleString()}</span>
                <span className="price-label">บาท</span>
            </div>
            <div className="button-row">
                <button
                    className="view-button"
                    onClick={() => logInsuranceClick(insurance.id, insurance.detail_url, token)}
                >
                    🔍 ดูรายละเอียด
                </button>

                <button className="copy-button" onClick={handleCopyClick}>
                    🔗 คัดลอกลิงก์
                </button>
            </div>

        </div>
    );
}


export default InsuranceCard;
