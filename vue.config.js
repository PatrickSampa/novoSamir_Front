module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    devtool: 'source-map',
    // plugins: [
    //   new (require('csp-html-webpack-plugin'))({
    //     'base-uri': ["*"],
    //     'object-src': ["*"],
    //     'script-src': ["*"],
    //     'style-src': ["http://localhost"],
    //     'font-src': ["http://localhost"],
    //     'img-src': ["http://localhost"],
    //     'connect-src': ["*"],
    //     'frame-src': ["http://localhost"],
    //     'media-src': ["http://localhost"],
    //     'manifest-src': ["http://localhost"],
    //     'prefetch-src': ["http://localhost"],
    //     'form-action': ["http://localhost"],
    //   })
    // ]
  }
}
