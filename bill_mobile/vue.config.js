module.exports = {
  lintOnSave: false, //禁用eslint
  devServer: {
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      // 网易严选代理配置
      '/ticai': {
        target: 'https://webapi.sporttery.cn/',
        pathRewrite: { '^/ticai': '' },
      }, // 前台购物车数据，登陆发送这个
      // '/api': {
      //   target: 'http://39.98.123.211', // pathRewrite: {"^/api" : ""}
      //   changeOrigin: true,
      // },
    },
  },
};
