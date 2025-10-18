import React from 'react';
import {AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig} from 'remotion';

export const Subtitle: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const progress = spring({frame, fps, config: {damping: 14}});
  const fade = interpolate(progress, [0, 1], [0, 1]);
  const y = interpolate(progress, [0, 1], [30, 0]);
  const underlineW = interpolate(progress, [0, 1], [0, 60]);

  return (
    <AbsoluteFill className="remotion-center">
      <h2 className="subtitle" style={{opacity: fade, transform: `translateY(${y}px)`}}>
           هي وسيلة لتعليم حول الوسائط المتعددة بطرق تفاعلية
      </h2>
      <div className="subtitle-underline" style={{opacity: fade, width: `${underlineW}%`}} />
    </AbsoluteFill>
  );
};
