import React from 'react';
import {AbsoluteFill, useCurrentFrame, spring, interpolate, Img, staticFile, useVideoConfig} from 'remotion';

export const OutroTransition: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	// Introduce a slight delay and a gentler spring to slow down entrance
	const introDelay = Math.round(0.8 * fps);
	const localFrame = Math.max(0, frame - introDelay);

	// Logo entrance: fade + bounce-in scale + slight settle rotation + rise
	const bounce = spring({frame: localFrame, fps, config: {damping: 14, stiffness: 80}});
	const logoOpacity = interpolate(localFrame, [0, 24, 48], [0, 0.9, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const logoScale = interpolate(bounce, [0, 0.7, 1], [0.85, 1.06, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const logoRotate = interpolate(bounce, [0, 1], [-8, 0]);
	const logoY = interpolate(bounce, [0, 1], [16, 0]);

	// Keep subtle message animation for energy
	const progress = spring({frame: localFrame, fps, config: {damping: 13, stiffness: 90}});
	const messageFade = interpolate(progress, [0, 1], [0, 1]);
	const messageY = interpolate(progress, [0, 1], [20, 0]);

	return (
		<AbsoluteFill className="remotion-center">
			{/* Centered full logo with refined animation */}
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', height: '100%', width: '100%'}}>
                <Img
                    src={staticFile('/images/MediatoLogo.svg')}
                    style={{
                        width: '600px',
                        marginLeft: '35px',
                        maxWidth: 1150,
                        opacity: logoOpacity,
                        transform: `translateY(${logoY}px) scale(${logoScale}) rotate(${logoRotate}deg)`,
                        filter: 'drop-shadow(0 6px 24px rgba(0,0,0,0.25))',
                    }}
                />

                {/* Message */}
                <h2 className="outro-message" style={{fontSize: '70px', opacity: messageFade, transform: `translateY(${messageY}px)`}}>
                    !فلنتعلم سويًا
                </h2>
            </div>
		</AbsoluteFill>
	);
};
