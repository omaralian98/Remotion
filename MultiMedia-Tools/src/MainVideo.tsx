import React from 'react';
import {AbsoluteFill, Html5Audio, Sequence, staticFile, useVideoConfig} from 'remotion';
import Grid from './components/Grid';
import {PresentationLogo} from "./components/PresentationLogo";
import {Durations} from "./Root";
import {FadeToBlack} from "./components/FadeToBlack";

export const VideoInfoContext = React.createContext<Durations>({} as Durations);

const MainVideo: React.FC<Durations> = (Durations) => {
    const {fps} = useVideoConfig();
    
    return (
        <AbsoluteFill style={{backgroundColor: '#000'}}>
            <PresentationLogo outroStart={9999} />
            <Html5Audio src={staticFile('/music/Presentation.mp3')} trimBefore={220} volume={0.2} />
            <VideoInfoContext.Provider value={Durations}>
                <Sequence from={0} durationInFrames={fps * Durations.total}>
                    <Grid />
                </Sequence>
                <Sequence from={fps * (Durations.total - Durations.outro)} durationInFrames={fps * Durations.outro}>
                    <FadeToBlack fadeDurationFrames={fps * Durations.outro} />
                </Sequence>
            </VideoInfoContext.Provider>
        </AbsoluteFill>
    );
};

export default MainVideo;

