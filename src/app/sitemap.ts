import { MetadataRoute } from "next";
import { apiService } from "@/services/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://arcompany-delta.vercel.app/";

  // URLs estáticas
  const staticUrls = [
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

  try {
    const servicios = await apiService.getServicios();
    serviceUrls = servicios.map((servicio) => ({
      url: `${baseUrl}/services/${servicio.slug}`,
      lastModified: new Date(servicio.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Error generating sitemap for services:", error);
  }

  return [...staticUrls, ...serviceUrls];
}
