import React from 'react';

export default function SalesCard({ sales = 3200, percent = 12.5 }) {
  return (
    <div className="bg-white rounded-xl shadow-sm px-6 py-6 w-full">
      {/* Title */}
      <h2 className="text-sm text-gray-500 font-normal mb-1">Sales</h2>

      {/* Amount */}
      <div className="text-4xl font-extrabold text-gray-900 leading-tight">
        ${sales.toLocaleString()}
      </div>

      {/* Percentage */}
      <div className="flex items-center gap-1 text-green-500 text-sm font-semibold mt-1">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
        <span>{percent.toString().replace('.', ',')}%</span>
      </div>

      {/* Chart */}
      <div className="w-full h-40 mt-6">
        <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="fadeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Filled area */}
          <path
            d="M0,30 Q10,28 20,29 T40,28 T60,27 T80,26 T100,25 L100,40 L0,40 Z"
            fill="url(#fadeGradient)"
          />

          {/* Line chart */}
          <path
            d="M0,30 Q10,28 20,29 T40,28 T60,27 T80,26 T100,25"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
