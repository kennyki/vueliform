module.exports = {
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false
    }
  },
  configureWebpack: config => {
    config.externals = {
      ...config.externals,
      'bootstrap-vue': 'bootstrap-vue',
      'vuelidate': 'vuelidate'
    }
  }
}
