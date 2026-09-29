import Link from 'next/link';

/**
 * Button — base button / link component.
 *
 * Variants:
 *   primary  — brand-pink pill (Book a visit, primary CTAs)
 *   outline  — white pill with navy text (WhatsApp Us, secondary CTAs)
 *   navy     — navy pill (Call button in MobileCTA)
 *   ghost    — no background, underline on hover (text links)
 *
 * Renders <button> when onClick or type="submit" is given,
 * renders <a> (via next/link) when href is given.
 */
export default function Button({
  variant = 'primary',
  href,
  children,
  className = '',
  size = 'md',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-body font-semibold ' +
    'rounded-pill transition-all duration-150 focus-visible:outline-none ' +
    'focus-visible:ring-3 focus-visible:ring-brand-navy focus-visible:ring-offset-2 ' +
    'disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-btn',
    lg: 'px-8 py-4 text-btn-lg',
  };

  const variants = {
    primary:
      'bg-brand-pink text-white hover:bg-[#c41d63] active:bg-[#a8195a] shadow-sm',
    outline:
      'bg-white text-brand-navy border border-brand-navy/20 hover:bg-brand-navy/5 active:bg-brand-navy/10',
    navy:
      'bg-brand-navy text-white hover:bg-[#1e3a78] active:bg-[#0f2248]',
    ghost:
      'bg-transparent text-brand-navy underline underline-offset-2 hover:text-brand-pink px-0 py-0 rounded-none',
  };

  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
