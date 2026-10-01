import Image from 'next/image';
import Section from '@/components/ui/Section';
import siteConfig from '@/data/siteConfig';

/**
 * InsideClinic — photo mosaic + optional YouTube lite embed.
 *
 * Photos: 2 provided (clinic-exterior.webp, clinic-interior-1.webp).
 * Remaining slots are clearly labelled placeholders.
 *
 * Video slot: renders a lite embed (thumbnail + play button) that loads
 * the full iframe only on click. Uses the clinic tour video ID from siteConfig.
 *
 * No room-by-room captions (narrative.md §4 interiors rule).
 */

const photos = [
  {
    src:    '/photos/clinic-exterior.webp',
    alt:    "Chutti's Dental & Wellness Center — exterior",
    large:  true,
  },
  {
    src:    '/photos/clinic-interior-1.webp',
    alt:    "Inside Chutti's Dental & Wellness Center",
    large:  false,
  },
  // Placeholder for photo still needed from the clinic
  { src: null, alt: null, label: 'Reception photo — pending from clinic', large: false },
];

function VideoEmbed({ videoId, title }) {
  // Lite embed: show thumbnail with a play button; load iframe only on interaction
  return (
    <div className="relative rounded-card overflow-hidden aspect-video bg-brand-navy/10 group">
      <img
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt={`Play video: ${title}`}
        className="w-full h-full object-cover"
      />
      <a
        href={`https://www.youtube.com/watch?v=${videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Watch on YouTube: ${title}`}
        className="absolute inset-0 flex items-center justify-center bg-brand-navy/20 group-hover:bg-brand-navy/30 transition-colors"
      >
        <span className="flex items-center justify-center w-14 h-14 rounded-full bg-white/90 shadow-card group-hover:scale-105 transition-transform">
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-brand-pink ml-1" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </a>
    </div>
  );
}

export default function InsideClinic() {
  const clinicVideo   = siteConfig.videos.clinicTour;
  const doctorVideo   = siteConfig.videos.doctorIntro;

  return (
    <Section bg="sky-mist" id="inside-clinic" className="bg-sky-mist/60">
      <div className="space-y-8">
        <div className="space-y-3">
          <h2 className="font-display font-bold text-h2-mobile md:text-h2-desktop text-brand-navy">
            Inside the clinic
          </h2>
          <p className="font-body text-body-sm md:text-body-lg text-brand-navy/70 max-w-prose-dental">
            A clinic designed for children — bright, playful interiors that help kids feel at home
            from the moment they walk in. Show your child these photos before the visit.
          </p>
        </div>

        {/* Desktop: mosaic grid. Mobile: horizontal scroll row */}
        <div className="hidden md:grid md:grid-cols-3 gap-4">
          {photos.map((photo, i) =>
            photo.src ? (
              <div key={i} className={`rounded-card overflow-hidden ${photo.large ? 'md:col-span-2 md:row-span-2' : ''}`}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.large ? 800 : 400}
                  height={photo.large ? 600 : 300}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
            ) : (
              <div
                key={i}
                className="rounded-card bg-leaf-mint border-2 border-dashed border-brand-green/40 flex items-center justify-center aspect-video"
                aria-hidden="true"
              >
                <p className="font-body text-[12px] text-brand-navy/40 text-center px-3">
                  {photo.label}
                </p>
              </div>
            )
          )}
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory">
          {photos.map((photo, i) =>
            photo.src ? (
              <div key={i} className="shrink-0 w-72 rounded-card overflow-hidden snap-start">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
              </div>
            ) : (
              <div
                key={i}
                className="shrink-0 w-72 h-48 rounded-card bg-leaf-mint border-2 border-dashed border-brand-green/40 flex items-center justify-center snap-start"
                aria-hidden="true"
              >
                <p className="font-body text-[12px] text-brand-navy/40 text-center px-3">
                  {photo.label}
                </p>
              </div>
            )
          )}
        </div>

        {/* Video slots */}
        {siteConfig.features.clinicVideo && clinicVideo?.id && (
          <div className="mt-16 space-y-4">
            <h3 className="font-display font-semibold text-h3-mobile md:text-h3-desktop text-brand-navy">
              Hear the doctor speak
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <VideoEmbed videoId={clinicVideo.id} title={clinicVideo.title} />
              {doctorVideo?.id && (
                <VideoEmbed videoId={doctorVideo.id} title={doctorVideo.title} />
              )}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
