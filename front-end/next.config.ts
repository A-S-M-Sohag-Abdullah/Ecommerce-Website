import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "fakestoreapi.com",
      "localhost:5000",
      "lh3.googleusercontent.com",
    ],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
