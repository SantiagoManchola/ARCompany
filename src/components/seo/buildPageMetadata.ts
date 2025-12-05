import type { Metadata } from "next";

export type BuildMetaProps = {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
};

export function buildPageMetadata({ title, description, canonical, ogImage }: BuildMetaProps): Metadata {
  return {
    title,
    description,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title,
      description,
      url: canonical,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}
