import Script from "next/script";

export default function WebSiteJsonLd({ baseUrl }: { baseUrl?: string }) {
  const siteUrl = (baseUrl || "").replace(/\/+$/, "");
  if (!siteUrl) return null;
  const json = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
  return (
    <Script
      id="website-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
