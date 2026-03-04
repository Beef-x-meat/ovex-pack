/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev }) => {
    if (dev) {
      // Disable filesystem cache in dev to avoid corrupted .next cache on this machine.
      config.cache = false;
    }
    return config;
  }
};

export default nextConfig;
