import React from 'react';
import {useCurrentFrame, spring, interpolate, staticFile, Img, useVideoConfig} from 'remotion';

export type BrandPanelProps = {
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  subtitle?: string;
  logo?: string | null;
  children?: React.ReactNode;
  showHeader?: boolean;
  headerLeftLabel?: string;
  headerRightLabel?: string;
  animateFrom?: 'left' | 'right' | 'none';
};

export const BrandShowcasePanel: React.FC<BrandPanelProps> = ({
  className,
  style,
  title = '',
  subtitle = '',
  logo = null,
  children,
  showHeader = false,
  headerLeftLabel = 'BRAND',
  headerRightLabel = 'Showcase',
  animateFrom = 'none',
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const enter = spring({frame, fps, config: {damping: 16}});
  const x = interpolate(
    enter,
    [0, 1],
    [animateFrom === 'right' ? 80 : animateFrom === 'left' ? -80 : 0, 0]
  );
  const o = interpolate(enter, [0, 1], [0, 1]);
  const float = Math.sin(frame / 18) * 3;

  const baseStyle: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    width: '100%',
    minHeight: 320,
    borderRadius: 18,
    background:
      'linear-gradient(160deg, rgba(99,102,241,0.35), rgba(56,189,248,0.28)), radial-gradient(1200px 400px at 10% 0%, rgba(56,189,248,0.25) 0%, rgba(0,0,0,0) 60%), radial-gradient(1200px 400px at 100% 100%, rgba(99,102,241,0.25) 0%, rgba(0,0,0,0) 60%)',
    backdropFilter: 'blur(6px)',
    boxShadow: '0 24px 64px rgba(0,0,0,0.28)',
    transform: `translateX(${x}px) translateY(${float}px)`,
    opacity: o,
    overflow: 'hidden',
    color: 'white',
    ...style,
  };

  const shine = Math.max(0, Math.sin(frame / 12));

  return (
    <div className={className} style={baseStyle}>
      <svg width="100%" height="100%" style={{position: 'absolute', inset: 0, opacity: 0.16}}>
        {Array.from({length: 12}).map((_, i) => (
          <line key={`v-${i}`} x1={(i + 1) * 30} y1={0} x2={(i + 1) * 30} y2={600} stroke="#fff" strokeWidth={0.6} />
        ))}
        {Array.from({length: 12}).map((_, i) => (
          <line key={`h-${i}`} x1={0} y1={(i + 1) * 30} x2={600} y2={(i + 1) * 30} stroke="#fff" strokeWidth={0.6} />
        ))}
      </svg>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(120deg, rgba(255,255,255,0) 35%, rgba(255,255,255,0.16) 50%, rgba(255,255,255,0) 65%)',
          transform: `translateX(${(shine - 0.5) * 80}%) rotate(4deg)`,
          transition: 'transform 0.2s linear',
          pointerEvents: 'none',
        }}
      />

      <div style={{position: 'relative', padding: 20, display: 'flex', flexDirection: 'column', flex: 1}}>
        {showHeader && (
          <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
            <div
              style={{
                padding: '6px 10px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.14)',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 1.2,
              }}
            >
              {headerLeftLabel}
            </div>
            <div style={{opacity: 0.7, fontSize: 12}}>{headerRightLabel}</div>
          </div>
        )}

        <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {children ? (
            children
          ) : logo ? (
            <Img
              src={staticFile(logo)}
              style={{maxWidth: '85%', maxHeight: 160, objectFit: 'contain', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.35))'}}
            />
          ) : null}
        </div>

        {(title || subtitle) && (
          <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
            {title && <div style={{fontSize: 20, fontWeight: 800, lineHeight: 1.2}}>{title}</div>}
            {subtitle && <div style={{fontSize: 14, opacity: 0.9}}>{subtitle}</div>}
          </div>
        )}
      </div>
    </div>
  );
};
