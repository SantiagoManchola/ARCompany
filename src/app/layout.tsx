import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ReactNode } from "react";

export const metadata = {
  title: "AR Company",
  description: "Firma legal especializada en servicios jurídicos integrales",

  // SEO
  keywords: [
    "abogados",
    "firma legal",
    "servicios jurídicos",
    "AR Company",
    "consultoría legal",
    "asesoría jurídica",
  ],
  authors: [
    {
      name: "AR Company",
      url: "https://arcompany-git-dev-santiago-mancholas-projects.vercel.app/",
    },
  ], // CAMBIA por el dominio real
  generator: "Next.js",
  applicationName: "AR Company",
  referrer: "origin-when-cross-origin",
  creator: "AR Company",

  // Robots
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

  // Open Graph
  openGraph: {
    title: "AR Company",
    description: "Firma legal especializada en servicios jurídicos integrales",
    url: "https://arcompany-git-dev-santiago-mancholas-projects.vercel.app/", // CAMBIA por el dominio real
    siteName: "AR Company",
    images: [
      {
        url: "https://arcompany-git-dev-santiago-mancholas-projects.vercel.app/og-image.png", // CAMBIA por una imagen real
        width: 1200,
        height: 630,
        alt: "Logo de AR Company",
      },
    ],
    locale: "es_CO",
    type: "website",
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "AR Company",
    description: "Firma legal especializada en servicios jurídicos integrales",
    site: "@arcompany", // CAMBIA si tienes cuenta
    creator: "@arcompany", // CAMBIA si tienes cuenta
    images: [
      "https://arcompany-git-dev-santiago-mancholas-projects.vercel.app/og-image.png",
    ], // misma imagen que Open Graph
  },

  // Iconos
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },

  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-white">
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}