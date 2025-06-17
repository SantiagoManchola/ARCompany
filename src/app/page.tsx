import SliderSection from '@/components/sections/SliderSection';
import InfoSection from '@/components/sections/InfoSection';
import NewsSection from '@/components/sections/NewsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import { servicesData } from '@/data/services';

export default function Home() {
  return (
    <div>
      <SliderSection />
      <InfoSection />
      <ServicesSection services={servicesData} />
      <NewsSection />
    </div>
  );
}