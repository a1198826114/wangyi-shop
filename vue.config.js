module.exports = {
  //配置了这个小程序不能够正常请求 因为小程序和服务器不出存在跨域问题  只有浏览器和服务器才存在跨域问题
  devServer: {
    proxy: {
      "/api": {
        target: "https://music.163.com",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
      "/serve": {
        target: "http://localhost:4399",
        changeOrigin: true,
        pathRewrite: {
          "^/serve": "",
        },
      },
    },
  },
}
