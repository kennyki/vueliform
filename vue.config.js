module.exports = {
  configureWebpack: config => {
    config.externals = {
      ...config.externals,
      'bootstrap-vue': 'bootstrap-vue',
      'vuelidate': 'vuelidate'
    }
  }
}
