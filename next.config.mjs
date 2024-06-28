// @ts-check
import withPlaiceholder from "@plaiceholder/next";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "utfs.io" }],
  },
  env: {
    NEXT_PUBLIC_APP_URL:
      process.env.NODE_ENV !== "production"
        ? "http://localhost:3000"
        : "https://edu-mentor-lms.vercel.app",
  },
};

export default withPlaiceholder(nextConfig);
