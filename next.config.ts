import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		globalNotFound: true,
	},
	// reactStrictMode: false, // uncomment to check if form same data validation works properly
};

export default nextConfig;
