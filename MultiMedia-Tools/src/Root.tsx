import React from 'react';
import {Composition} from 'remotion';
import MainVideo from './MainVideo';

// We'll choose fps = 30 as composition fps. MainVideo computes internal timings using useVideoConfig().fps
// durationInFrames is computed with reference fps=30 to cover default total time.
// If you change fps in the Composition, Remotion UI expects durationInFrames to be updated accordingly.
// The MainVideo itself will scale animations based on actual fps.
const FPS = 30;

// basic timing constants (seconds) used to compute a default duration
const INTRO_SEC = 1;
const GRID_PAUSE_SEC = 0.6;
const ZOOM_IN_SEC = 0.6;
const EXPLAIN_SEC = 3.0;
const ZOOM_OUT_SEC = 0.6;
const OUTRO_VISIBLE_SEC = 2.5;
const FADE_SEC = 2;

const SLIDE_SEC = ZOOM_IN_SEC + EXPLAIN_SEC + ZOOM_OUT_SEC;
const TOTAL_SEC =
    INTRO_SEC + GRID_PAUSE_SEC + SLIDE_SEC * 4 + OUTRO_VISIBLE_SEC + FADE_SEC;

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="MultimediaTools"
                component={MainVideo}
                durationInFrames={Math.round(TOTAL_SEC * FPS)}
                fps={FPS}
                width={1920}
                height={1080}
            />
        </>
    );
};

export default RemotionRoot;
