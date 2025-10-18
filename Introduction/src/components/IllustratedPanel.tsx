import React from 'react';
import {useCurrentFrame, spring, interpolate, Img, staticFile} from 'remotion';

export type PanelProps = { fps: number; side: 'left' | 'right'; imgSrc?: string };

export const IllustratedPanel: React.FC<PanelProps> = ({fps, side, imgSrc}) => {
  const frame = useCurrentFrame();
  const enter = spring({frame, fps, config: {damping: 16}});
  const x = interpolate(enter, [0, 1], [side === 'right' ? 220 : -220, 0]);
  const o = interpolate(enter, [0, 1], [0, 1]);
  const float = Math.sin(frame / 15) * 6;

  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    top: '20%',
    width: 340,
    height: 420,
    borderRadius: 24,
    background: 'linear-gradient(160deg, rgba(99,102,241,0.35), rgba(56,189,248,0.28))',
    backdropFilter: 'blur(4px)',
    boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
    transform: `translateX(${x}px) translateY(${float}px)`,
    opacity: o,
    overflow: 'hidden',
  };
  const sidePos: React.CSSProperties = side === 'right' ? {right: '6%'} : {left: '6%'};

  return (
    <div style={{...baseStyle, ...sidePos}}>
      <svg width="100%" height="100%" style={{position: 'absolute', inset: 0, opacity: 0.18}}>
        {Array.from({length: 10}).map((_, i) => (
          <line key={`v-${i}`} x1={(i + 1) * 30} y1={0} x2={(i + 1) * 30} y2={600} stroke="#fff" strokeWidth={0.6} />
        ))}
        {Array.from({length: 10}).map((_, i) => (
          <line key={`h-${i}`} x1={0} y1={(i + 1) * 30} x2={600} y2={(i + 1) * 30} stroke="#fff" strokeWidth={0.6} />
        ))}
      </svg>

      {imgSrc ? (
        <Img src={staticFile(imgSrc)} style={{position: 'absolute', inset: 0, objectFit: 'contain', padding: 24}} />
      ) : (
        <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 22, padding: 24, textAlign: 'center'}}>
          Place illustration here (e.g. /images/online-learning.svg)
        </div>
      )}
    </div>
  );
};

