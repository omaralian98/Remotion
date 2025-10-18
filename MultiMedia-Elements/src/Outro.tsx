import React from "react";
import {
    AbsoluteFill,
    Img,
    staticFile,
    useCurrentFrame,
    interpolate,
    Easing,
} from "remotion";

export const Outro: React.FC = () => {
    const frame = useCurrentFrame();

    const appear = 15;
    const hold = 30;
    const exit = 15;

    const iconOpacity = interpolate(frame, [0, appear, appear + hold, appear + hold + exit], [0, 1, 1, 0], {
        extrapolateRight: "clamp",
    });

    const iconScale = interpolate(
        frame,
        [0, appear * 0.6, appear],
        [0.5, 1.1, 1],
        { easing: Easing.out(Easing.back(1.7)), extrapolateRight: "clamp" }
    );

    const iconExitX = interpolate(
        frame,
        [appear + hold, appear + hold + exit],
        [0, -120],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    // Text
    const textOpacity = interpolate(frame, [5, appear + 5, appear + hold, appear + hold + exit], [0, 1, 1, 0], {
        extrapolateRight: "clamp",
    });

    const textScale = interpolate(
        frame,
        [5, appear, appear + 10],
        [0.8, 1.05, 1],
        { easing: Easing.out(Easing.back(1.4)), extrapolateRight: "clamp" }
    );

    const textExitX = interpolate(
        frame,
        [appear + hold, appear + hold + exit],
        [0, 200],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    return (
        <AbsoluteFill
            style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                gap: 20,
            }}
        >
            <Img
                src={staticFile("/images/MediatoIcon.svg")}
                style={{
                    height: 115,
                    opacity: iconOpacity,
                    transform: `translateX(${iconExitX}px) scale(${iconScale})`,
                }}
            />
            <div
                style={{
                    fontSize: 120,
                    fontWeight: "900",
                    fontFamily: "Lexend",
                    color: "black",
                    opacity: textOpacity,
                    transform: `translateX(${textExitX}px) scale(${textScale})`,
                    letterSpacing: 2,
                }}
            >
                Mediato
            </div>
        </AbsoluteFill>
    );
};
