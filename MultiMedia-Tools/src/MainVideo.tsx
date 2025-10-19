import React from 'react';
import {
    AbsoluteFill,
    Html5Audio,
    staticFile,
    Sequence,
    useVideoConfig,
} from 'remotion';
import {slides} from './content';
import ThumbnailGrid from './components/ThumbnailGrid';
import TextOverlay from './components/TextOverlay';
import {PresentationLogo} from './components/PresentationLogo';
import {FadeToBlack} from './components/FadeToBlack';

const MainVideo: React.FC = () => {
    const {fps} = useVideoConfig();

    // durations (in seconds) that scale with fps internally
    const introSec = 0; // Start immediately with grid
    const gridPauseSec = 0.6;
    const zoomInSec = 0.6;
    const explainSec = 3.0;
    const zoomOutSec = 0.6;
    const outroVisibleSec = 2.5;
    const fadeSec = 2;

    const introFrames = Math.round(introSec * fps);
    const gridPauseFrames = Math.round(gridPauseSec * fps);
    const zoomInFrames = Math.round(zoomInSec * fps);
    const explainFrames = Math.round(explainSec * fps);
    const zoomOutFrames = Math.round(zoomOutSec * fps);
    const segmentFrames = zoomInFrames + explainFrames + zoomOutFrames;
    const outroVisibleFrames = Math.round(outroVisibleSec * fps);
    const fadeFrames = Math.round(fadeSec * fps);

    const slidesCount = slides.length;
    const gridStart = introFrames;
    const gridDuration = gridPauseFrames + slidesCount * segmentFrames;

    const outroStartFrame = introFrames + gridPauseFrames + slidesCount * segmentFrames;

    return (
        <AbsoluteFill style={{backgroundColor: '#000'}}>
            {/* Audio only - no visual background elements */}
            <Html5Audio src={staticFile('/music/Presentation.mp3')} trimBefore={220} volume={0.2} />

            {/* Grid + zoom sequences - visible from start, FILLS THE ENTIRE SCREEN */}
            <Sequence from={gridStart} durationInFrames={gridDuration}>
                <ThumbnailGrid
                    slides={slides}
                    startFrame={gridStart}
                    segmentFrames={segmentFrames}
                />
            </Sequence>

            {/* For each slide show TextOverlay while the grid zooms into that slide */}
            {slides.map((s, idx) => {
                const from = gridStart + gridPauseFrames + idx * segmentFrames;
                return (
                    <Sequence key={s.id} from={from} durationInFrames={segmentFrames}>
                        <TextOverlay
                            title={s.title}
                            intro={s.intro}
                            bullets={s.bullets}
                            zoomInFrames={zoomInFrames}
                            explainFrames={explainFrames}
                            zoomOutFrames={zoomOutFrames}
                        />
                    </Sequence>
                );
            })}

            {/* PresentationLogo ABOVE everything else */}
            <PresentationLogo outroStart={outroStartFrame} />

            {/* Outro: show presentation logo outro segment and fade */}
            <Sequence from={outroStartFrame} durationInFrames={outroVisibleFrames + fadeFrames}>
                <AbsoluteFill />
            </Sequence>

            <FadeToBlack fadeDurationFrames={fadeFrames} startAtFrame={outroStartFrame + outroVisibleFrames} />
        </AbsoluteFill>
    );
};

export default MainVideo;

