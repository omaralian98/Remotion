import React from 'react';
import {Composition} from 'remotion';
import MainVideo from "./MainVideo";
import {AudioSlide, ImagesSlide, VideoSlide, ModelingSlide} from './components/Videos';

export type Durations = {
    zoomin: number;
    zoomout: number;
    reset: number;
    audio: number;
    image: number;
    video: number;
    modeling: number;
    total: number;
    outro: number;
};


const FPS = 30;
const Durations: Durations = {
    zoomin: 1.5,
    reset: 0.5,
    zoomout: 1.5,
    audio: 14.5,
    image: 14.5,
    video: 14.5,
    modeling: 16.5,
    outro: 5,
    total: 0,
};

Durations.total = Durations.audio + Durations.image + Durations.video + Durations.modeling + Durations.outro + 4 * (Durations.zoomin + Durations.zoomout + Durations.reset);

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="MultimediaTools"
                component={MainVideo}
                defaultProps={Durations}
                durationInFrames={Durations.total! * FPS}
                fps={FPS}
                width={1920}
                height={1080}
            />
            
            <Composition
                id="AudioSlide"
                component={AudioSlide}
                defaultProps={{isSpotlighted: true}}
                durationInFrames={Durations.audio * FPS}
                fps={FPS}
                width={960}
                height={540}
            />

            <Composition
                id="ImagesSlide"
                component={ImagesSlide}
                defaultProps={{isSpotlighted: true}}
                durationInFrames={Durations.image * FPS}
                fps={FPS}
                width={960}
                height={540}
            />

            <Composition
                id="VideoSlide"
                component={VideoSlide}
                defaultProps={{isSpotlighted: true}}
                durationInFrames={Durations.video * FPS}
                fps={FPS}
                width={960}
                height={540}
            />

            <Composition
                id="ModelingSlide"
                component={ModelingSlide}
                defaultProps={{isSpotlighted: true}}
                durationInFrames={Durations.modeling * FPS}
                fps={FPS}
                width={960}
                height={540}
            />

        </>
    );
};
