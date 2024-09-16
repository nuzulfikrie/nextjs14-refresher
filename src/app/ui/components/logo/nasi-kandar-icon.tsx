import React from 'react';

const NasiKandarIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
        {/* White shield background */}
        <path d="M18 2 L34 10 L34 17 Q34 28 18 34 Q2 28 2 17 L2 10 Z" fill="white" stroke="#e0e0e0" strokeWidth="1" />

        {/* Plate */}
        <ellipse cx="18" cy="24" rx="14" ry="6" fill="#f0f0f0" stroke="#d0d0d0" strokeWidth="0.5" />

        {/* Rice */}
        <ellipse cx="18" cy="22" rx="12" ry="5" fill="#ffffff" stroke="#e0e0e0" strokeWidth="0.5" />

        {/* Curry Sauce */}
        <path d="M9,22 Q18,19 27,22" fill="#8B4513" stroke="#8B4513" strokeWidth="0.5" />

        {/* Chicken Piece */}
        <path d="M14,18 Q16,17 18,18 T22,19" fill="#CD853F" stroke="#8B4513" strokeWidth="0.5" />

        {/* Cucumber Slice */}
        <ellipse cx="24" cy="20" rx="3" ry="1" fill="#90EE90" stroke="#2E8B57" strokeWidth="0.3" transform="rotate(-10)" />

        {/* Carrot */}
        <path d="M10,17 Q11,16 12,17 L11,18 Z" fill="#FFA500" stroke="#FF8C00" strokeWidth="0.3" />

        {/* Tomato */}
        <circle cx="26" cy="18" r="1.5" fill="#FF6347" stroke="#DC143C" strokeWidth="0.3" />

        {/* Green Chili */}
        <path d="M7,20 Q9,18 11,20" fill="none" stroke="#228B22" strokeWidth="0.5" />
    </svg>
);

export default NasiKandarIcon;
