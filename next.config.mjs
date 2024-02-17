/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // transpilePackages: ['@ffprobe-installer/ffprobe', 'ffprobe-static'],
  // transpilePackages: ["sharp", "commonjs sharp"],
  webpack: (config, { isServer }) => {
    // if (!isServer) {
    //   config.node = {
    //     fs: "empty",
    //     child_process: "empty",
    //     net: "empty",
    //     dns: "empty",
    //     tls: "empty",
    //   };
    // }

    return config;
  },
};

export default nextConfig;
