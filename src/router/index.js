import Vue from 'vue'
import VueRouter from 'vue-router'

import Entrance from '../pages/entrance/index.vue'
import Login from '../pages/entrance/Login.vue'
// import Register from '../pages/entrance/Register.vue'
Vue.use(VueRouter)
const ROUTER_SETTING = {
	mode: 'history', // default value 'hash'
    base: '/',
	routes: [
        {
            path: '/',
            component: Entrance,
            redirect: '/login',
            children: [
                {
                     path: 'login', 
                     component: Login,
                     meta: {
                         title: 'sign in'
                    } 
                }
            ]
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
};
const router = new VueRouter(ROUTER_SETTING)
const title = '弹枪';
router.beforeEach((to, from, next) => {
    let titleStr = ''
    // 倒序遍历数组获取匹配到的路由节点，拼接各部分title
    for (let i = to.matched.length - 1; i >= 0; i--) {
        titleStr += `${to.matched[i].meta.title ? to.matched[i].meta.title : ''}`
    }
    if (titleStr) {
        titleStr += `-${title}`
    } else {
        titleStr += title;
    }
    document.title = titleStr;
    next();
});

export default router;
