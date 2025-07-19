interface OrganizationJsonLdProps {
  baseUrl?: string;
}

export default function OrganizationJsonLd({
  baseUrl = "https://arcompany-delta.vercel.app",
}: OrganizationJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "AR Company",
    description:
      "Firma de abogados especializada en servicios jurídicos integrales, asesoría legal, propiedad horizontal y revisoría fiscal.",
    url: baseUrl,
    logo: `${baseUrl}/images/Logo AR COMPANY.png`,
    image: `${baseUrl}/images/Services.webp`,
    telephone: "+57-XXX-XXXXXXX", // Reemplaza con tu número real
    email: "info@arcompany.com", // Reemplaza con tu email real
    address: {
      "@type": "PostalAddress",
      streetAddress: "Tu dirección aquí", // Reemplaza con tu dirección real
      addressLocality: "Ciudad",
      addressRegion: "Región",
      postalCode: "Código Postal",
      addressCountry: "CO",
    },
    serviceArea: {
      "@type": "Country",
      name: "Colombia",
    },
    services: [
      "Asesoría Jurídica",
      "Propiedad Horizontal",
      "Revisoría Fiscal",
      "Servicios Legales Especializados",
    ],
    foundingDate: "2020", // Reemplaza con tu fecha real
    sameAs: [
      // Agrega aquí tus redes sociales
      // 'https://www.facebook.com/arcompany',
      // 'https://www.linkedin.com/company/arcompany',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
