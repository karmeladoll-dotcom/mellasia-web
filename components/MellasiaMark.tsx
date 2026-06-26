'use client';

type MellasiaMarkProps = {
  size?: number;
  color?: string;
};

/**
 * Interim studio mark: tracked "MELLASIA" wordmark + a minimal CSS/inline-SVG
 * frame-and-focus glyph beside it. Designed so a final SVG mark can replace
 * this component without touching consumers.
 */
export default function MellasiaMark({
  size = 14,
  color = 'var(--bone-0)',
}: MellasiaMarkProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        color,
        fontFamily: "var(--font-display)",
        fontSize: 'clamp(18px, 2.2vw, 22px)',
        letterSpacing: '0.32em',
        fontWeight: 400,
        textTransform: 'uppercase',
        lineHeight: 1,
      }}
    >
      {/* Frame + focus dot glyph */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        stroke={color}
        strokeWidth="1"
        aria-hidden="true"
        style={{ flexShrink: 0, marginTop: 1 }}
      >
        <rect x="1.5" y="1.5" width="13" height="13" />
        <circle cx="8" cy="8" r="1.4" fill={color} stroke="none" />
      </svg>
      <span>MELLASIA</span>
    </span>
  );
}
