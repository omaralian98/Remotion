import React from "react";
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";
import {BackgroundLabel} from "./BackgroundLabel";
import {BackgroundProps} from "./BackgroundProps";

export const ImagesBackground: React.FC<BackgroundProps> = ({isSpotlighted, anchorFrame, titleDelay,}) => {
    const frame = useCurrentFrame();
    const {fps} = useVideoConfig();

    let blur = 0;
    if (isSpotlighted && anchorFrame !== null) {
        const startFrame = anchorFrame;
        const endFrame = anchorFrame + Math.floor(titleDelay * fps);

        blur = interpolate(
            frame,
            [startFrame, endFrame],
            [0, 4],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
    }


    const rot = interpolate(Math.sin(frame / (fps * 0.6)), [-1, 1], [-8, 8]);
    const pop = spring({fps, frame, config: {stiffness: 80, damping: 12}});

    const cards = [
        {color: '#fef3c7', text: 'Illustrator'},
        {color: '#fee2e2', text: 'Photoshop'},
        {color: '#d1fae5', text: 'Assets'},
    ];

    return (
        <AbsoluteFill style={{ filter: `blur(${blur}px)` }}>
            <div style={{width: '100%', height: '100%', display:'flex', alignItems:'center', justifyContent:'center', background:'#081017'}}>
                <div style={{position:'relative', width:'70%', height:'70%'}}>
                    {cards.map((c, i) => {
                        const angle = rot + i * 6;
                        const translateX = (i - 1) * 24 * (0.6 + 0.4 * pop);
                        return (
                            <div key={i} style={{
                                position:'absolute',
                                top: `${10 + i * 6}%`,
                                left: `${20 + (i * 4)}%`,
                                width: '60%',
                                height: '60%',
                                transform: `translateX(${translateX}px) rotate(${angle}deg) scale(${0.95 + pop*0.05})`,
                                background: c.color,
                                borderRadius: 12,
                                boxShadow: '0 12px 30px rgba(2,6,23,0.6)',
                                display:'flex',
                                alignItems:'center',
                                justifyContent:'center',
                                fontWeight:700,
                                fontSize: 28,
                                color: '#0f172a',
                            }}>
                                {c.text}
                            </div>
                        );
                    })}
                </div>
            </div>
            <BackgroundLabel text="برامج الرسم والصور"/>
        </AbsoluteFill>
    );
};