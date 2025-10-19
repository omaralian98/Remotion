import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';

export const NoiseBackground: React.FC = () => {
    const frame = useCurrentFrame();
    const {width, height} = useVideoConfig();

    const gap = 40; // grid spacing matches panel style
    const cols = Math.floor(width / gap);
    const rows = Math.floor(height / gap);

    // Subtle float for a hint of motion
    const floatY = Math.sin(frame / 120) * 6;

    return (
        <AbsoluteFill>
            {/* Branded gradient backdrop similar to panel style */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0
                }}
            />

            {/* Grid lines overlay */}
            <svg
                width={width}
                height={height}
                style={{position: 'absolute', inset: 0, opacity: 0.18, transform: `translateY(${floatY}px)`}}
            >
                {/* Vertical lines */}
                {Array.from({length: cols}).map((_, i) => {
                    const x = (i + 1) * gap;
                    return <line key={`v-${i}`} x1={x} y1={0} x2={x} y2={height} stroke="#000000" strokeWidth={0.6} />;
                })}
                {/* Horizontal lines */}
                {Array.from({length: rows}).map((_, j) => {
                    const y = (j + 1) * gap;
                    return <line key={`h-${j}`} x1={0} y1={y} x2={width} y2={y} stroke="#000000" strokeWidth={0.6} />;
                })}
            </svg>
        </AbsoluteFill>
    );
};
