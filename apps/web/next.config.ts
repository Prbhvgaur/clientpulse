import path from "node:path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@clientpulse/db", "@clientpulse/ui", "@clientpulse/email"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
  turbopack: {
    root: path.resolve(__dirname, "../.."),
  },
};

export default nextConfig;
