import React from "react";

export const BackgroundLabel: React.FC<{text: string}> = ({text}) => (
    <div
        style={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            backgroundColor: 'rgba(0,0,0,0.7)',
            padding: '10px 16px',
            borderRadius: 8,
            color: '#fff',
            fontSize: 22,
            fontWeight: 700,
            zIndex: 10,
            pointerEvents: 'none',
        }}
    >
        {text}
    </div>
);