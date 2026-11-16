import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: ["three"],
  turbopack: {
    // Point Turbopack at this workspace root to avoid multi-lockfile warning
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      {
        source: "/resume",
        destination: "https://drive.google.com/file/d/1RjfcoUkrxRKtQ3e1ZjiOpbWoCFnbIna7/view?usp=sharing",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
