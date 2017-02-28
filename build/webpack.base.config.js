const path = require('path')
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
            'api': path.resolve(__dirname, '../src/api')
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
                ],
               
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
               use: [
                    'style-loader',
                    { 
                        loader: 'css-loader',
                        options: { 
                            modules: true,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        }
                    },
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                 use: [
                    {
                        loader:'url-loader',
                       options: {
                            limit: 10000,
                            name: '[name].[ext]?[hash]'
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
                }],
                
            },
             {
                test: /.(ico)$/,
                 use: [{
                    loader:'file-loader',
                    options: {
                        name: 'img/[name].[hash:6].[ext]'
                    }
                }]
            }
        ]
    },
    //当资源超过limit的提醒方式,单个资源的默认大小是250kb
    //https://github.com/webpack/webpack/issues/3216
    //https://webpack.js.org/configuration/performance/#components/sidebar/sidebar.jsx
    performance: {
        // hints: process.env.NODE_ENV === 'production' ? 'warning' : false
        hints: 'warning' 
    }
}