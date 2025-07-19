import { ServiceAPI } from "@/types/api";

interface ServiceJsonLdProps {
  servicio: ServiceAPI;
  baseUrl?: string;
}

export default function ServiceJsonLd({
  servicio,
  baseUrl = "https://arcompany-delta.vercel.app",
}: ServiceJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: servicio.nombre,
    description: servicio.descripcion,
    provider: {
      "@type": "Organization",
      name: "AR Company",
      url: baseUrl,
    },
    url: `${baseUrl}/services/${servicio.slug}`,
    image: servicio.imagen_banner.url,
    offers: {
      "@type": "Offer",
      description: servicio.descripcion_banner,
    },
    ...(servicio.areas_especializacion.length > 0 && {
      additionalType: servicio.areas_especializacion.map((area) => area.area),
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
