import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import {BackgroundLabel} from "./BackgroundLabel";
import React from "react";
import {BackgroundProps} from "./BackgroundProps";

export const VideoBackground: React.FC<BackgroundProps> = ({isSpotlighted, anchorFrame, titleDelay,}) => {

    const frame = useCurrentFrame();
    const {fps} = useVideoConfig();
    const playhead = (frame % Math.round(1.2 * fps)) / (1.2 * fps);

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
            <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', background:'#020617'}}>
                <div style={{width:'88%', height:'66%', background:'#0b1220', borderRadius:12, padding:12, boxShadow:'0 10px 30px rgba(0,0,0,0.6)'}}>
                    <div style={{height:'70%', background: 'linear-gradient(90deg,#334155,#0f172a)', borderRadius:8, marginBottom:12, position:'relative', overflow:'hidden'}}>
                        <div style={{
                            position:'absolute',
                            left: `${playhead * 100}%`,
                            top: '40%',
                            width: 120,
                            height: 60,
                            transform: 'translateX(-50%)',
                            background: 'linear-gradient(90deg,#fca5a5,#f97316)',
                            borderRadius:8,
                            opacity: 0.9,
                            boxShadow:'0 6px 20px rgba(0,0,0,0.4)'
                        }} />
                    </div>
                    <div style={{height:'28%', display:'flex', alignItems:'center', gap:10}}>
                        <div style={{width:'6%', height:6, background:'#1f2937', borderRadius:4}} />
                        <div style={{flex:1, height:8, background:'#0ea5a9', borderRadius:6, transform:`scaleX(${0.2+playhead*0.8})`, transformOrigin:'left'}} />
                        <div style={{width:80, textAlign:'right', color:'#94a3b8', fontWeight:600}}>00:{Math.round(playhead*59).toString().padStart(2,'0')}</div>
                    </div>
                </div>
            </div>
            <BackgroundLabel text="برامج الفيديو"/>
        </AbsoluteFill>
    );
};
