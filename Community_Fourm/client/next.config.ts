import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**", // Allow all domains for testing
      },
    ],
  },
};

export default nextConfig;
