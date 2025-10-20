import {interpolate} from "remotion";
import React from "react";

type GridCellProps = {
    isSpotlit: boolean;
    localFrame: number;
    segmentFrames: number;
    children: React.ReactNode;
};

export const GridCell: React.FC<GridCellProps> = ({isSpotlit, localFrame, segmentFrames, children}) => {
    // Dim non-spotlight cells during focus
    const dimOpacity = interpolate(
        localFrame,
        [0, segmentFrames * 0.25, segmentFrames * 0.75, segmentFrames],
        [0, isSpotlit ? 0 : 0.5, isSpotlit ? 0 : 0.5, 0],
        {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
    );

    return (
        <div style={{position: 'relative', width: '100%', height: '100%', overflow: 'hidden'}}>
            {children}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'black',
                    opacity: dimOpacity,
                    pointerEvents: 'none',
                }}
            />
        </div>
    );
};