import Vue from 'vue'
import VueRouter from 'vue-router'

import mainWrap from '../pages/main/index.vue'
import mainContent from '../pages/main/content.vue'
// import testContent from '../pages/test/index.vue'

Vue.use(VueRouter)
const ROUTER_SETTING = {
	mode: 'history', // default value 'hash'
    base: '/',
    component: mainWrap,
	routes: [
         {
            path: '/',
            component: mainContent
        }
    ]
};
const router = new VueRouter(ROUTER_SETTING)


export default router;
