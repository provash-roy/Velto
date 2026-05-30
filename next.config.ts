import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nl3u68tjc1.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
