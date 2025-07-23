import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost", "ar-cms-cs94.onrender.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ar-cms-cs94.onrender.com",
        port: "",
        pathname: "/api/media/file/**",
      },
    ],
  },
};

export default nextConfig;
