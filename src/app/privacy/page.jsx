import Breadcrumbs from '@/components/layout/Breadcrumbs';
import Section from '@/components/ui/Section';
import siteConfig from '@/data/siteConfig';

export const metadata = {
  title: 'Privacy Policy',
  description: "Privacy Policy for Chutti's Dental & Wellness Center website. How we collect, use and protect your information.",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <>
      <div className="bg-sky-mist pt-20 md:pt-24 pb-8">
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />
          <h1 className="font-display font-bold text-h2-mobile md:text-h2-desktop text-brand-navy mt-2">
            Privacy Policy
          </h1>
          <p className="font-body text-[14px] text-brand-navy/50 mt-2">
            Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      <Section bg="morning-white">
        <div className="max-w-prose-dental space-y-8 font-body text-body-sm text-brand-navy/80 leading-relaxed">

          <div className="space-y-3">
            <h2 className="font-display font-semibold text-h3-mobile text-brand-navy">Who we are</h2>
            <p>
              {siteConfig.name}, {siteConfig.address.full}. This Privacy Policy explains how we
              collect and handle information submitted through the appointment booking form on this
              website.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display font-semibold text-h3-mobile text-brand-navy">What we collect</h2>
            <p>When you submit a booking request, we collect:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Parent or guardian name</li>
              <li>Mobile number</li>
              <li>Child's name (optional)</li>
              <li>Child's age group</li>
              <li>Reason for visit</li>
              <li>Preferred date and time</li>
              <li>Notes about your child (optional)</li>
              <li>The page URL you submitted from and the date and time of submission</li>
            </ul>
            <p>We do not collect payment information, health records or any data beyond what you enter.</p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display font-semibold text-h3-mobile text-brand-navy">How we use it</h2>
            <p>
              The information is used only to contact you to confirm and arrange your appointment.
              We do not use it for marketing, do not share it with third parties, and do not sell it.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display font-semibold text-h3-mobile text-brand-navy">Where it goes</h2>
            <p>Your booking request is sent to us through two channels:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>WhatsApp Business:</strong> a formatted message is sent to the clinic's
                WhatsApp number via the WhatsApp Business API.
              </li>
              <li>
                <strong>Google Sheets:</strong> a record is added to a private Google Sheet for
                backup and scheduling purposes.
              </li>
            </ul>
            <p>
              Data in both places is accessible only to the clinic team and is not retained beyond
              what is needed for your care.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display font-semibold text-h3-mobile text-brand-navy">Your rights (India DPDP Act)</h2>
            <p>
              Under the Digital Personal Data Protection Act, 2023 (India), you have the right to
              access, correct or request deletion of your personal data. To do so, WhatsApp or call
              us at{' '}
              <a href={`tel:${siteConfig.phoneTel}`} className="text-brand-pink hover:underline">
                {siteConfig.phoneDisplay}
              </a>
              {' '}and we will respond within a reasonable time.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display font-semibold text-h3-mobile text-brand-navy">Cookies and analytics</h2>
            <p>
              This site may use Google Analytics (GA4) to understand how visitors use the website.
              No personal data from the booking form is shared with analytics tools. Analytics data
              is aggregated and anonymised.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display font-semibold text-h3-mobile text-brand-navy">Contact</h2>
            <p>
              Questions about this policy: WhatsApp or call{' '}
              <a href={`tel:${siteConfig.phoneTel}`} className="text-brand-pink hover:underline">
                {siteConfig.phoneDisplay}
              </a>
              .
            </p>
          </div>

        </div>
      </Section>
    </>
  );
}
