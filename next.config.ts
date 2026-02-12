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
        hostname: '**',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: `**.${process.env.SITE_NAME || process.env.NEXT_PUBLIC_SITE_NAME}`,
        pathname: '/**',
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/",
        has: [{ type: "query", key: "op", value: "311" }],
        destination: "/about/politika-v-oblasti-kacestva",
        permanent: true,
      },
      {
        source: "/",
        has: [{ type: "query", key: "op", value: "312" }],
        destination: "/about/politika-v-oblasti-kacestva",
        permanent: true,
      },
      {
        source: "/",
        has: [{ type: "query", key: "op", value: "30" }],
        destination: "/about/istoriia-zavoda",
        permanent: true,
      },
      {
        source: "/",
        has: [{ type: "query", key: "op", value: "2" }],
        destination: "/products",
        permanent: true,
      },
      {
        source: "/",
        has: [{ type: "query", key: "op", value: "10" }],
        destination: "/products",
        permanent: true,
      },
      {
        source: "/",
        has: [{ type: "query", key: "op", value: "20" }],
        destination: "/products",
        permanent: true,
      },
      {
        source: "/",
        has: [{ type: "query", key: "op", value: "50" }],
        destination: "/about/vystavki",
        permanent: true,
      },
      {
        source: "/",
        has: [{ type: "query", key: "op", value: "40" }],
        destination: "/about/razrabotki",
        permanent: true,
      },
      {
        source: "/",
        has: [
          { type: "query", key: "op", value: "60" },
          { type: "query", key: "pg", value: "0" }
        ],
        destination: "/",
        permanent: true,
      },
      {
        source: "/",
        has: [{ type: "query", key: "op", value: "61-2" }],
        destination: "/services",
        permanent: true,
      },
      {
        source: "/",
        has: [{ type: "query", key: "op", value: "6" }],
        destination: "/contacts",
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return [
      { source: "/robots.txt", destination: "/api/robots" },
      { source: "/sitemap.xml", destination: "/api/sitemap.xml" },
      { source: "/feed.xml", destination: "/api/feed" },
    ];
  },
};

export default nextConfig;
