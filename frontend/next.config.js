/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Remove appDir: true - it's no longer needed
    serverComponentsExternalPackages: ["mongoose"], // Keep other experimental features
  },
  // Your other config options...
};

module.exports = nextConfig;
