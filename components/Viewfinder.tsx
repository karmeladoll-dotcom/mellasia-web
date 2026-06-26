'use client';

type ViewfinderProps = {
  /** Size of each corner tick arm in px. */
  size?: number;
  /** Stroke colour. Defaults to --rule-strong. */
  color?: string;
  /** Distance from the edge of the parent in px. */
  inset?: number;
  /** Stroke thickness in px. */
  thickness?: number;
};

/**
 * Four thin L-shaped corner ticks rendered absolutely inside a positioned parent.
 * Editorial framing motif — used on the hero frame, featured work block, lab slots.
 */
export default function Viewfinder({
  size = 22,
  color = 'var(--rule-strong)',
  inset = 14,
  thickness = 1,
}: ViewfinderProps) {
  const armStyle = { background: color };

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{ zIndex: 1 }}
    >
      {/* top-left */}
      <span style={{ position: 'absolute', top: inset, left: inset, width: size, height: thickness, ...armStyle }} />
      <span style={{ position: 'absolute', top: inset, left: inset, width: thickness, height: size, ...armStyle }} />
      {/* top-right */}
      <span style={{ position: 'absolute', top: inset, right: inset, width: size, height: thickness, ...armStyle }} />
      <span style={{ position: 'absolute', top: inset, right: inset, width: thickness, height: size, ...armStyle }} />
      {/* bottom-left */}
      <span style={{ position: 'absolute', bottom: inset, left: inset, width: size, height: thickness, ...armStyle }} />
      <span style={{ position: 'absolute', bottom: inset, left: inset, width: thickness, height: size, ...armStyle }} />
      {/* bottom-right */}
      <span style={{ position: 'absolute', bottom: inset, right: inset, width: size, height: thickness, ...armStyle }} />
      <span style={{ position: 'absolute', bottom: inset, right: inset, width: thickness, height: size, ...armStyle }} />
    </div>
  );
}
