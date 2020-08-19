module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "https://music.163.com/store",
        ws: true,
        changeOrigin: true,
      },
      "/request": {
        target: "https://music.163.com",
        changeOrigin: true,
        pathRewrite: {
          "^/request": "",
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
};
