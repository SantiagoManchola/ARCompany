import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ar-cms-cs94.onrender.com",
        port: "",
        pathname: "/api/media/file/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "*",
        pathname: "**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|gif|webp|avif)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:all*(js|css)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  // Stabilize dev file watching on Windows/OneDrive environments
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        // Poll for changes to avoid missed FS events in synced folders
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ["**/.next/**"],
      };
    }
    return config;
  },
};

export default nextConfig;
