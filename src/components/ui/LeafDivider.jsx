/**
 * LeafDivider — section transition strip.
 *
 * Phase 1–4: CSS-based gradient/clip-path approximation.
 * Phase 5: replace with IllustrationImage (divider-leaf-1 or divider-grass-top).
 *
 * variant: 'grass' | 'leaf'
 * flip: reverse the clip direction
 */
export default function LeafDivider({ variant = 'leaf', flip = false, className = '' }) {
  const colors = {
    grass: 'bg-leaf-mint',
    leaf:  'bg-morning-white',
  };

  return (
    <div
      aria-hidden="true"
      className={`w-full overflow-hidden ${className}`}
      style={{ height: 48, marginBottom: -2 }}
    >
      <div
        className={`w-full h-full ${colors[variant] || colors.leaf}`}
        style={{
          clipPath: flip
            ? 'ellipse(52% 100% at 50% 0%)'
            : 'ellipse(52% 100% at 50% 100%)',
        }}
      />
      {/* TODO Phase 5: replace this div with:
          <IllustrationImage name="divider-leaf-1" className="w-full h-auto" aria-hidden alt="" />
      */}
    </div>
  );
}
