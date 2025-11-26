import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
// Allow API routes in development (needed for OpenAI chat)
// For production with API routes, deploy to Vercel/Netlify instead of static export
const useStaticExport = process.env.USE_STATIC_EXPORT === 'true';

const nextConfig: NextConfig = {
  // Only use static export if explicitly enabled (for GitHub Pages)
  // Otherwise, use default Next.js behavior to support API routes
  ...(useStaticExport ? { output: 'export' } : {}),
  images: {
    unoptimized: true,
  },
  // Only apply basePath and assetPrefix in production for GitHub Pages
  basePath: isProd && useStaticExport ? '/real' : undefined,
  assetPrefix: isProd && useStaticExport ? '/real' : undefined,
};

export default nextConfig;
