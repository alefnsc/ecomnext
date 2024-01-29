/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["fakestoreapi.com", "miro.medium.com"],
  },
  webpack(config) {
    config.infrastructureLogging = { debug: /PackFileCache/ };
    return config;
  },
};

module.exports = nextConfig;
