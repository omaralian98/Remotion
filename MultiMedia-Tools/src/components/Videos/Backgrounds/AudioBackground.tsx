import React from "react";
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from "remotion";
import {BackgroundLabel} from "./BackgroundLabel";
import {BackgroundProps} from "./BackgroundProps";

export const AudioBackground: React.FC<BackgroundProps> = ({isSpotlighted, anchorFrame, titleDelay,}) => {
    const frame = useCurrentFrame();
    const {fps} = useVideoConfig();

    const bars = new Array(18).fill(0).map((_, i) => {
        const t = frame / fps + i * 0.12;
        const h = 0.15 + 0.65 * (0.5 + 0.5 * Math.sin(t * 6 + i));
        return Math.max(0.02, Math.min(1, h));
    });

    let blur = 0;
    if (isSpotlighted && anchorFrame !== null) {
        const startFrame = anchorFrame;
        const endFrame = anchorFrame + Math.floor(titleDelay * fps);

        blur = interpolate(
            frame,
            [startFrame, endFrame],
            [0, 4],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
    }

    return (
        <AbsoluteFill style={{ filter: `blur(${blur}px)` }}>
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#051025",
                }}
            >
                <div
                    style={{
                        width: "85%",
                        height: "60%",
                        display: "flex",
                        gap: 6,
                        alignItems: "end",
                    }}
                >
                    {bars.map((h, idx) => (
                        <div
                            key={idx}
                            style={{
                                width: `${100 / bars.length}%`,
                                height: `${h * 100}%`,
                                background: `linear-gradient(180deg,#7dd3fc, #0369a1)`,
                                borderRadius: 4,
                                boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                            }}
                        />
                    ))}
                </div>
            </div>
            <BackgroundLabel text="برامج الصوت" />
        </AbsoluteFill>
    );
};
