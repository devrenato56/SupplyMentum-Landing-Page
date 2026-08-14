import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  turbopack: {
    root: __dirname,
    resolveAlias: {
      "@docs": path.join(__dirname, "../docs"),
    },
  },
};

export default nextConfig;
