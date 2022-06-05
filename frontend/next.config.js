/** @type {import('next').NextConfig} */
let nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (process.env.TYPE_CHECK === "true") {
      if (isServer) {
        const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
        config.plugins.push(new ForkTsCheckerWebpackPlugin());
      }
    }
    return config;
  },
  images: {
    domains: ["drive.google.com"],
  },
  experimental: {
    modularizeImports: {
      "@mui/material": {
        transform: "@mui/material/{{member}}",
      },
      "@mui/icons-material": {
        transform: "@mui/icons-material/{{member}}",
      },
    },
  },
};

if (process.env.ANALYZE === "true") {
  const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: true,
  });
  nextConfig = withBundleAnalyzer(nextConfig);
}

module.exports = nextConfig;
