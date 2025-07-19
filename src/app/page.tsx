"use client";

import SliderSection from "@/components/sections/SliderSection";
import InfoSection from "@/components/sections/InfoSection";
import NewsSection from "@/components/sections/NewsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import { useServicios } from "@/hooks/useServicios";

export default function Home() {
  const { servicesData, loading, error } = useServicios();

  return (
    <div>
      <SliderSection />
      <InfoSection />
      <ServicesSection
        services={servicesData}
        loading={loading}
        error={typeof error === "string" ? null : error}
      />
      <NewsSection />
    </div>
  );
}
