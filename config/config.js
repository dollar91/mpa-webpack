module.exports = {
    dev: {
        port: 8888,
        autoOpenBrowser: true,
        errorOverlay: true, // 编译错误的时候，在浏览器显示mask
        assetsPublicPath: '/',
    },
    prod: {
        assetsPublicPath: '/'
    },
    imgOutputPath: 'img/'
};