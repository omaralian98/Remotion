import React from 'react';
import {AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig} from 'remotion';

export const FeatureBullets: React.FC = () => {
const frame = useCurrentFrame();
const {fps} = useVideoConfig();
const items = ['مقاطع توضيحية تبسط المفاهيم', 'عروض بصرية تفاعلية', 'رسوم متحركة تجذب الانتباه'];

const staggerSeconds = 1.3; 
const springConfig = {damping: 14, stiffness: 40};

const delayFrames = Math.round(staggerSeconds * fps);

return (
  <AbsoluteFill className="remotion-center">
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12, width: 'fit-content'}}>
          <h2 className="bullet-chip" style={{backgroundColor: "transparent", fontSize: '50px'}}>:ميدياتو توفر</h2>
          <div className="bullet-list">
              {items.map((text, i) => {
                  const localFrame = Math.max(0, frame - i * delayFrames);
                  const prog = spring({frame: localFrame, fps, config: springConfig});
                  const fade = interpolate(prog, [0, 1], [0, 1]);
                  const y = interpolate(prog, [0, 1], [30, 0]);
                  const tilt = interpolate(prog, [0, 1], [6, 0]);

                  return (
                      <div key={i} className="bullet-item" style={{opacity: fade, transform: `translateY(${y}px) rotate(${tilt}deg)`}}>
                          <div className="bullet-chip">
                              <span className="chip-dot" />
                              {text}
                          </div>
                      </div>
                  );
              })}
          </div>
      </div>
  </AbsoluteFill>
);
};