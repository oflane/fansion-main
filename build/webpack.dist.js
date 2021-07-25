/*
 * Copyright(c) Oflane Software 2017. All Rights Reserved.
 */
const resolvePath = require('./utils').resolve
const mode = process.env.NODE_ENV
const options = require('./options').getOptions(mode)
const webpackDev = require('./webpack.dev');
const merge = require('webpack-merge');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

function addJsFolder(path) {
  return options.jsFolder + "/" + path
}
let webpackDist = merge(webpackDev, {
  mode: mode,
  entry: {app: ['./src/main.js']},
  externals: {
    vue: 'Vue',
    // 'element-ui': 'ELEMENT',
    'vue-router': 'VueRouter'
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 10000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        default: {
          test: function (module, chunks) {
            const p = module.resource
            const mp = resolvePath('node_modules')
            return /\.js$/.test(p) && p.indexOf(mp) === 0
          },
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  output: {
    path: resolvePath('./dist'),
    filename: addJsFolder('[name].js'),
    chunkFilename: addJsFolder('[name].bundle.js?[chunkhash]'),
    publicPath: ''
  }
});

let paths = options.modules.map(m => {
  let from = 'node_modules/'+ m +"/lib"
  let to = addJsFolder(m)
  let ignore = [m+".js", '.*']
  return {from, to, ignore}
})
paths.push({from: resolvePath(options.assertPath), to: addJsFolder(options.assertPath), ignore: ['.*']})
webpackDist.plugins = [
  new VueLoaderPlugin(),
  new webpack.DefinePlugin({
    'process.env': mode
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'dist.html',
    publicPath: options.jsFolder,
    inject: true
  }),
  new FriendlyErrorsPlugin(),
  new CopyWebpackPlugin(paths)
]
console.log(webpackDist)
module.exports = webpackDist
