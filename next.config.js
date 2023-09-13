/** @type {import('next').NextConfig} */
const nextConfig = {
 images: {
  remotePatterns: [
   {
    protocol: 'https',
    hostname: 'images.beta.cosmos.so',
    port: ''
   }
  ]
 }
};

module.exports = nextConfig;
