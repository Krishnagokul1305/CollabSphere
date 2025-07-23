/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.collude.cloud",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
