import React from 'react';
import {
    AbsoluteFill,
    Html5Audio,
    Sequence,
    staticFile,
    useVideoConfig,
    useCurrentFrame,
    interpolate,
} from 'remotion';
import Grid from './components/Grid';
import {PresentationLogo} from './components/PresentationLogo';
import {Durations} from './Root';
import {FadeToBlack} from './components/FadeToBlack';

export const VideoInfoContext = React.createContext<Durations>({} as Durations);

const MainVideo: React.FC<Durations> = (Durations) => {
    const {fps} = useVideoConfig();
    const frame = useCurrentFrame();

    const outroStartFrame = fps * (Durations.total - Durations.outro);
    const outroEndFrame = fps * Durations.total;

    const volume = interpolate(
        frame,
        [outroStartFrame, outroEndFrame],
        [0.2, 0],
        {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
    );

    return (
        <AbsoluteFill style={{backgroundColor: '#000'}}>
            <PresentationLogo outroStart={9999} />
            <Html5Audio
                src={staticFile('/music/Presentation.mp3')}
                trimBefore={220}
                volume={volume}
            />
            <VideoInfoContext.Provider value={Durations}>
                <Sequence from={0} durationInFrames={fps * Durations.total}>
                    <Grid />
                </Sequence>
                <Sequence
                    from={outroStartFrame}
                    durationInFrames={fps * Durations.outro}
                >
                    <FadeToBlack fadeDurationFrames={fps * Durations.outro} />
                </Sequence>
            </VideoInfoContext.Provider>
        </AbsoluteFill>
    );
};

export default MainVideo;
