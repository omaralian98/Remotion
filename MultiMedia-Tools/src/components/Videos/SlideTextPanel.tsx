import React from 'react';

export type SlideTextPanelProps = {
    children?: React.ReactNode;
    style?: React.CSSProperties;
};

export const SlideTextPanel: React.FC<SlideTextPanelProps> = ({
    children,
    style,
}) => {
    if (!children) return null;
    
    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                justifySelf: 'center',
                fontSize: 12,
                padding: 24,
                pointerEvents: 'none',
                ...style,
            }}
        >
            <div
                style={{
                    background: 'rgba(0,0,0,0.55)',
                    borderRadius: 12,
                    padding: '35px 20px',
                    color: 'white',
                    boxShadow: '0 6px 24px rgba(0,0,0,0.35)',
                    direction: 'rtl',
                    textAlign: 'right',
                    pointerEvents: 'none',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    justifyContent: 'flex-start'
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default SlideTextPanel;
