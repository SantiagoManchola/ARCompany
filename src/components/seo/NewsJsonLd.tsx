import { NewsAPI } from "@/types/api";

interface NewsJsonLdProps {
  noticia: NewsAPI;
  baseUrl?: string;
}

export default function NewsJsonLd({ noticia, baseUrl = "" }: NewsJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: noticia.title,
    description: noticia.description,
    image: [noticia.backgroundImage.url],
    datePublished: noticia.publishedAt,
    dateModified: noticia.updatedAt,
    author: {
      "@type": "Organization",
      name: "AR Company",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "AR Company",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`, // Ajusta según tu logo
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/news/${noticia.slug}`,
    },
    articleSection: "Legal News",
    inLanguage: "es-ES",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}