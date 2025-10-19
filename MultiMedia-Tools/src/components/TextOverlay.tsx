import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring} from 'remotion';

type Props = {
    title: string;
    intro: string;
    bullets: string[];
    zoomInFrames: number;
    explainFrames: number;
    zoomOutFrames: number;
};

const rtlStyle: React.CSSProperties = {
    direction: 'rtl',
    textAlign: 'right',
    color: 'white',
    pointerEvents: 'none',
};

const TitleStyle = (baseSize: number): React.CSSProperties => ({
    fontSize: baseSize,
    margin: 0,
    lineHeight: 1.05,
    fontWeight: 700,
});

const IntroStyle = (size: number): React.CSSProperties => ({
    fontSize: size,
    marginTop: 10,
    marginBottom: 8,
    lineHeight: 1.3,
});

const BulletStyle = (size: number): React.CSSProperties => ({
    fontSize: size,
    marginBottom: 6,
    lineHeight: 1.5,
});

const TextOverlay: React.FC<Props> = ({title, intro, bullets, zoomInFrames, explainFrames, zoomOutFrames}) => {
    const frame = useCurrentFrame();
    const {width, fps} = useVideoConfig();

    // We'll consider the Sequence starts at 0 for this overlay.
    const localFrame = frame;

    // dynamic font sizes based on width
    const baseTitleSize = Math.min(48, Math.round(width * 0.035));
    const baseIntroSize = Math.min(26, Math.round(width * 0.018));
    const baseBulletSize = Math.min(22, Math.round(width * 0.015));

    // fade-in for the whole overlay synced to zoom-in timing
    const totalIn = zoomInFrames;
    const titleOpacity = interpolate(localFrame, [0, Math.max(1, Math.round(totalIn * 0.25)), totalIn], [0, 1, 1], {extrapolateRight: 'clamp'});
    const introOpacity = interpolate(localFrame, [Math.round(totalIn * 0.2), Math.round(totalIn * 0.5), totalIn + 6], [0, 1, 1], {extrapolateRight: 'clamp'});

    // bullets appear sequentially during the explain period
    const bulletsStart = zoomInFrames + Math.round(0.2 * explainFrames);
    const bulletsEnd = zoomInFrames + explainFrames; // last bullet must be in by end of explain
    const bulletAppearSpacing = Math.max(1, Math.floor((bulletsEnd - bulletsStart) / Math.max(1, bullets.length)));

    // compute slide-in offset (small horizontal slide from right)
    const slideIn = (frameVal: number) =>
        interpolate(frameVal, [0, Math.max(1, Math.round(0.15 * fps)), Math.max(1, Math.round(0.45 * fps))], [50, 0, 0], {extrapolateRight: 'clamp'});

    // subtle scale using spring for pop effect on title
    const titleScale = spring({fps, frame: localFrame, config: {damping: 10, stiffness: 120}, from: 0.98, to: 1});

    return (
        <AbsoluteFill style={{...rtlStyle, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', padding: 60}}>
            <div style={{maxWidth: '55%'}}>
                <h2 style={{...TitleStyle(baseTitleSize), opacity: titleOpacity, transform: `scale(${titleScale})`}}>{title}</h2>

                <p
                    style={{
                        ...IntroStyle(baseIntroSize),
                        opacity: introOpacity,
                        transform: `translateX(${slideIn(localFrame)}px)`,
                        marginTop: 12,
                        color: '#dbeafe',
                    }}
                >
                    {intro}
                </p>

                <ul style={{paddingRight: 18, marginTop: 14, listStyleType: 'disc'}}>
                    {bullets.map((b, i) => {
                        const appearFrame = bulletsStart + i * bulletAppearSpacing;
                        const bulletOpacity = interpolate(localFrame, [appearFrame, appearFrame + Math.round(bulletAppearSpacing * 0.5)], [0, 1], {extrapolateRight: 'clamp'});
                        const bulletOffset = interpolate(localFrame, [appearFrame, appearFrame + Math.round(bulletAppearSpacing * 0.5)], [20, 0], {extrapolateRight: 'clamp'});

                        return (
                            <li
                                key={i}
                                style={{
                                    ...BulletStyle(baseBulletSize),
                                    opacity: bulletOpacity,
                                    transform: `translateX(${bulletOffset}px)`,
                                    color: '#fff',
                                }}
                            >
                                {b}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </AbsoluteFill>
    );
};

export default TextOverlay;
