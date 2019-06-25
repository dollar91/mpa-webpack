const merge = require("webpack-merge");
const path = require("path");
const baseConfig = require("./webpack.config.base");
module.exports = merge(baseConfig, {
    output: {
		filename: "js/[name].[hash:5].js",
		publicPath: '/',
		path: path.join(__dirname, '../dist')
	}
});