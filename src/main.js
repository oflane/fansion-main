/*
 * Copyright(c) Oflane Software 2017. All Rights Reserved.
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import fase from 'fansion-base'
import ElementUI from 'element-ui'
import fac from 'fansion-fac'
import fanui from 'fansion-ui'
import fameta from 'fansion-meta'
import routes from './data/route.json'
import pages from './data/pages'
import 'element-ui/lib/theme-chalk/index.css'
window.$restContext = '/oflane'
Vue.use(ElementUI)
Vue.use(fac)
Vue.use(fanui)
Vue.use(fameta)
Vue.config.productionTip = false
window.vue = Vue
fase.init({
  pages: {
    pages
  },
  routes
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: fase.route.getRouter(),
  template: '<App/>',
  components: { App },
  render: h => h(App)
})
