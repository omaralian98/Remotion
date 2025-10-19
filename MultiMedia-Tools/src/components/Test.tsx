// src/VideoGridSpotlight.tsx
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';

const colors = ['red', 'blue', 'green', 'orange'];

const Grid: React.FC = () => {
    return (
        <AbsoluteFill style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {colors.map((c, i) => (
                <div
                    key={i}
                    style={{
                        width: '50%',
                        height: '50%',
                        backgroundColor: c,
                    }}
                />
            ))}
        </AbsoluteFill>
    );
};

export const VideoGridSpotlight: React.FC = () => {
    const frame = useCurrentFrame();

    // Each spotlight cycle = 60 frames
    const spotlightIndex = Math.floor(frame / 60);
    const localFrame = frame % 60;

    // Zoom factor: in → hold → out
    const zoom = interpolate(localFrame, [0, 15, 30, 45, 60], [1, 2, 2, 1, 1], {
        extrapolateRight: 'clamp',
    });

    // Which cell to spotlight
    const row = Math.floor(spotlightIndex / 2);
    const col = spotlightIndex % 2;

    // Translation only while zoomed in
    const translateX = interpolate(
        localFrame,
        [0, 15, 30, 45, 60],
        [0, col === 0 ? 0 : -50, col === 0 ? 0 : -50, 0, 0], // shift only during zoomed state
        {extrapolateRight: 'clamp'}
    );

    const translateY = interpolate(
        localFrame,
        [0, 15, 30, 45, 60],
        [0, row === 0 ? 0 : -50, row === 0 ? 0 : -50, 0, 0],
        {extrapolateRight: 'clamp'}
    );

    return (
        <AbsoluteFill
            style={{
                transform: `scale(${zoom}) translate(${translateX}%, ${translateY}%)`,
                transformOrigin: 'top left',
            }}
        >
            <Grid />
        </AbsoluteFill>
    );
};
