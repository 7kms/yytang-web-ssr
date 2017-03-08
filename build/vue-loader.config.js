module.exports = {
  preserveWhitespace: false,
  postcss: [
    require('autoprefixer')({
      browsers: ['last 3 versions']
    })
  ],
  cssModules: {
    localIdentName: '[name]-[hash:base64:5]',
    camelCase: true
  }
}