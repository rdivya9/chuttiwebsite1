import { Users, GraduationCap, MessageSquare, Wind, Smile, Star } from 'lucide-react';
import Section from '@/components/ui/Section';
import siteConfig from '@/data/siteConfig';

const facts = [
  {
    icon:  Users,
    title: 'Only children, 0 to 18.',
    body:  'Everything here is designed for children. The clinic does not treat adults.',
  },
  {
    icon:  GraduationCap,
    title: 'A pediatric specialist.',
    body:  `Dr. Bhuvanesswari holds an MDS in Pediatric & Preventive Dentistry — three extra years of specialist training in children's teeth, growth and behaviour.`,
  },
  {
    icon:  MessageSquare,
    title: 'Every step explained.',
    body:  'To you and to your child, before anything is done. The theme parents mention most in every review.',
  },
  {
    icon:  Wind,
    title: 'Laughing gas, in-house.',
    body:  'For children who need extra help staying calm, after a clinical assessment. The equipment is here; no referral needed.',
  },
  {
    icon:  Smile,
    title: 'Aligners, planned around how your child is growing.',
    body:  'Clear aligners for children of any age who clinically need them — available here, planned by someone who has watched their teeth develop.',
  },
  {
    icon:  Star,
    title: `${siteConfig.rating.value}★ from ${siteConfig.rating.count} Google reviews.`,
    body:  `${siteConfig.hours.display}. By appointment.`,
  },
];

export default function WhyParents() {
  return (
    <Section bg="morning-white" id="why-parents">
      {/* TODO Phase 5: divider-grass-top illustration above this section */}
      <div className="space-y-10">
        <h2 className="font-display font-bold text-h2-mobile md:text-h2-desktop text-brand-navy">
          Why parents choose Chutti's
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facts.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="flex gap-4 p-5 rounded-card bg-morning-white border border-brand-navy/8 hover:border-brand-pink/20 transition-colors"
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-leaf-mint shrink-0 mt-0.5">
                <Icon size={18} className="text-brand-navy" aria-hidden="true" />
              </span>
              <div>
                <p className="font-display font-semibold text-[17px] text-brand-navy leading-snug mb-1">
                  {title}
                </p>
                <p className="font-body text-[14px] text-brand-navy/70 leading-relaxed">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
