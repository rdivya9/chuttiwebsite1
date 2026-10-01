'use client';

import JungleHero       from '@/components/hero/JungleHero';
import TrainJourney     from '@/components/journey/TrainJourney';
import WhyParents       from '@/components/sections/WhyParents';
import OurMotto         from '@/components/sections/OurMotto';
import PreventEarly     from '@/components/sections/PreventEarly';
import ComfortCare      from '@/components/sections/ComfortCare';
import StraighterSmiles from '@/components/sections/StraighterSmiles';
import MeetDoctor       from '@/components/sections/MeetDoctor';
import InsideClinic     from '@/components/sections/InsideClinic';
import ServicesOverview from '@/components/sections/ServicesOverview';
import EmergencyBand    from '@/components/sections/EmergencyBand';
import ParentReviews    from '@/components/sections/ParentReviews';
import FirstVisitSection from '@/components/sections/FirstVisitSection';
import ClosingDusk      from '@/components/sections/ClosingDusk';



// ── Homepage ──────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <div className="hidden md:block"><JungleHero /></div>
      <OurMotto />
      <TrainJourney />
      <WhyParents />
      <MeetDoctor />
      <ServicesOverview />
      <StraighterSmiles />
      <PreventEarly />
      <ComfortCare />
      <InsideClinic />
      <EmergencyBand />
      <ParentReviews />
      <FirstVisitSection />
      <ClosingDusk />
    </>
  );
}
