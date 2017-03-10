const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const vueConfig = require('./vue-loader.config')
const nodeModulePath = path.join(__dirname, '../node_modules')

module.exports = {
    devtool: 'inline-source-map',
    entry:{
        app: './src/client-entry'
        // app: 'babel-polyfill'
    },
    output:{
        path: path.resolve(__dirname, '../dist'),
        publicPath:'/dist/',
        filename:'[name].[chunkHash].js'
    },
    resolve:{
        alias:{
            'public': path.resolve(__dirname, '../public'),
            'vue': path.join(nodeModulePath, 'vue/dist/vue.common.js'),
            'vuex': path.join(nodeModulePath, 'vuex'),
            'vue-router': path.join(nodeModulePath, 'vue-router/dist/vue-router.js'),
            'api': path.resolve(__dirname, '../src/api'),
            // 'normalize.css':path.join(nodeModulePath, 'normalize.css/normalize.css'),
        }
    },
    module:{
        noParse: /es6-promise\.js$/,
        rules:[
            {
                test: /\.vue$/,
                use: [
                    {
                        loader:'vue-loader',
                         options: vueConfig
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader:'babel-loader'
                    }
                ]
            },
             {
               test: /\.less$/,
               use: ExtractTextPlugin.extract({
                        fallback: "vue-style-loader",
                        use:  ['css-loader','less-loader']
                   })
            },
 
            {
               test: /\.css$/,
               use: ExtractTextPlugin.extract({
                        fallback: "vue-style-loader",
                        use: ['css-loader']
                    })
            },
            //  {
            //    test: /\.less$/,
            //    use:  ['style-loader','css-loader','less-loader']
            // },
            // {
            //    test: /\.css$/,
            //    use:  ['style-loader','css-loader']
            // },
            {
                test: /\.(png|jpg|gif|svg|ico)$/,
                 use: [
                    {
                        loader:'url-loader',
                        options: {
                            limit: 500,
                            name: 'img/[name].[hash:6].[ext]'
                        }
                    }
                ]
            },
              {
                test: /.(eot|ttf|woff|woff2)$/,
                use: [{
                    loader:'file-loader',
                    options: {
                        name: 'font/[name].[hash:6].[ext]'
                    }
                }]
            }
        ]
    },
    plugins:[
        new ExtractTextPlugin({ filename:'css/[name].[chunkHash:6].css', allChunks: true })
    ],
    //当资源超过limit的提醒方式,单个资源的默认大小是250kb
    //https://github.com/webpack/webpack/issues/3216
    //https://webpack.js.org/configuration/performance/#components/sidebar/sidebar.jsx
    performance: {
        // hints: process.env.NODE_ENV === 'production' ? 'warning' : false
        hints: 'warning' 
    }
}