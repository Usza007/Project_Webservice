// InsuranceList.jsx
import React from 'react';
import InsuranceCard from './InsuranceCard';

function InsuranceList({ data, token, registeredSite, user }) {
    return (
        <div className="card-container">
            {data.map((ins) => (
                <InsuranceCard
                    key={ins.id}
                    insurance={ins}
                    token={token}
                    registeredSite={registeredSite}
                    user={user}
                />
            ))}
        </div>
    );
}


export default InsuranceList;
