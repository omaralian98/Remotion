import React from 'react';
import {AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig} from 'remotion';
import {BrandShowcasePanel} from './BrandShowcasePanel';

export const Credits: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const names = [
		'omar_192751',
		'ismail_190735',
		'monther_189247',
		'mohamed_alaa_187379',
		'ammar_190246',
		'osama_214968',
		'oday_211954',
	];

	const staggerSec = 1;
	const delayFrames = Math.round(staggerSec * fps);
	const baseDelaySec = 0.6;
	const baseDelayFrames = Math.round(baseDelaySec * fps);

	const renderList = (items: string[]) => (
		<div style={{display: 'flex', flexDirection: 'column', gap: 12, width: '100%'}}>
			{items.map((name, i) => {
				const local = Math.max(0, frame - (baseDelayFrames + i * delayFrames));
				const prog = spring({frame: local, fps, config: {damping: 14, stiffness: 70}});
				const fade = interpolate(prog, [0, 1], [0, 1]);
				const y = interpolate(prog, [0, 1], [12, 0]);
				return (
					<div
						key={name}
						style={{
							opacity: fade,
							transform: `translateY(${y}px)`,
							fontSize: 36,
							fontWeight: 800,
							textShadow: '0 6px 18px rgba(0,0,0,0.45)',
							letterSpacing: 0.4,
							color: '#3f4fa5',
							textAlign: 'center',
							lineHeight: 1.15,
							whiteSpace: 'nowrap',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							maxWidth: '100%',
						}}
					>
						{name}
					</div>
				);
			})}
		</div>
	);

	return (
		<AbsoluteFill className="remotion-center">
			<div style={{position: 'absolute', width: '800px'}}>
				<BrandShowcasePanel
					showHeader={false}
					title={undefined}
					subtitle={undefined}
					logo={null}
					animateFrom="none"
					style={{minHeight: 460}}
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: 18,
							width: '100%',
						}}
					>
						<div
							style={{
								fontSize: 44,
								fontWeight: 900,
								letterSpacing: 0.6,
								color: '#4a5ad1',
								textShadow: '0 8px 22px rgba(0,0,0,0.5)',
								marginBottom: 6,
								textAlign: 'center',
							}}
						>
                            :من تقديم
						</div>

						<div style={{width: '100%', maxWidth: 900}}>{renderList(names)}</div>
					</div>
				</BrandShowcasePanel>
			</div>
		</AbsoluteFill>
	);
};
