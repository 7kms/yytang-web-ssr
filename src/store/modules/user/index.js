import * as types from './mutation-types';
import $api from 'api'

function generateNav (subscribeArr) {
    const navList = [];
    const navArr = [
        { title: '首页', path: '/timeline' },
        { title: '专栏', path: '/special' },
        { title: '收藏集', path: '/collection' },
        { title: '简书', path: '/notes' }
    ];
    const categoryArr = [
            {
                label: 'Android',
                category: 'android'
            },
            {
                label: '前端',
                category: 'frontend'
            },
            {
                label: 'IOS',
                category: 'ios'
            },
            {
                label: '后端',
                category: 'backend'
            },
            {
                label: '工具资源',
                category: 'tool'
            },
            {
                label: '阅读',
                category: 'read'
            }
    ];
    navArr.map((nav, index) => {
        var obj = {};
        obj.title = nav.title;
        obj.path = nav.path;
        obj.list = [];
        if (nav.title == '首页') {
            obj.list.push({
                label: '我关注的',
                path: `${nav.path}`
            });
            subscribeArr.map(sub => {
                if (sub.tag.showOnNav) {
                    obj.list.push({
                        label: sub.tag.title,
                        category: sub.tag.alias.split(/\s+/)[0],
                        path: `${nav.path}/${sub.tag.alias.split(/\s+/)[0]}`
                    });
                }
            });
        } else if (nav.title == '专栏' || nav.title == '发现') {
            categoryArr.forEach((item, index) => {
                if (index == 0) {
                    obj.list.push({
                        label: '全部',
                        path: `${nav.path}`
                    });
                } else {
                    obj.list.push(Object.assign({ path: `${nav.path}/${item.category}` }, item));
                }
            });
        } else if (nav.title == '收藏集') {
            obj.list.push({
                label: '全部',
                path: `${nav.path}`
            });
            obj.list.push({
                label: '编辑推荐',
                path: `${nav.path}/recommend`
            });
        } else if (nav.title == '简书') {
            obj.list.push({
                label: '我的笔记',
                path: `${nav.path}`,
                highlightPath: `${nav.path}`
            });
        }
        navList.push(obj);
    });
    return navList;
}

function Generatepromise () {
    var promisePool = {};
    this.promise = function (promiseName, fn) {
        if (!promisePool[promiseName]) {
            promisePool[promiseName] = new Promise(fn);
        }
        return promisePool[promiseName];
    }
}
var _Promise = new Generatepromise().promise;

const state = {
    userInfo: {},
    asideNav: [],
    subscribeInfo: {},
    isInitialPending: true
}

const actions = {
    [types.SET_SUBSCRIBE] ({ commit, state, dispatch }, subscribeArr) {
        commit(types.SET_SUBSCRIBE, subscribeArr);
        commit(types.SET_ASIDENAV, subscribeArr);
        commit(types.SET_INITIAL_STATUS, subscribeArr);
    },
    [types.GET_SUBSCRIBE] ({ commit, state, dispatch }) {
        return _Promise('SUBSCRIBE', (resolve, reject) => {
            dispatch(types.GET_USERINFO)
            .then(() => {
                var whereObj = { 'user': { '__type': 'Pointer', 'className': '_User', 'objectId': state.userInfo.objectId }};
                return $api.get('/user/subscribe', {
                            where: JSON.stringify(whereObj),
                            include: 'tag',
                            limit: 100,
                            order: 'createdAt'
                        });
            })
            .then(resData => {
                dispatch(types.SET_SUBSCRIBE, resData.results);
                resolve(resData);
            }, resError => {
                reject(resError);
            });
        })
    },
    [types.GET_USERINFO] ({ commit, state, dispatch }) {
        return _Promise('USERINFO', (resolve, reject) => {
             $api.get('/user/info').then(resData => {
                dispatch(types.SET_USERINFO, resData);
                resolve(resData);
            }, resError => {
                reject(resError);
            });
        });
    },
    [types.SET_USERINFO] ({ commit, state, dispatch }, userInfo) {
        commit(types.SET_USERINFO, userInfo);
    },
    [types.SET_INITIAL_STATUS] ({ commit, state, dispatch }) {
        commit(types.SET_INITIAL_STATUS);
    }
}

const getters = {
    [types.GET_SUBSCRIBE] (state) {
        return state.subscribeInfo;
    },
    [types.GET_ASIDENAV] (state) {
        return state.asideNav;
    },
    [types.GET_USERINFO] (state) {
        return state.userInfo;
    },
    [types.GET_INITIAL_STATUS] (state) {
        return state.isInitialPending;
    }
}

const mutations = {
    [types.SET_SUBSCRIBE] (state, subscribeArr) {
        state.subscribeInfo = subscribeArr;
    },
    [types.SET_ASIDENAV] (state, subscribeArr) {
        state.asideNav = generateNav(subscribeArr);
    },
    [types.SET_USERINFO] (state, userInfo) {
        state.userInfo = userInfo;
    },
    [types.SET_INITIAL_STATUS] (state) {
        state.isInitialPending = false;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
