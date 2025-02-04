/** @type {import('next').NextConfig} */

const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	transpilePackages: ["ahooks"],
	output: "export", //process.env.NEXT_PUBLIC_OUTPUT,
	distDir: process.env.NEXT_PUBLIC_OUT,
	images: {
		loader: "custom",
		loaderFile: "../../src/shared/utils/imageLoader", // TODO: Resolve absolute path
	},
	reactStrictMode: true,
	webpack: (config) => {
		config.module.rules.push({
			test: /\.(graphql|gql)$/,
			exclude: /node_modules/,
			use: [
				{
					loader: "graphql-tag/loader",
				},
			],
		});

		config.optimization.splitChunks.maxInitialRequests = 30;

		return config;
	},
	experimental: {
		largePageDataBytes: 128 * 100000,
	},
	compiler: {
		...(process.env.NODE_ENV === "production"
			? {
					removeConsole: {
						exclude: ["error, info"],
					},
			  }
			: {}),
	},
	// sentry: {
	// 	hideSourceMaps: process.env.NODE_ENV === "production",
	// },
	// modularizeImports: {
	//     ahooks: {
	//         transform: "ahooks/{{member}}",
	//     },
	// },
};

module.exports = nextConfig;
