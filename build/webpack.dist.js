/*
 * Copyright(c) Oflane Software 2017. All Rights Reserved.
 */
const resolvePath = require('./utils').resolve
const mode = process.env.NODE_ENV
const options = require('./options').getOptions(mode)
const webpackDev = require('./webpack.dev');
const merge = require('webpack-merge');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

let webpackDist = merge(webpackDev, {
  mode: mode,
  entry: {app: ['./src/main.js']},
  output: {
    path: resolvePath('./dist'),
    filename: '[name].js',
    chunkFilename: '[name].bundle.js?[chunkhash]',
    publicPath: '/'
  },
  devtool: false,
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all', // 只对入口文件处理
      cacheGroups: {
        fansion: { // split `node_modules`目录下被打包的代码到 `page/vendor.js && .css` 没找到可打包文件的话，则没有。css需要依赖 `ExtractTextPlugin`
          test: /node_modules\/fansion-(fac||ui)\//,
          name: options.assertPath + '/fansion',
          priority: 11,
          enforce: true
        },
        fansionMeta: { // split `node_modules`目录下被打包的代码到 `page/vendor.js && .css` 没找到可打包文件的话，则没有。css需要依赖 `ExtractTextPlugin`
          test: /node_modules\/fansion-meta\//,
          name: options.assertPath + '/fansion-meta',
          priority: 11,
          enforce: true
        },
        vendor: { // split `node_modules`目录下被打包的代码到 `page/vendor.js && .css` 没找到可打包文件的话，则没有。css需要依赖 `ExtractTextPlugin`
          test: /node_modules\//,
          name: options.assertPath + '/vendor',
          priority: 10,
          enforce: true
        },
      }
    },
    runtimeChunk: {
      name: options.assertPath + '/manifest'
    }
  }
});

webpackDist.plugins.push(new MiniCssExtractPlugin({filename: options.assertPath +'css/[name].[contenthash].css'}))
webpackDist.plugins.push(new CopyWebpackPlugin([{from: resolvePath('./static'), to: options.assertPath, ignore: ['.*']}]))

if (options.gzip) {
  webpackDist.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(js|css)$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (options.analyzer) {
  webpackDist.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackDist
