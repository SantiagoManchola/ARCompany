import AboutBanner from '@/components/sections/AboutBanner';
import MissionSection from '@/components/sections/MissionSection';
import VisionSection from '@/components/sections/VisionSection';

export default function About() {
  return (
    <div>
      <AboutBanner />
      <MissionSection />
      <VisionSection />
    </div>
  );
}