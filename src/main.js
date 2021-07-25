/*
 * Copyright(c) Oflane Software 2017. All Rights Reserved.
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App'
import routes from './data/route.json'
import pageComps from './data/pages'
import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

Vue.config.productionTip = false
window.vue = Vue
Promise.all([
  import('element-ui'),
  import('fansion-base'),
  import('fansion-fac'),
  import('fansion-ui'),
  import('fansion-meta'),
  import('fansion-tib'),
  import('fasm-fw')
]).then(res => {
  const element = res[0].default
  const fase = res[1].default
  const fac = res[2].default
  const fui = res[3].default
  const fmeta = res[4].default
  const ftib = res[5].default
  const fasm = res[6].default
  Vue.use(element)
  Vue.use(fase)
  Vue.use(fac)
  Vue.use(fui)
  Vue.use(fmeta)
  Vue.use(ftib)
  Vue.use(fasm)

  // 动态路由加载url
  const routeLoader = '/fac/routes'
  fase.init({
    pages: { pageComps },
    router: { routes, routeLoader }
  })
  /* eslint-disable no-new */
  const root = new Vue({
    el: '#app',
    router: fase.route.getRouter(),
    template: '<App/>',
    components: { App },
    render: h => h(App)
  })
  fase.util.setMessageComp(msg => {
    root.$message(msg)
  })
})
