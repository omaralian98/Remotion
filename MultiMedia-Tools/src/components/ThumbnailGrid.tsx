// src/components/ThumbnailGrid.tsx
import React, {useState} from 'react';
import {
    AbsoluteFill,
    useCurrentFrame,
    interpolate,
    Html5Video,
} from 'remotion';
import type {Slide} from '../content';
import {DemoClip} from './DemoClips';

type Props = {
    slides: Slide[];
};

export const ThumbnailGrid: React.FC<Props> = ({slides}) => {
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
        [0, col === 0 ? 0 : -50, col === 0 ? 0 : -50, 0, 0],
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
                backgroundColor: 'black',
                transform: `scale(${zoom}) translate(${translateX}%, ${translateY}%)`,
                transformOrigin: 'top left',
            }}
        >
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gridTemplateRows: '1fr 1fr',
                    width: '100%',
                    height: '100%',
                }}
            >
                {slides.map((slide, idx) => (
                    <ThumbnailCell
                        key={slide.id}
                        videoPath={slide.video}
                        label={slide.title}
                        id={slide.id}
                    />
                ))}
            </div>
        </AbsoluteFill>
    );
};

const ThumbnailCell: React.FC<{
    videoPath?: string;
    label: string;
    id: string;
}> = ({videoPath, label, id}) => {
    const [error, setError] = useState(false);
    const shouldUseDemoClip = !videoPath || error;

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                backgroundColor: '#000',
            }}
        >
            {!shouldUseDemoClip ? (
                <Html5Video
                    src={videoPath}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                    muted
                    loop
                    onError={() => {
                        setError(true);
                        console.warn(`Video failed: ${videoPath}. Using DemoClip fallback.`);
                    }}
                />
            ) : (
                <DemoClip id={id} />
            )}

            <div
                style={{
                    position: 'absolute',
                    bottom: 12,
                    right: 12,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    padding: '6px 12px',
                    borderRadius: 6,
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: 600,
                }}
            >
                {label}
            </div>
        </div>
    );
};

export default ThumbnailGrid;
