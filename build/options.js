/*
 * Copyright(c) Oflane Software 2017. All Rights Reserved.
 */
module.exports.getOptions = function(env) {
  return {
    jsFolder: 'web',
    assertPath: 'static',
    modules: ['fansion-base', 'fansion-fac', 'fansion-ui', 'fansion-meta', 'fansion-tib', 'fasm-fw']
  }
}
module.exports.server = {
  port: 9090,
  autoOpenBrowser: false
}
module.exports.mock = {
  isMock: false,
  path: '/oflane/',
  url: 'http://localhost:8080',
  proxy: {
    loginUrl: '',
    url: 'http://localhost:8080',
    username: 'hrtest88',
    password: '97bbc79679fe1cfd9afb52fd6f01d033b479555d'
  }
}
