interface OrganizationJsonLdProps {
  baseUrl?: string;
}

export default function OrganizationJsonLd({
  baseUrl = "https://www.arcompanyjuridicos.com",
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
    telephone: "+57-302-4235453",
    email: "contacto@arcompanyjuridicos.com", 
    address: {
      "@type": "PostalAddress",
      streetAddress: "Carrera 4 No. 10-38 oficina 201 Edificio Vela", 
      addressLocality: "Ibagué",
      addressRegion: "Tolima",
      postalCode: "730001",
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
    foundingDate: "2025", // Reemplaza con tu fecha real
    sameAs: [
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
