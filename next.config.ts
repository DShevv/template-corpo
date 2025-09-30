import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
      {
        protocol: 'https',
        hostname: process.env.SITE_NAME || process.env.NEXT_PUBLIC_SITE_NAME || 'webspaceteam.site',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: `**.${process.env.SITE_NAME || process.env.NEXT_PUBLIC_SITE_NAME}`,
        pathname: '/**',
      },
    ],
  },

  async rewrites() {
    return [
      { source: "/robots.txt", destination: "/api/robots" },
      { source: "/sitemap.xml", destination: "/api/sitemap" },
      { source: "/feed.xml", destination: "/api/feed" },
    ];
  },
};

export default nextConfig;
