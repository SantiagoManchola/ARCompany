import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
