import AboutBanner from '@/components/sections/AboutBanner';
import MissionSection from '@/components/sections/MissionSection';
import ValuesSection from '@/components/sections/ValuesSection';
import VisionSection from '@/components/sections/VisionSection';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros | AR Company",
  description:
    "Conozca la misión, visión y valores de AR Company, firma legal especializada en servicios jurídicos integrales.",
  openGraph: {
    title: "Nosotros | AR Company",
    description:
      "Misión, visión y valores de nuestra firma legal",
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
    title: "Nosotros | AR Company",
    description:
      "Conozca la misión, visión y valores de nuestra firma",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "/about",
  },
};

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