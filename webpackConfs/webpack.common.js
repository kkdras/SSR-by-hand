const webpack = require('webpack');
const { resolve } = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const createConfig = () => {
	const BUILD_TARGET = process.env.BUILD_TARGET;
	const BUILD_TYPE = process.env.BUILD_TYPE;
	const PATH_SRC = resolve(__dirname, "../");
	const PATH_DIST = resolve(PATH_SRC, "dist", BUILD_TARGET);
	const IS_SERVER = BUILD_TARGET === "server";
	const IS_DEV = BUILD_TYPE === "dev";

	return {
		name: IS_SERVER ? "server" : "client",
		entry: resolve(PATH_SRC, "src", BUILD_TARGET),
		target: IS_SERVER ? "node" : "web",
		mode: IS_DEV ? "development" : "production",
		output: {
			path: PATH_DIST,
			filename: IS_DEV ? '[name].js' : '[name].[hash].js'
		},
		resolve: {
			modules: [
				"node_modules",
				"src"
			],
			extensions: [".tsx", ".ts", ".js", '.jsx', ".scss", '.json']
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					exclude: /node_modules/,
					use: "ts-loader"
				},
				{
					test: /\.(scss|css)$/i,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								modules: {
									mode: 'local',
									localIdentName: '[name]__[local]__[hash:base64:5]',
									auto: /\.module\.\w+$/i,
								},
							},
						},
						'sass-loader'
					],
				},
				{
					test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.pdf$/],
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]',
								outputPath: 'assets/',
							},
						}
					],
				},
			]
		},
		plugins: [
			new CleanWebpackPlugin(),
			new MiniCssExtractPlugin({
				filename: 'build/styles.css'
			}),
		]
	}
}

module.exports = {
	createConfig,
};