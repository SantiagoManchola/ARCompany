import { Metadata } from "next";
import { apiService, toRealStateProperty } from "@/services/api";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

// Hacer el segmento completamente dinámico y sin caché
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const api = await apiService.getPropiedadBySlug(slug).catch(() => null);
  const property = api ? toRealStateProperty(api) : null;

  if (!property) {
    return {
      title: "Propiedad no encontrada | AR Company",
    };
  }

  return {
    title: `${property.titulo} - ${property.operacion} | AR Company`,
    description: property.descripcion,
    openGraph: {
      title: property.titulo,
      description: property.descripcion,
      images: property.imagenes.map((img) => ({
        url: img.url,
        alt: img.alt,
      })),
    },
  };
}

// Importante: no declaramos generateStaticParams para permitir que cualquier
// slug nuevo del CMS funcione inmediatamente en navegación de cliente.

export default function PropertyLayout({ children }: LayoutProps) {
  return children;
}
