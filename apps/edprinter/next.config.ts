import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // reactStrictMode: true,
  output: "standalone",
  transpilePackages: ["@org/ui", "@org/tokens"],
};

export default nextConfig;
