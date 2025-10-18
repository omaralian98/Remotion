import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {noise3D} from '@remotion/noise';

export const NoiseBackground: React.FC = () => {
    const frame = useCurrentFrame();
    const {width, height} = useVideoConfig();

    const cols = 20;
    const rows = 12;
    const speed = 0.01;
    const maxOffset = 12;

    return (
        <AbsoluteFill>
            <svg width={width} height={height}>
                {Array.from({length: cols}).map((_, i) =>
                    Array.from({length: rows}).map((__, j) => {
                        const px = i / cols;
                        const py = j / rows;

                        const dx = noise3D('x', px, py, frame * speed) * maxOffset;
                        const dy = noise3D('y', px, py, frame * speed) * maxOffset;

                        return (
                            <circle
                                key={`${i}-${j}`}
                                cx={i * (width / cols) + dx}
                                cy={j * (height / rows) + dy}
                                r={2}
                                fill="#4a5ad1"
                            />
                        );
                    })
                )}
            </svg>
        </AbsoluteFill>
    );
};
