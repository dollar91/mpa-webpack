const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob');
const config = require("./config");
const argv = require('yargs-parser')(process.argv.slice(2))
const mode = argv.mode || "development";
const isProduction = (mode === "production");


let Entries = {};
let HTMLPlugins = [];

function getEntries(){
	let paths = glob.sync('./src/pages/**/index.js');
	for(let i = 0, l = paths.length; i < l; i++){
		let pathName = path.dirname(paths[i]).replace(new RegExp('^\.\/src\/pages\/'), '');
		Entries[pathName] = paths[i];
		let htmlPlugin = new HTMLWebpackPlugin({
				filename: `html/${pathName}/index.html`,
				template: path.resolve(__dirname, `../src/pages/${pathName}/index.html`),
				chunks: [pathName],
		});
		HTMLPlugins.push(htmlPlugin);
	}
}
getEntries();

module.exports = {
	entry: Entries,
	module: {
		rules: [{
			test: /\.less$/,
			use: [{
					loader: MiniCssExtractPlugin.loader,
				},
				{
					loader: 'css-loader',
					options: {
						sourceMap: true
					}
				},
				{
					loader:"postcss-loader",
				},
				{
					loader: 'less-loader'
				}
			]
		}, {
			test: /\.css$/,
			use: [{
				loader: MiniCssExtractPlugin.loader,
			}, {
				loader: 'css-loader',
				options: {
					sourceMap: true
				}
			}, {
				loader:"postcss-loader",
			}]
		}, {
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['env']
				}
			}
		}, {
			test: /\.(png|svg|jpg|gif)$/,
			use: {
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					output: config.imgOutputPath
				}
			}
		}]
	},
	plugins:[
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: isProduction ? 'styles/[name].[hash:5].css' : 'styles/[name].css',
			chunkFilename: isProduction ? 'styles/[id].[hash:5].css' : 'styles/[id].css',
		}),
		...HTMLPlugins
	]
};