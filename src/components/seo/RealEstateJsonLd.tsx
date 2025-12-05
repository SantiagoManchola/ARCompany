import Script from "next/script";

type Address = {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
};

type Props = {
  name: string;
  description: string;
  url: string;
  image: string;
  address: Address;
  price: number;
  currency: string;
};

export default function RealEstateJsonLd(props: Props) {
  const json = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: props.name,
    description: props.description,
    url: props.url,
    image: props.image,
    address: {
      "@type": "PostalAddress",
      ...props.address,
    },
    offers: {
      "@type": "Offer",
      price: props.price,
      priceCurrency: props.currency,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <Script
      id="realestate-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
