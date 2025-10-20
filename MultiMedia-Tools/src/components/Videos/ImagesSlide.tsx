import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {ImagesBackground} from './Backgrounds';
import KineticTitle from "../KineticTitle";
import { SlideTextPanel } from "./SlideTextPanel";

export const ImagesSlide: React.FC<{isSpotlighted: boolean}> = ({isSpotlighted}) => {
    const frame = useCurrentFrame();
    const {fps} = useVideoConfig();

    const [anchorFrame, setAnchorFrame] = React.useState<number | null>(null);

    React.useEffect(() => {
        if (isSpotlighted && anchorFrame === null) {
            setAnchorFrame(frame);
        } else if (!isSpotlighted && anchorFrame !== null) {
            setAnchorFrame(null);
        }
    }, [isSpotlighted, frame, anchorFrame]);

    const toFrames = (s: number) => (anchorFrame ?? 0) + Math.floor(s * fps);

    const titleDelay = 0.5;
    const subtitleDelay = 5;
    const bulletsDelay = 3;
    const bulletGap = 3;

    return (
        <AbsoluteFill>
            <ImagesBackground
                isSpotlighted={isSpotlighted}
                anchorFrame={anchorFrame}
                titleDelay={titleDelay}
            />
            {isSpotlighted && anchorFrame !== null && (
                <SlideTextPanel style={{width: '80%', height: '80%'}}>
                    <Sequence from={toFrames(titleDelay)} layout="none">
                        <KineticTitle
                            text="تُستخدم برامج الرسم والصور لإنشاء وتحرير الرسومات والصور الثابتة، من الشعارات المتجهة إلى تحسين الصور والضبط اللوني"
                            isRTL
                            baseClass="text-2xl md:text-3xl font-semibold leading-snug"
                            damping={18}
                            tokenDelay={4}
                            initialOffsetY={-30}
                        />
                    </Sequence>

                    <Sequence from={toFrames(titleDelay + subtitleDelay)} layout="none">
                        <KineticTitle
                            text="احد أهم برامج تعديل الرسومات والصور:"
                            isRTL
                            baseClass="text-xl md:text-2xl font-bold"
                            damping={18}
                            initialOffsetY={-28}
                        />
                    </Sequence>

                    <div style={{height: '20px'}}></div>

                    <Sequence from={toFrames(titleDelay + subtitleDelay + bulletsDelay)} layout="none">
                        <div style={{display: 'flex', flexDirection: 'row-reverse', alignItems: 'baseline', gap: '10px'}}>
                            <KineticTitle
                                text="• Adobe Illustrator:"
                                isRTL={false}
                                inLine={true}
                                baseClass="text-lg md:text-xl"
                                damping={18}
                                initialOffsetY={-24}
                            />
                            <KineticTitle
                                text="تصميم الشعارات والرسومات المتجهة"
                                isRTL
                                inLine={true}
                                baseClass="text-lg md:text-xl"
                                damping={18}
                                initialOffsetY={-24}
                            />
                        </div>
                    </Sequence>


                    <Sequence from={toFrames(titleDelay + subtitleDelay + bulletsDelay + bulletGap)} layout="none">
                        <div style={{display: 'flex', flexDirection: 'row-reverse', alignItems: 'baseline', gap: '10px'}}>
                            <KineticTitle
                                text="• Adobe Photoshop:"
                                isRTL={false}
                                inLine={true}
                                baseClass="text-lg md:text-xl"
                                damping={18}
                                initialOffsetY={-24}
                            />
                            <KineticTitle
                                text="تعديل الصور، معالجة الطبقات والضبط اللوني"
                                isRTL
                                inLine={true}
                                baseClass="text-lg md:text-xl"
                                damping={18}
                                initialOffsetY={-24}
                            />
                        </div>
                    </Sequence>
                </SlideTextPanel>
            )}
        </AbsoluteFill>
    );
};

export default ImagesSlide;