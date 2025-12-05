"use client";

import SliderSection from "@/components/sections/SliderSection";
import InfoSection from "@/components/sections/InfoSection";
import NewsSection from "@/components/sections/NewsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import { useServicios } from "@/hooks/useServicios";
import { useNoticias } from "@/hooks/useNoticias"; 
import BreadcrumbsJsonLd from "@/components/seo/BreadcrumbsJsonLd";

export default function Home() {
  const { servicesData, loading: servicesLoading, error: servicesError } = useServicios();
  const { newsData, loading: newsLoading, error: newsError } = useNoticias(); 

  return (
    <div>
      <BreadcrumbsJsonLd
        items={[
          { name: "Inicio", item: "/" },
        ]}
      />
      <SliderSection />
      <InfoSection />
      <ServicesSection
        services={servicesData}
        loading={servicesLoading}
        error={typeof servicesError === "string" ? null : servicesError}
      />
      <NewsSection
        news={newsData}
        loading={newsLoading}
        error={typeof newsError === "string" ? null : newsError}
      />
    </div>
  );
}