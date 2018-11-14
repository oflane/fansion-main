/*
 * Copyright(c) Oflane Software 2017. All Rights Reserved.
 */
const resolvePath = require('./utils').resolve
const mode = process.env.NODE_ENV
const options = require('./options').getOptions(mode)
const webpackDev = require('./webpack.dev');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin')

let webpackDist = merge(webpackDev, {
  mode: mode,
  entry: {app: ['./src/index.js']},
  output: {
    path: resolvePath('./dist'),
    filename: '[name].js',
    chunkFilename: '[name].bundle.js?[chunkhash]',
    publicPath: '/'
  },
});
webpackDist.plugins.push(new CopyWebpackPlugin([{from: resolvePath('./static'), to: options.assertPath, ignore: ['.*']}]))
module.exports = webpackDist
