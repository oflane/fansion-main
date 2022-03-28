/*
 * Copyright(c) Oflane Software 2017. All Rights Reserved.
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App'
import routes from './data/route.json'
import pageComps from './data/pages'
import Vue from 'vue'
import VueRouter from 'vue-router'
import ELEMENT from 'element-ui'
import 'fansion-ui/lib/fansion-ui.css'
import 'fansion-meta/lib/fansion-meta.css'
import 'fasm-fw/lib/fasm-fw.css'

Vue.use(VueRouter)
Vue.use(ELEMENT)

Vue.config.productionTip = false
window.vue = Vue
Promise.all([
  import('fansion-base'),
  import('fansion-fac'),
  import('fansion-ui'),
  import('fansion-meta'),
  import('fansion-tib'),
  import('fasm-fw')
]).then(res => {
  const fase = res[0].default
  const fac = res[1].default
  const fui = res[2].default
  const fmeta = res[3].default
  const ftib = res[4].default
  const fasm = res[5].default
  Vue.use(fase)
  Vue.use(fac)
  Vue.use(fui)
  Vue.use(fmeta)
  Vue.use(ftib)
  Vue.use(fasm)

  // 动态路由加载url
  const routeLoader = window.$routeLoader
  const urlsLoader = window.$urlsLoader
  Promise.all([fase.rest.gson(routeLoader), fase.rest.gson(urlsLoader)]).then(reses => {
    const loadRoutes = reses[0] ? reses[0].map(path => ({path, parent: '/'})) : []
    fase.init({
      pages: {
        pageComps
      },
      router: {
        routes: [
          ...routes,
          ...loadRoutes
        ]
      },
      urls: {
        urls: reses[1]
      }
    })
    /* eslint-disable no-new */
    /* eslint-disable no-new */
    const root = new Vue({
      el: '#app',
      router: fase.route.getRouter(),
      store: fase.store.getStore(),
      template: '<App/>',
      components: { App },
      render: h => h(App)
    })
    fase.util.setMessageComp(msg => {
      root.$message(msg)
    })
    fase.plugin.clearInstallCache()
  })
})
