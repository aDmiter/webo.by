import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Beget Docker: нельзя плодить десятки worker-потоков при сборке
  experimental: {
    cpus: 1,
  },
  outputFileTracingIncludes: {
    "/*": ["./node_modules/.prisma/**/*", "./node_modules/@prisma/client/**/*"],
  },
};

export default nextConfig;
