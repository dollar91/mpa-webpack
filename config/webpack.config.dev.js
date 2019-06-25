const merge = require("webpack-merge");
const path = require("path");
const baseConfig = require("./webpack.config.base");
module.exports = merge(baseConfig, {
    output: {
		filename: "js/[name].js",
		publicPath: '/',
		path: path.join(__dirname, '../dist')
    },
    devServer: {
        port: 8888,
        contentBase: './dist',
        openPage: "html/home/index.html"
    }
});