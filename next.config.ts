import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Place it at the root, not inside experimental!
  allowedDevOrigins: ["likely-optimum-tahr.ngrok-free.app"],
  experimental: {
    // other experimental flags go here (if any)
  },
};

export default nextConfig;
