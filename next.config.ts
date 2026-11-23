
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Turbo-Website",
  trailingSlash: true,

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Inventaire Auto HM
      {
        protocol: "https",
        hostname: "dealercdn.adws.ca",
      },
      {
        protocol: "https",
        hostname: "**.adws.ca",
      },
      {
        protocol: "https",
        hostname: "dealercdn.s3.ca-central-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
    ],
  },

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
