import { Metadata } from "next";
import { realStateProperties } from "@/data/realState";

interface LayoutProps {
  children: React.ReactNode;
  params: { slug: string };
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const property = realStateProperties.find((p) => p.slug === params.slug);

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

export async function generateStaticParams() {
  return realStateProperties.map((property) => ({
    slug: property.slug,
  }));
}

export default function PropertyLayout({ children }: LayoutProps) {
  return children;
}