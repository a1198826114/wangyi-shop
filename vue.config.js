module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://music.163.com/store/api',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    },
    overlay: {
      warnings: true,
      errors: true
    }
  
  }
}