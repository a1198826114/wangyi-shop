module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:6666',
        ws: true,
        changeOrigin: true,
		pathRewrite:{
			"^/api":""
		}
      }
    }
  }
}