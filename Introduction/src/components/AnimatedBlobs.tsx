import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';

export const AnimatedBlobs: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 120;
  const blob = (i: number) => {
    const x = 40 + Math.sin(t + i) * 30;
    const y = 30 + Math.cos(t * 1.2 + i) * 22;
    const s = 1 + Math.sin(t * 0.8 + i) * 0.08;
    const hue = 220 + i * 40;
    return {x, y, s, hue};
  };
  return (
    <AbsoluteFill style={{opacity: 0.6}}>
      {[0, 1, 2].map((i) => {
        const {x, y, s, hue} = blob(i);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              width: 380,
              height: 380,
              borderRadius: 200,
              background: `radial-gradient( circle at 30% 30%, hsla(${hue}, 90%, 65%, 0.35), hsla(${hue + 30}, 85%, 55%, 0.15) 60%, transparent)`,
              filter: 'blur(18px)',
              transform: `translate(-50%, -50%) scale(${s})`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

