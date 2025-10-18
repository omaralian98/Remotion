import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';

export const ConfettiBurst: React.FC = () => {
  const frame = useCurrentFrame();
  const pieces = 28;
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {Array.from({length: pieces}).map((_, i) => {
        const seed = i * 17.33;
        const prog = Math.min(1, Math.max(0, (frame - 6) / 45));
        const angle = (seed % Math.PI) * 2 + i * 0.2;
        const dist = prog * (280 + (seed % 120));
        const x = 540 + Math.cos(angle) * dist;
        const y = 540 + Math.sin(angle) * dist - prog * 120;
        const rot = (seed * 20 + frame * 6) % 360;
        const size = 6 + (seed % 10);
        const hue = 200 + ((i * 35) % 160);
        const o = 1 - prog;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: size,
              height: size * 0.5,
              background: `hsl(${hue} 85% 60%)`,
              transform: `translate(-50%, -50%) rotate(${rot}deg)`,
              opacity: o,
              borderRadius: 1,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

