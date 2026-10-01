import { Users, GraduationCap, MessageSquare, Wind, Smile, Star } from 'lucide-react';
import Section from '@/components/ui/Section';
import siteConfig from '@/data/siteConfig';

const facts = [
  {
    icon:       Users,
    title:      'Only children, 0 to 18.',
    body:       'Everything here is designed for children. The clinic does not treat adults.',
    cardBg:     'bg-blush',
    iconBg:     'bg-brand-pink/20',
    iconColor:  'text-brand-pink',
    titleColor: 'text-brand-navy',
    bodyColor:  'text-brand-navy/70',
  },
  {
    icon:       GraduationCap,
    title:      'A pediatric specialist.',
    body:       `Dr. Bhuvanesswari holds an MDS in Pediatric & Preventive Dentistry — three extra years of specialist training in children's teeth, growth and behaviour.`,
    cardBg:     'bg-leaf-mint',
    iconBg:     'bg-brand-green/25',
    iconColor:  'text-brand-green',
    titleColor: 'text-brand-navy',
    bodyColor:  'text-brand-navy/70',
  },
  {
    icon:       MessageSquare,
    title:      'Every step explained.',
    body:       'To you and to your child, before anything is done. The theme parents mention most in every review.',
    cardBg:     'bg-sky-mist',
    iconBg:     'bg-brand-navy/10',
    iconColor:  'text-brand-navy',
    titleColor: 'text-brand-navy',
    bodyColor:  'text-brand-navy/70',
  },
  {
    icon:       Wind,
    title:      'Laughing gas, in-house.',
    body:       'For children who need extra help staying calm, after a clinical assessment. The equipment is here; no referral needed.',
    cardBg:     'bg-sun-yellow/40',
    iconBg:     'bg-brand-navy/10',
    iconColor:  'text-brand-navy',
    titleColor: 'text-brand-navy',
    bodyColor:  'text-brand-navy/70',
  },
  {
    icon:       Smile,
    title:      'Aligners, planned around how your child is growing.',
    body:       'Clear aligners for children of any age who clinically need them — available here, planned by someone who has watched their teeth develop.',
    cardBg:     'bg-blush',
    iconBg:     'bg-brand-pink/20',
    iconColor:  'text-brand-pink',
    titleColor: 'text-brand-navy',
    bodyColor:  'text-brand-navy/70',
  },
  {
    icon:       Star,
    title:      `${siteConfig.rating.value}★ from ${siteConfig.rating.count} Google reviews.`,
    body:       `${siteConfig.hours.display}. By appointment.`,
    cardBg:     'bg-sun-yellow/40',
    iconBg:     'bg-brand-navy/10',
    iconColor:  'text-brand-navy',
    titleColor: 'text-brand-navy',
    bodyColor:  'text-brand-navy/70',
  },
];

export default function WhyParents() {
  return (
    <Section bg="morning-white" id="why-parents">
      <div className="space-y-10">
        <h2 className="font-display font-bold text-h2-mobile md:text-h2-desktop text-brand-navy">
          Why parents choose{' '}
          <span className="text-brand-pink">Chutti's</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {facts.map(({ icon: Icon, title, body, cardBg, iconBg, iconColor, titleColor, bodyColor }) => (
            <div
              key={title}
              className={`flex gap-4 p-6 rounded-card shadow-card ${cardBg}`}
            >
              <span className={`flex items-center justify-center w-11 h-11 rounded-full ${iconBg} shrink-0 mt-0.5`}>
                <Icon size={19} className={iconColor} aria-hidden="true" />
              </span>
              <div>
                <p className={`font-display font-semibold text-[17px] ${titleColor} leading-snug mb-1`}>
                  {title}
                </p>
                <p className={`font-body text-[14px] ${bodyColor} leading-relaxed`}>
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
