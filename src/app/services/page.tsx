import ServicesBanner from "@/components/sections/ServicesBanner";
import ServicesPage from "@/components/sections/ServicesPage";
import { Metadata } from "next";

// Metadata estático para la página de servicios
export const metadata: Metadata = {
  title: "Servicios Jurídicos | AR Company",
  description:
    "Ofrecemos servicios jurídicos especializados en asesoría legal, propiedad horizontal, revisoría fiscal y más. Protegemos sus intereses con experiencia y profesionalismo.",
  openGraph: {
    title: "Servicios Jurídicos | AR Company",
    description:
      "Servicios jurídicos especializados para proteger sus intereses",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AR Company - Open Graph",
      },
    ],
    type: "website",
    siteName: "AR Company",
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicios Jurídicos | AR Company",
    description:
      "Servicios jurídicos especializados para proteger sus intereses",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "/services",
  },
};

export default async function Services() {
  // Los servicios se cargan directamente en el componente ServicesPage para mantener la funcionalidad actual
  return (
    <div>
      <ServicesBanner />
      <ServicesPage />
    </div>
  );
}
