require('./check-versions')()
process.env.NODE_ENV = 'production'
const path = require('path')
const ora = require('ora')
const rm = require('rimraf')
const chalk = require('chalk')
const webpack = require('webpack')
const webpackConfig = require('./webpack.dist')

const spinner = ora('building all lib for production...')
spinner.start()
rm(path.join(__dirname, '../dist'), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
    console.log(chalk.cyan('  Build complete.\n'))
  })
})
