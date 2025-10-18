import React from 'react';
import {AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig} from 'remotion';
import KineticTitle from './KineticTitle';

export const LogoAndTitleContainer: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const progress = spring({frame, fps, config: {damping: 12}});
  const fade = interpolate(progress, [0, 1], [0, 1]);
  const titleY = interpolate(progress, [0, 1], [16, 0]);

  return (
    <AbsoluteFill className="remotion-center">
      <div className="content-wrap">
        <KineticTitle
            isRTL={true}
            text="مرحبا بك في ميدياتو!"
            tokenDelay={6}
            baseClass="main-title"
            initialOffsetY={titleY}
            opacity={fade}/>
      </div>
    </AbsoluteFill>
  );
};
