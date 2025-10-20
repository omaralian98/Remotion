import React, {useContext} from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig} from 'remotion';
import {GridCell} from "./GridCell";
import {AudioSlide, ImagesSlide, VideoSlide, ModelingSlide} from './Videos';
import {VideoInfoContext} from "../MainVideo";

export const Grid: React.FC = () => {
    const {fps} = useVideoConfig();
    const frame = useCurrentFrame();
    const durations = useContext(VideoInfoContext);

    const restDuration = durations.reset;
    const zoomInDuration = durations.zoomin;
    const zoomOutDuration = durations.zoomout;

    const topLeftSlideDuration = durations.audio;
    const topRightSlideDuration = durations.image;
    const bottomLeftSlideDuration = durations.video;
    const bottomRightSlideDuration = durations.modeling;

    const restFrames = restDuration * fps;
    const zoomInFrames = zoomInDuration * fps;
    const zoomOutFrames = zoomOutDuration * fps;

    const slideDurations = [
        topLeftSlideDuration,
        topRightSlideDuration,
        bottomLeftSlideDuration,
        bottomRightSlideDuration,
    ].map((s) => s * fps);

    const segmentFrames = slideDurations.map(
        (slideFrames) => restFrames + zoomInFrames + slideFrames + zoomOutFrames
    );

    let accumulated = 0;
    let spotlightIndex = 0;
    let localFrame = frame;

    for (let i = 0; i < segmentFrames.length; i++) {
        if (frame < accumulated + segmentFrames[i]) {
            spotlightIndex = i;
            localFrame = frame - accumulated;
            break;
        }
        accumulated += segmentFrames[i];
    }

    const slideFrames = slideDurations[spotlightIndex];
    const totalFrames = segmentFrames[spotlightIndex];

    const zoomInStart = restFrames;
    const zoomInEnd = restFrames + zoomInFrames;
    const zoomOutStart = restFrames + zoomInFrames + slideFrames;
    const zoomOutEnd = totalFrames;

    const scale = interpolate(
        localFrame,
        [0, zoomInStart, zoomInEnd, zoomOutStart, zoomOutEnd],
        [1, 1, 2, 2, 1],
        {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
    );

    const focusProgress = interpolate(
        localFrame,
        [zoomInStart, zoomInEnd, zoomOutStart, zoomOutEnd],
        [0, 1, 1, 0],
        {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
    );

    const baseDx = spotlightIndex === 0 ? 50 : spotlightIndex === 1 ? -50 : spotlightIndex === 2 ? 50 : -50;
    const baseDy = spotlightIndex === 0 ? 50 : spotlightIndex === 1 ? 50 : spotlightIndex === 2 ? -50 : -50;

    const tx = baseDx * focusProgress;
    const ty = baseDy * focusProgress;

    // Spotlight flags
    const audioIsSpotlighted =
        spotlightIndex === 0 &&
        localFrame >= zoomInEnd &&
        localFrame < zoomOutStart;

    const imagesIsSpotlighted =
        spotlightIndex === 1 &&
        localFrame >= zoomInEnd &&
        localFrame < zoomOutStart;

    const videoIsSpotlighted =
        spotlightIndex === 2 &&
        localFrame >= zoomInEnd &&
        localFrame < zoomOutStart;

    const modelingIsSpotlighted =
        spotlightIndex === 3 &&
        localFrame >= zoomInEnd &&
        localFrame < zoomOutStart;

    return (
        <AbsoluteFill style={{backgroundColor: 'black', overflow: 'hidden'}}>
            <div style={{width: '100%', height: '100%', transform: `translate(${tx}%, ${ty}%)`}}>
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        transform: `scale(${scale})`,
                        transformOrigin: 'center',
                        willChange: 'transform',
                    }}
                >
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gridTemplateRows: '1fr 1fr',
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <GridCell isSpotlit={spotlightIndex === 0} localFrame={localFrame} segmentFrames={segmentFrames[0]}>
                            <AudioSlide isSpotlighted={audioIsSpotlighted} />
                        </GridCell>

                        <GridCell isSpotlit={spotlightIndex === 1} localFrame={localFrame} segmentFrames={segmentFrames[1]}>
                            <ImagesSlide isSpotlighted={imagesIsSpotlighted} />
                        </GridCell>

                        <GridCell isSpotlit={spotlightIndex === 2} localFrame={localFrame} segmentFrames={segmentFrames[2]}>
                            <VideoSlide isSpotlighted={videoIsSpotlighted} />
                        </GridCell>

                        <GridCell isSpotlit={spotlightIndex === 3} localFrame={localFrame} segmentFrames={segmentFrames[3]}>
                            <ModelingSlide isSpotlighted={modelingIsSpotlighted} />
                        </GridCell>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};

export default Grid;
