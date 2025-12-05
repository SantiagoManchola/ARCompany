import ContactBanner from "@/components/sections/ContactBanner"
import ContactSection from "@/components/sections/ContactSection";
import MapSection from "@/components/sections/MapSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto | AR Company",
  description:
    "Contáctenos para asesoría legal especializada. Encuentre nuestros datos de contacto y ubicación.",
  openGraph: {
    title: "Contacto | AR Company",
    description:
      "Comuníquese con nuestra firma para asesoría jurídica",
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
    title: "Contacto | AR Company",
    description:
      "Comuníquese con AR Company para asesoría legal",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function Contact() {
  return (
  <div>
    <ContactBanner />
    <ContactSection />
    <MapSection />
  </div>
  );
}
