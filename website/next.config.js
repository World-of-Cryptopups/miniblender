/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['ipfs.atomichub.io', 'gateway.pinata.cloud', 'atomichub-ipfs.com']
  }
};

module.exports = nextConfig;
