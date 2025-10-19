// src/components/DemoClips.tsx
import React from 'react';
import {useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';

export const DemoClipAudio: React.FC = () => {
    const frame = useCurrentFrame();
    const {fps} = useVideoConfig();

    // animated bars (waveform style)
    const bars = new Array(18).fill(0).map((_, i) => {
        const t = frame / fps + i * 0.12;
        const h = 0.15 + 0.65 * (0.5 + 0.5 * Math.sin(t * 6 + i));
        return Math.max(0.02, Math.min(1, h));
    });

    return (
        <div style={{width: '100%', height: '100%', display:'flex', alignItems:'center', justifyContent:'center', background:'#051025'}}>
            <div style={{width: '85%', height: '60%', display:'flex', gap: 6, alignItems:'end'}}>
                {bars.map((h, idx) => (
                    <div key={idx} style={{
                        width: `${100 / bars.length}%`,
                        height: `${h * 100}%`,
                        background: `linear-gradient(180deg,#7dd3fc, #0369a1)`,
                        borderRadius: 4,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
                    }} />
                ))}
            </div>
        </div>
    );
};

export const DemoClipImages: React.FC = () => {
    const frame = useCurrentFrame();
    const {fps} = useVideoConfig();

    // subtle rotation and slide using spring
    const rot = interpolate(Math.sin(frame / (fps * 0.6)), [-1, 1], [-8, 8]);
    const pop = spring({fps, frame, config: {stiffness: 80, damping: 12}});

    const cards = [
        {color: '#fef3c7', text: 'Illustrator'},
        {color: '#fee2e2', text: 'Photoshop'},
        {color: '#d1fae5', text: 'Assets'},
    ];

    return (
        <div style={{width: '100%', height: '100%', display:'flex', alignItems:'center', justifyContent:'center', background:'#081017'}}>
            <div style={{position:'relative', width:'70%', height:'70%'}}>
                {cards.map((c, i) => {
                    const offset = (i - 1) * 18;
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
    );
};

export const DemoClipVideo: React.FC = () => {
    const frame = useCurrentFrame();
    const {fps} = useVideoConfig();
    const playhead = (frame % Math.round(1.2 * fps)) / (1.2 * fps);

    return (
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
    );
};

export const DemoClip3D: React.FC = () => {
    const frame = useCurrentFrame();
    const {fps} = useVideoConfig();
    const rot = (frame / fps) * 30;

    // rotate "cube" via 2D transforms to simulate 3D
    return (
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
    );
};

const DemoClipMap: Record<string, React.FC> = {
    audio: DemoClipAudio,
    images: DemoClipImages,
    video: DemoClipVideo,
    '3d': DemoClip3D,
};

export const DemoClip: React.FC<{id: string}> = ({id}) => {
    const Comp = DemoClipMap[id] ?? DemoClipVideo;
    return <Comp />;
};
