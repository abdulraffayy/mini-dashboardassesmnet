// src/components/Dashboard/DashboardCard.jsx
import React from 'react';

export default function DashboardCard({ title, value, icon, bgColor }) {
    return (
        <div
            className={`flex items-center justify-between p-5 rounded-xl shadow-md ${bgColor} text-white`}
        >
            <div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-2xl font-bold mt-1">{value}</p>
            </div>
            <div className="text-4xl">{icon}</div>
        </div>
    );
}
