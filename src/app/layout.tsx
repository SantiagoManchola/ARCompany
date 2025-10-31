import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ReactNode } from "react";
import AOSInit from "@/components/AOSInit";
import OrganizationJsonLd from "@/components/seo/OrganizationJsonLd";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  // Permite que Next.js resuelva URLs relativas en OpenGraph/Twitter/links
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  title: "AR Company | Firma Legal Especializada",
  description:
    "Firma legal especializada en servicios jurídicos integrales, asesoría legal, propiedad horizontal y revisoría fiscal. Protegemos sus intereses con experiencia y profesionalismo.",
  keywords: [
    "abogados",
    "firma legal",
    "servicios jurídicos",
    "AR Company",
    "consultoría legal",
    "asesoría jurídica",
    "propiedad horizontal",
    "revisoría fiscal",
  ],
  authors: [
    {
      name: "AR Company",
      url: "https://arcompany-delta.vercel.app/",
    },
  ],
  generator: "Next.js",
  applicationName: "AR Company",
  referrer: "origin-when-cross-origin",
  creator: "AR Company",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  openGraph: {
    title: "AR Company | Firma Legal Especializada",
    description: "Firma legal especializada en servicios jurídicos integrales",
    url: "/",
    siteName: "AR Company",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Logo de AR Company",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AR Company | Firma Legal Especializada",
    description: "Firma legal especializada en servicios jurídicos integrales",
    site: "@arcompany",
    creator: "@arcompany",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-white">
        <OrganizationJsonLd baseUrl={process.env.NEXT_PUBLIC_BASE_URL} />
        <AOSInit />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
