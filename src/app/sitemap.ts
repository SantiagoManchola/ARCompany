import { MetadataRoute } from "next";
// apiService avoided here to use ISR-friendly fetch
import { API_CONFIG } from "@/config/api";

// Permitir que el sitemap se genere en build usando caché de ISR
export const revalidate = 3600; // 1 hora

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rawBaseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.arcompanyjuridicos.com";
  // Normalizar para evitar dobles barras
  const baseUrl = rawBaseUrl.replace(/\/+$/, "");

  // URLs estáticas
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/bienes-raices`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ];

  // URLs dinámicas de servicios
  let serviceUrls: MetadataRoute.Sitemap = [];
  // URLs dinámicas de noticias
  let newsUrls: MetadataRoute.Sitemap = [];
  // URLs dinámicas de propiedades
  let propertyUrls: MetadataRoute.Sitemap = [];

  try {
    const serviciosResp = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SERVICIOS}?sort=-_order&limit=100`,
      { next: { revalidate } }
    );
    if (!serviciosResp.ok) throw new Error(`Servicios HTTP ${serviciosResp.status}`);
    const serviciosJson = await serviciosResp.json();
    const servicios: Array<{ slug: string; updatedAt?: string }> = Array.isArray(serviciosJson?.docs) ? serviciosJson.docs : [];
    const seen = new Set<string>();
    serviceUrls = servicios
      .filter((s) => typeof s.slug === "string" && s.slug.trim().length > 0)
      .map((servicio: { slug: string; updatedAt?: string }) => ({
        url: `${baseUrl}/services/${servicio.slug}`,
        lastModified: new Date(servicio.updatedAt ?? Date.now()),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }))
      .filter((u) => {
        if (seen.has(u.url)) return false;
        seen.add(u.url);
        return true;
      });
  } catch (error) {
    console.error("Error generating sitemap for services:", error);
  }

  try {
    const noticiasResp = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.NOTICIAS}?limit=100`,
      { next: { revalidate } }
    );
    if (!noticiasResp.ok) throw new Error(`Noticias HTTP ${noticiasResp.status}`);
    const noticiasJson = await noticiasResp.json();
    const noticias: Array<{ slug: string; updatedAt?: string; publishedAt?: string }> = Array.isArray(noticiasJson?.docs) ? noticiasJson.docs : [];
    const seen = new Set<string>();
    newsUrls = noticias
      .filter((n) => typeof n.slug === "string" && n.slug.trim().length > 0)
      .map((n: { slug: string; updatedAt?: string; publishedAt?: string }) => ({
        url: `${baseUrl}/news/${n.slug}`,
        lastModified: new Date(n.updatedAt ?? n.publishedAt ?? Date.now()),
        changeFrequency: "daily" as const,
        priority: 0.6,
      }))
      .filter((u) => {
        if (seen.has(u.url)) return false;
        seen.add(u.url);
        return true;
      });
  } catch (error) {
    console.error("Error generating sitemap for news:", error);
  }

  try {
    const propsResp = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PROPIEDADES}?depth=2&limit=100`,
      { next: { revalidate } }
    );
    if (!propsResp.ok) throw new Error(`Propiedades HTTP ${propsResp.status}`);
    const propsJson = await propsResp.json();
    const propiedades: Array<{ slug: string; updatedAt?: string; createdAt?: string }> = Array.isArray(propsJson?.docs) ? propsJson.docs : [];
    const seen = new Set<string>();
    propertyUrls = propiedades
      .filter((p) => typeof p.slug === "string" && p.slug.trim().length > 0)
      .map((p: { slug: string; updatedAt?: string; createdAt?: string }) => ({
        url: `${baseUrl}/bienes-raices/${p.slug}`,
        lastModified: new Date(p.updatedAt ?? p.createdAt ?? Date.now()),
        changeFrequency: "weekly" as const,
        priority: 0.65,
      }))
      .filter((u) => {
        if (seen.has(u.url)) return false;
        seen.add(u.url);
        return true;
      });
  } catch (error) {
    console.error("Error generating sitemap for properties:", error);
  }

  return [...staticUrls, ...serviceUrls, ...newsUrls, ...propertyUrls];
}
