import Vue from 'vue'
import VueRouter from 'vue-router'

// import pageTest from '../pages/index.vue'
import entrance from '../pages/entrance/index.vue'
Vue.use(VueRouter)
const ROUTER_SETTING = {
	mode: 'history', // default value 'hash'
    base: '/',
	routes: [
        {
            path: '/',
            component: entrance
        }
    ]
};
const router = new VueRouter(ROUTER_SETTING)


export default router;
