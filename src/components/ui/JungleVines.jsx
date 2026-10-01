import Image from 'next/image';

/**
 * JungleVines — decorative left/right leaf curtains for inner sections.
 *
 * Drop inside any Section that has `className="relative overflow-hidden"`.
 * Hidden on mobile (too narrow), shown md+.
 * pointer-events-none so it never blocks interaction.
 */
export default function JungleVines({ opacity = 0.15 }) {
  return (
    <div
      aria-hidden="true"
      className="hidden md:block absolute inset-0 pointer-events-none select-none overflow-hidden"
    >
      {/* Left curtain */}
      <div className="absolute top-0 left-0 w-44 lg:w-56" style={{ opacity }}>
        <Image
          src="/illustrations/hero-leaf-curtain-left.png"
          alt=""
          width={1800}
          height={1800}
          className="w-full h-auto"
          aria-hidden="true"
        />
      </div>

      {/* Right curtain */}
      <div className="absolute top-0 right-0 w-44 lg:w-56" style={{ opacity }}>
        <Image
          src="/illustrations/hero-leaf-curtain-right.png"
          alt=""
          width={1800}
          height={1800}
          className="w-full h-auto"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
