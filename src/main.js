/*
 * Copyright(c) Oflane Software 2017. All Rights Reserved.
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App'
import fase from 'fansion-base'
import ElementUI from 'element-ui'
import fac from 'fansion-fac'
import fanui from 'fansion-ui'
import fameta from 'fansion-meta'
import demo from 'fansion-demo'
import fasm from 'fansion-func-fasm'
import routes from './data/route.json'
import pageComps from './data/pages'
import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import VueRouter from 'vue-router'

window.$restContext = '/oflane'

Vue.use(fase)
Vue.use(fac)
Vue.use(fanui)
Vue.use(fameta)
Vue.use(demo)
Vue.use(fasm)
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.config.productionTip = false
window.vue = Vue
// 动态路由加载url
const routeLoader = '/fac/routes'
fase.init({
  pages: { pageComps },
  router: { routes, routeLoader }
})
/* eslint-disable no-new */
let root = new Vue({
  el: '#app',
  router: fase.route.getRouter(),
  template: '<App/>',
  components: { App },
  render: h => h(App)
})
fase.util.setMessageComp(msg => {
  root.$message(msg)
})
