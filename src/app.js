import 'babel-polyfill';
// import 'normalize.css'
import './assets/less/basic.less'
import Vue from 'vue'
import router from './router/index.js'
import store from './store'
import { sync } from 'vuex-router-sync'
import App from './app.vue'
import components from './components'
import directives from './directives'
import filters from './filters'

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router)

//register global vue dependencies
Vue.use(components)
Vue.use(directives)
Vue.use(filters)
const app = new Vue({
  store,
  router,
  ...App
})

// expose the app, the router and the store.
// note we are not mounting the app here, since bootstrapping will be
// different depending on whether we are in a browser or on the server.
export { app, router, store }

