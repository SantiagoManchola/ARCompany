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

  const firstImg = property.imagenes?.[0];
  const toAbs = (u?: string) => {
    if (!u) return u;
    if (/^https?:\/\//i.test(u)) return u;
    const base = process.env.NEXT_PUBLIC_BASE_URL || '';
    const b = base.replace(/\/$/, '');
    const p = u.startsWith('/') ? u : `/${u}`;
    return `${b}${p}`;
  };

  return {
    title: `${property.titulo} - ${property.operacion} | AR Company`,
    description: property.descripcion,
    openGraph: {
      title: property.titulo,
      description: property.descripcion,
      images: firstImg
        ? [
            {
              url: toAbs(firstImg.url)!,
              alt: firstImg.alt,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: property.titulo,
      description: property.descripcion,
      images: firstImg ? [toAbs(firstImg.url)!] : undefined,
    },
  };
}

// Importante: no declaramos generateStaticParams para permitir que cualquier
// slug nuevo del CMS funcione inmediatamente en navegación de cliente.

export default function PropertyLayout({ children }: LayoutProps) {
  return children;
}
