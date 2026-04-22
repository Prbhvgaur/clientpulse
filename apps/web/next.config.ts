import path from "node:path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
  turbopack: {
    root: process.env.VERCEL ? __dirname : path.resolve(__dirname, "../.."),
  },
};

export default nextConfig;
