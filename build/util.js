var path = require('path')
var config = require('./config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = {
assetsPath(_path){
    var dir = ''
    if(process.env.NODE_ENV == 'production'){
        dir = config.release.assetsSubDir
    }else{
        dir = config.dev.assetsSubDir
    }
    return path.posix.join(dir, _path)
},
cssLoaders(options) {
  options = options || {}
  // generate loader string to be used with extract text plugin
  function generateLoaders (loaders) {
    var sourceLoader = loaders.map(function (loader) {
      var extraParamChar
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?')
        extraParamChar = '&'
      } else {
        loader = loader + '-loader'
        extraParamChar = '?'
      }
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
    }).join('!')

    if (options.extract) {
      return ExtractTextPlugin.extract('vue-style-loader', sourceLoader)
    } else {
      return ['vue-style-loader', sourceLoader].join('!')
    }
  }
  return {
    css: generateLoaders(['css']),
    less: generateLoaders(['css', 'less'])
  }
},
styleLoaders(options) {
    var output = []
    var loaders = this.cssLoaders(options)
    for (var extension in loaders) {
      var loader = loaders[extension]
      output.push({
        test: new RegExp('\\.' + extension + '$'),
        loader: loader
      })
    }
    return output
  }
}