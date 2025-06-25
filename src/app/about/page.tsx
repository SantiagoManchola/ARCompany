import AboutBanner from '@/components/sections/AboutBanner';
import MissionSection from '@/components/sections/MissionSection';
import ValuesSection from '@/components/sections/ValuesSection';
import VisionSection from '@/components/sections/VisionSection';

export default function About() {
  return (
    <div>
      <AboutBanner />
      <MissionSection />
      <VisionSection />
      <ValuesSection />
    </div>
  );
}