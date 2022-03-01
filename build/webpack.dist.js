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
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

function addJsFolder(path) {
  return options.jsFolder + "/" + path
}
let webpackDist = merge(webpackDev, {
  mode: mode,
  entry: {fansion: ['./src/main.js']},
  externals: {
    vue: 'Vue',
    'element-ui': 'ELEMENT',
    'vue-router': 'VueRouter'
  },
  devtool: 'none',
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin({})  // use OptimizeCSSAssetsPlugin
    ],
    splitChunks: {
      chunks: 'all',
      // minSize: 10000,
      // maxSize: 0,
      minChunks: 2,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        codemirror: {
          name: 'chunk-code', // split codemirror into a single package
          priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
          test: /[\\/]node_modules[\\/]_?codemirror(.*)/ // in order to adapt to cnpm
        },
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
  new ScriptExtHtmlWebpackPlugin({
    // `runtime` must same as runtimeChunk name. default is `runtime`
    inline: /runtime\..*\.js$/
  }),
  new MiniCssExtractPlugin({
    filename: addJsFolder('static/[name].app.css'),
    chunkFilename: addJsFolder('static/[name].[contenthash:12].css')  // use contenthash *
  }),
  new FriendlyErrorsPlugin(),
  new CopyWebpackPlugin(paths)
]
console.log(webpackDist)
module.exports = webpackDist
