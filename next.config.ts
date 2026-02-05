import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */ images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.graphassets.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
     ]
    },

};

export default nextConfig;
