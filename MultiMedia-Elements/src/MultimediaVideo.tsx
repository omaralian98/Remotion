import React from 'react';
import { AbsoluteFill, Img, staticFile, Html5Audio} from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import {wipe} from "@remotion/transitions/wipe";
import {NoiseBackground} from "./NoiseBackground";
import {Outro} from "./Outro";
import {PresentationLogo} from "./PresentationLogo";


const slides = [
    {
        text: "المؤتمرات عن بعد",
        image: "/images/online-meeting.svg",
    },
    {
        text: "التعليم عن بعد",
        image: "/images/online-learning.svg",
    },
    {
        text: "الطب عن بعد",
        image: "/images/telemedicine.svg",
    },
    {
        text: "الألعاب التفاعلية",
        image: "/images/gaming.svg",
    },
    {
        text: "تحليل الصور والفيديو",
        image: "/images/analysis.svg",
    },
    {
        text: "التعرف على الأصوات والوجوه والبصمات",
        image: "/images/biometrics.svg",
    },
    {
        text: "بناء المشاهد ثلاثية الأبعاد باستخدام الكاميرات",
        image: "/images/3d.svg",
    },
];

export const MultimediaVideo: React.FC = () => {
    const introDuration = 90;
    const slideDuration = 90;
    const transitionDuration = 20;
    const outroStartFrame = introDuration + slides.length * slideDuration - (slides.length * transitionDuration);

    return (
        <AbsoluteFill className="app">
            <NoiseBackground/>
            
            <Html5Audio src={staticFile('/music/Presentation.mp3')} trimBefore={150} volume={0.2} />
            <PresentationLogo outroStart={outroStartFrame} />


            <TransitionSeries>
                <TransitionSeries.Sequence durationInFrames={90}>
                    <AbsoluteFill className="center">
                        <h1 className="intro-title">من أهم تطبيقات وعناصر الوسائط المتعددة</h1>
                    </AbsoluteFill>
                </TransitionSeries.Sequence>

                <TransitionSeries.Transition presentation={wipe()} timing={linearTiming({ durationInFrames: 20 })} />

                {slides.map((s, i) => (
                    <React.Fragment key={i}>
                        <TransitionSeries.Sequence durationInFrames={90} >
                            <AbsoluteFill className="center">
                                <Img src={staticFile(s.image)} className="slide-img" />
                                <h1 className="slide-title">{s.text}</h1>
                            </AbsoluteFill>
                        </TransitionSeries.Sequence>
                        {i !== slides.length - 1 && (
                            <TransitionSeries.Transition presentation={wipe({direction:  i % 2 == 0 ? 'from-right' : 'from-left'})} timing={linearTiming({ durationInFrames: 20 })} />
                        )}
                    </React.Fragment>
                ))}

                <TransitionSeries.Sequence durationInFrames={60}>
                    <Outro />
                </TransitionSeries.Sequence>
            </TransitionSeries>
        </AbsoluteFill>
    );
};