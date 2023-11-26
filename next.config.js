/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["utfs.io"],
    },
    env: {
        NEXT_PUBLIC_APP_URL:
            process.env.NODE_ENV !== "production"
                ? "http://localhost:3000"
                : "https://edu-mentor-lms.vercel.app",
    },
};

module.exports = nextConfig;
