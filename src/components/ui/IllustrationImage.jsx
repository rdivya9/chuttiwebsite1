'use client';

import Image from 'next/image';
import illustrations from '@/data/illustrations';

/**
 * IllustrationImage — wrapper for all illustration assets.
 *
 * Rules (build-spec A3):
 * - Never CSS background-image for illustrations.
 * - Always explicit width + height (prevents CLS).
 * - Meaningful alt for characters; alt="" + aria-hidden for pure decoration.
 * - Shows a clearly labelled placeholder when the file isn't ready yet.
 */
export default function IllustrationImage({
  name,           // key in illustrations.js
  alt,            // override alt text (optional; falls back to illustrations.js value)
  className = "",
  priority = false,
  sizes,
  style,
  ...props
}) {
  const meta = illustrations[name];

  if (!meta) {
    return (
      <div
        className={`bg-leaf-mint border-2 border-dashed border-brand-green flex items-center justify-center rounded-card text-brand-navy text-meta font-body ${className}`}
        style={{ minWidth: 80, minHeight: 80, ...style }}
        aria-hidden="true"
        {...props}
      >
        <span className="p-2 text-center opacity-60">
          [{name}]<br />illustration pending
        </span>
      </div>
    );
  }

  const resolvedAlt = alt !== undefined ? alt : (meta.alt || '');
  const isDecorative = resolvedAlt === '';

  if (meta.status === 'placeholder') {
    return (
      <div
        className={`bg-leaf-mint border-2 border-dashed border-brand-green flex items-center justify-center rounded-card text-brand-navy text-meta font-body ${className}`}
        style={{ aspectRatio: `${meta.width} / ${meta.height}`, ...style }}
        aria-hidden={isDecorative ? 'true' : undefined}
        role={isDecorative ? 'presentation' : undefined}
        {...props}
      >
        <span className="p-2 text-center opacity-60 text-xs">
          <strong>{name}.png</strong><br />
          {meta.width} × {meta.height}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={meta.path}
      alt={resolvedAlt}
      width={meta.width}
      height={meta.height}
      className={className}
      priority={priority}
      sizes={sizes}
      style={style}
      aria-hidden={isDecorative ? true : undefined}
      {...props}
    />
  );
}
