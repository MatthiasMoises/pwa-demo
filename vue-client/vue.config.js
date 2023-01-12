const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  pwa: {
    name: 'PWADemo',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      name: 'PWADemo',
      short_name: 'PWADemo',
      theme_color: '#4DBA87',
      start_url: 'http://localhost:8080',
      url: 'http://localhost:8080',
      display: 'standalone',
      lang: '',
      screenshots: []
    },
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './src/service-worker.js'
    }
  }
})
