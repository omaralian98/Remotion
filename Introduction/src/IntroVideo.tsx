import React from 'react';
import {AbsoluteFill, Html5Audio, staticFile, useVideoConfig} from 'remotion';
import {NoiseBackground} from './components/NoiseBackground';
import {AnimatedBlobs} from './components/AnimatedBlobs';
import {LogoAndTitleContainer} from './components/LogoAndTitleContainer';
import {Subtitle} from './components/Subtitle';
import {FeatureBullets} from './components/FeatureBullets';
import {OutroTransition} from './components/OutroTransition';
import {TransitionSeries} from '@remotion/transitions';
import {PresentationLogo} from "./components/PresentationLogo";
import {FadeToBlack} from './components/FadeToBlack';
import {Credits} from './components/Credits';


export const IntroVideo: React.FC = () => {
    const {fps} = useVideoConfig();
    const DUR_LOGO = fps * 3;
    const DUR_SUBTITLE = fps * 3.5;
    const DUR_FEATURES = fps * 5;
    const DUR_CREDITS = fps * 8;
    const DUR_OUTRO_VISIBLE = fps * 3;
    const DUR_FADE = fps * 2;

    const DUR_OUTRO_TOTAL = DUR_OUTRO_VISIBLE + DUR_FADE;

    const OUTRO_START = DUR_LOGO + DUR_SUBTITLE + DUR_FEATURES + DUR_CREDITS;
    const FADE_START = OUTRO_START + DUR_OUTRO_VISIBLE;

    return (
        <AbsoluteFill className="remotion-base">
            <NoiseBackground />
            <AnimatedBlobs />
            <Html5Audio src={staticFile('/music/Presentation.mp3')} trimBefore={220} volume={0.2} />
            <PresentationLogo outroStart={OUTRO_START} />
            
            <TransitionSeries>
                <TransitionSeries.Sequence durationInFrames={DUR_LOGO}>
                    <LogoAndTitleContainer />
                </TransitionSeries.Sequence>

                <TransitionSeries.Sequence durationInFrames={DUR_SUBTITLE}>
                    <Subtitle />
                </TransitionSeries.Sequence>

                <TransitionSeries.Sequence durationInFrames={DUR_FEATURES}>
                    <FeatureBullets />
                </TransitionSeries.Sequence>

                <TransitionSeries.Sequence durationInFrames={DUR_CREDITS}>
                    <Credits />
                </TransitionSeries.Sequence>

                <TransitionSeries.Sequence durationInFrames={DUR_OUTRO_TOTAL}>
                    <OutroTransition />
                </TransitionSeries.Sequence>
            </TransitionSeries>

            <FadeToBlack fadeDurationFrames={DUR_FADE} startAtFrame={FADE_START}/>
        </AbsoluteFill>
    );
};
