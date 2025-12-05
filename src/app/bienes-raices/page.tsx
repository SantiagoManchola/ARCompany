import RealStateBanner from "@/components/sections/RealStateBanner";
import RealStateSeccion from "@/components/sections/RealStateSeccion";
import type { Metadata } from "next";
import BreadcrumbsJsonLd from "@/components/seo/BreadcrumbsJsonLd";

export const metadata: Metadata = {
  title: "Propiedades en Colombia | AR Company",
  description:
    "Explora propiedades de bienes raíces en venta y arriendo en Colombia. Casas, apartamentos y locales con asesoría legal experta.",
  openGraph: {
    title: "Bienes Raíces | AR Company",
    description:
      "Propiedades en venta y arriendo con asesoría profesional",
    images: [
      { url: "/og-image.jpg", width: 1200, height: 630, alt: "AR Company - Open Graph" },
    ],
    type: "website",
    siteName: "AR Company",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bienes Raíces | AR Company",
    description:
      "Propiedades en venta y arriendo",
    images: ["/og-image.jpg"],
  },
  alternates: { canonical: "/bienes-raices" },
};

export default function BienesRaices() {
  return (
    <div>
      <BreadcrumbsJsonLd
        items={[
          { name: "Inicio", item: "/" },
          { name: "Bienes Raíces", item: "/bienes-raices" },
        ]}
      />
      <RealStateBanner />
      <RealStateSeccion />
    </div>
  );
}
