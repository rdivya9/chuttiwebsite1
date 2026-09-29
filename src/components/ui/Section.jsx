/**
 * Section — standard page section wrapper.
 *
 * Handles:
 * - Consistent vertical padding (72px mobile / 120px desktop)
 * - Background colour from design tokens
 * - Max-width content centering
 * - Optional id for anchor links
 */
export default function Section({
  children,
  id,
  bg = 'morning-white',   // Tailwind colour token key (without 'bg-' prefix)
  className = '',
  innerClassName = '',
  as: Tag = 'section',
}) {
  const bgMap = {
    'morning-white':  'bg-morning-white',
    'sky-mist':       'bg-sky-mist',
    'leaf-mint':      'bg-leaf-mint',
    'blush':          'bg-blush',
    'sun-yellow':     'bg-sun-yellow',
    'night-navy':     'bg-night-navy',
    'white':          'bg-white',
    'transparent':    'bg-transparent',
  };

  return (
    <Tag
      id={id}
      className={`w-full py-section-mobile md:py-section-desktop ${bgMap[bg] || ''} ${className}`}
    >
      <div className={`max-w-6xl mx-auto px-5 md:px-8 lg:px-10 ${innerClassName}`}>
        {children}
      </div>
    </Tag>
  );
}
