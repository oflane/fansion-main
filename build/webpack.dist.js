/*
 * Copyright(c) Oflane Software 2017. All Rights Reserved.
 */
const {resolve, join} = require('./utils')
const webpack = require('webpack')
const mode = process.env.NODE_ENV
const {getOptions, convertJsFolder} = require('./options')
const options = getOptions()
const {copyPaths, modules} = require('./modules')

const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

console.log(modules)
console.log(nodeExternals())

function externals () {
  return {
    vue: 'Vue',
    'element-ui': 'ELEMENT',
    'vue-router': 'VueRouter'
  }
}
const moduleName = process.env.npm_package_name
const entry = {}
entry['fansion'] = ['./src/main.js']


let webpackDist = {
  mode: mode,
  entry,
  output: {
    path: resolve('./dist'),
    filename: convertJsFolder('[name].js'),
    chunkFilename: convertJsFolder('[name].bundle.js?[chunkhash]'),
    publicPath: ''
  },
  resolve: {
    extensions: ['.js', '.jsx', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '~': resolve('src'),
      '@static': resolve('static'),
      '@data': resolve('data')
    }
  },
  externals: externals(),
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
            const mp = resolve('node_modules')
            return /\.js$/.test(p) && p.indexOf(mp) === 0
          },
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|babel|es6)$/,
        include: resolve('./src'),
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          preserveWhitespace: false
        }
      },
      {
        test: /\.json$/,
        type: 'javascript/auto',
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loaders: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        loaders: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      },
      // {
      //   test: /\.html$/,
      //   loader: 'html-loader?minimize=false'
      // },
      {
        test: /\.otf|ttf|woff2?|eot(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: join(convertJsFolder(options.assertPath), '[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.svg(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: join(convertJsFolder(options.assertPath), '[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: join(convertJsFolder(options.assertPath), '[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.contextPath': JSON.stringify('/oflane'),
      'process.env.routeLoader': JSON.stringify('/fac/routes'),
      'process.env.urlsLoader': JSON.stringify('/fasm/service-info/urls')
    }),
    new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'dist.html',
      jsFolder: options.jsFolder,
      inject: true
    }),
    new ScriptExtHtmlWebpackPlugin({
      // `runtime` must same as runtimeChunk name. default is `runtime`
      inline: /runtime\..*\.js$/
    }),
    new MiniCssExtractPlugin({
      filename: convertJsFolder('static/[name].app.css'),
      chunkFilename: convertJsFolder('static/[name].[contenthash:12].css')  // use contenthash *
    }),
    // copy custom static assets
    new FriendlyErrorsPlugin(),
    new CopyWebpackPlugin(copyPaths)
  ]
}
console.log(webpackDist)
module.exports = webpackDist
