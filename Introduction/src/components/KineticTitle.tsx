import React from 'react';
import {useCurrentFrame, spring, interpolate, useVideoConfig} from 'remotion';

export type KineticProps = {
    text: string;
    baseClass?: string;
    initialOffsetY?: number;
    opacity?: number;
    isRTL?: boolean;
    tokenDelay?: number;
    damping?: number;
};

const defaultProps = {
    baseClass: '',
    initialOffsetY: -40,
    opacity: 1,
    isRTL: false,
    tokenDelay: 2, 
    damping: 16,
};

const KineticTitle: React.FC<KineticProps> = (props) => {
    const {
        text,
        baseClass,
        initialOffsetY,
        opacity,
        isRTL,
        tokenDelay,
        damping,
    } = {...defaultProps, ...props};

    const frame = useCurrentFrame();
    const {fps} = useVideoConfig();
    
    const tokens: string[] = isRTL ? text.split(/(\s+)/) : text.split('');

    let nonSpaceCount = 0;
    const staggerIndexMap = tokens.map((t) => {
        if (/^\s+$/.test(t)) {
            return -1; 
        }
        const idx = nonSpaceCount;
        nonSpaceCount += 1;
        return idx;
    });

    const effectiveTokenDelay = isRTL ? Math.max(4, tokenDelay!) : tokenDelay!;

    return (
        <h1
            className={baseClass}
            style={{
                opacity,
                direction: isRTL ? 'rtl' : 'ltr',
                unicodeBidi: isRTL ? 'isolate-override' : undefined,
            }}
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            {tokens.map((token, i) => {
                const isSpace = /^\s+$/.test(token);
                const staggerIdx = staggerIndexMap[i];

                if (isSpace) {
                    const visibleSpace = token.replace(/ /g, '\u00A0');
                    return (
                        <span
                            key={`space-${i}`}
                            style={{
                                display: 'inline-block',
                                whiteSpace: 'pre',
                            }}
                        >
              {visibleSpace}
            </span>
                    );
                }

                const local =
                    staggerIdx === -1 ? frame : Math.max(0, frame - staggerIdx * effectiveTokenDelay);

                const prog = spring({
                    frame: local,
                    fps,
                    config: {
                        damping,
                    },
                });

                const y = interpolate(prog, [0, 1], [initialOffsetY! + 10, 0]);
                const s = interpolate(prog, [0, 1], [0.96, 1]);
                const o = interpolate(prog, [0, 1], [0, 1]);

                return (
                    <span
                        key={i}
                        style={{
                            display: 'inline-block',
                            transform: `translateY(${y}px) scale(${s})`,
                            opacity: o,
                            whiteSpace: 'pre',
                        }}
                    >
            {token}
          </span>
                );
            })}
        </h1>
    );
};

export default KineticTitle;
