import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: ["three"],
  turbopack: {
    // Point Turbopack at this workspace root to avoid multi-lockfile warning
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
