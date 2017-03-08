import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)


const ROUTER_SETTING = {
	mode: 'history', // default value 'hash'
    base: '/',
	routes: [
        {
            path: '/',
            component: require('../pages/main/index.vue'),
            children: [
                {
                    path: 'welcom/:category?',
                    component: require('../pages/main/content.vue'),
                    meta: {
                        title: 'welcom'
                    },
                    beforeEnter (to, from, next) {
                        if (store.state.user.userInfo.objectId) {
                            next({ path: '/timeline' });
                        } else {
                            next();
                        }
                    }
                },
                {
                    path: '/:column(timeline|special|collection|discover)/:category?',
                    component: require('../pages/column/index.vue')
                },
                {
                    path: 'notes',
                    component: require('../pages/notes/main.vue'),
                    meta: {
                         title: '笔记'
                    },
                    children: [
                        {
                            path: '',
                            component: require('../pages/notes/index.vue')
                        },
                        {
                            path: 'manage',
                            component: require('../pages/notes/manage.vue')
                        }
                    ]
                }
            ]
        },
        {
            path: '/entrance',
            component: require('../pages/entrance/index.vue'),
            redirect: '/entrance/login',
            children: [
                {
                     path: 'login', 
                     component: require('../pages/entrance/Login.vue'),
                     meta: {
                         title: 'sign in'
                    } 
                },
                { 
                    path: 'register', 
                    component: require('../pages/entrance/Register.vue'),
                    meta: {
                         title: 'sign up'
                    } 
                },
                { path: '*', redirect: 'login' }
            ]
        },
        {
            path: '*',
            component: require('../pages/error/404.vue')
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


export default router;
