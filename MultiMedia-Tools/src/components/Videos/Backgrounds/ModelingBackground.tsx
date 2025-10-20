import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import {BackgroundLabel} from "./BackgroundLabel";
import {BackgroundProps} from "./BackgroundProps";


export const ModelingBackground: React.FC<BackgroundProps> = ({isSpotlighted, anchorFrame, titleDelay,}) => {
    const frame = useCurrentFrame();
    const {fps} = useVideoConfig();
    const rot = (frame / fps) * 30;
    
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
    
    return (
        <AbsoluteFill style={{ filter: `blur(${blur}px)` }}>
            <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', background:'#03030b'}}>
                <div style={{width:'54%', height:'54%', position:'relative', transform:`rotate(${rot}deg)`}}>
                    <div style={{
                        position:'absolute',
                        left: '18%',
                        top: '10%',
                        width:'64%',
                        height:'64%',
                        background:'linear-gradient(180deg,#60a5fa,#1e3a8a)',
                        borderRadius:8,
                        boxShadow:'0 18px 40px rgba(2,6,23,0.6)',
                        transform:'skewY(-8deg) scale(1)'
                    }} />
                    <div style={{
                        position:'absolute',
                        left:'0%',
                        top:'26%',
                        width:'64%',
                        height:'64%',
                        background:'linear-gradient(180deg,#34d399,#065f46)',
                        borderRadius:8,
                        transform:'skewX(8deg) translateY(-8%)',
                        opacity:0.95
                    }} />
                </div>
            </div>
            <BackgroundLabel text="برامج التحريك والتصميم الثلاثي الأبعاد"/>
        </AbsoluteFill>
    );
};