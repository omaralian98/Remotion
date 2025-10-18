import React from "react";
import {
    Img,
    staticFile,
    useCurrentFrame,
    interpolate,
    Easing,
} from "remotion";

export const PresentationLogo: React.FC<{ outroStart: number; }> = ({outroStart}) => {
    const frame = useCurrentFrame();

    const enterX = interpolate(frame, [0, 20], [-80, 0], {
        easing: Easing.out(Easing.cubic),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const enterOpacity = interpolate(frame, [0, 20], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const glow = interpolate(
        frame % 120,
        [0, 60, 120],
        [0, 12, 0],
        {extrapolateLeft: "clamp", extrapolateRight: "clamp"}
    );

    const exitOpacity = interpolate(
        frame,
        [outroStart - 20, outroStart],
        [1, 0],
        {extrapolateLeft: "clamp", extrapolateRight: "clamp"}
    );

    const exitX = interpolate(
        frame,
        [outroStart - 20, outroStart],
        [0, -100],
        {extrapolateLeft: "clamp", extrapolateRight: "clamp"}
    );

    return (
        <Img
            src={staticFile("/images/MediatoLogo.svg")}
            style={{
                position: "absolute",
                top: 22,
                left: 22,
                height: 70,
                opacity: enterOpacity * exitOpacity,
                transform: `translateX(${enterX + exitX}px)`,
                filter: `drop-shadow(0 0 ${glow}px rgba(0,0,0,0.35))`,
            }}
        />
    );
};
