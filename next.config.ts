import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for S3/CDN hosting
  output: "export",

  // Disable image optimization for static export (not supported)
  images: {
    unoptimized: true,
  },

  // Ensure trailing slashes for consistent static file serving
  trailingSlash: true,
};

export default nextConfig;
