import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      "@docs": path.join(__dirname, "../docs"),
    },
  },
};

export default nextConfig;
