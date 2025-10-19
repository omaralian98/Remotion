import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

export const FadeToBlack: React.FC<{fadeDurationFrames?: number; startAtFrame?: number}> = ({
  fadeDurationFrames = 60,
  startAtFrame,
}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();

  const start = startAtFrame ?? Math.max(0, durationInFrames - fadeDurationFrames);
  const end = Math.min(durationInFrames - 1, start + fadeDurationFrames);

  const opacity = interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{backgroundColor: 'black', opacity, zIndex: 9999, pointerEvents: 'none'}} />
  );
};
