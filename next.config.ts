import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Only apply basePath and assetPrefix in production for GitHub Pages
  basePath: isProd ? '/real' : undefined,
  assetPrefix: isProd ? '/real' : undefined,
};

export default nextConfig;
