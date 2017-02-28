import * as types from './mutation-types'
import $api from 'api'
const state = {
    loginInfo: {
        loading: false
    },
    regInfo: {
        loading: false
    }
}
const getters = {
    loginLoading: state => state.loginInfo.loading,
    regLoading: state => state.regInfo.loading,
    accountInfo: state => state.accountInfo
}
const actions = {
    [types.LOGIN_SUCCESS] ({ commit, state, dispatch }, data) {
        commit(types.LOGIN_SUCCESS, data);
    },
    [types.LOGIN_FAILE] ({ commit, state, dispatch }, data) {
        commit(types.LOGIN_FAILE, data);
    },
    [types.LOGIN_OUT] ({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
             $api.post('/user/loginout') 
            .then(data => {
                resolve(data);
            }, data => {
                reject(data);
            })
        })
    },
    [types.REGISTER] ({ commit, state, dispatch }, accountInfo) {
        commit(types.LOGIN, { isLoading: true });
        return new Promise((resolve, reject) => {
             $api.post('/user/register', accountInfo)
            .then(data => {
                commit(types.REGISTER_SUCCESS, data)
                resolve(data);
            }, data => {
                commit(types.REGISTER_FAILE, data);
                reject(data);
            })
        })
    }
}
const mutations = {
    [types.LOGIN] (state, { isLoading }) {
        state.loginInfo.loading = isLoading
    },
    [types.LOGIN_SUCCESS] (state, userData) {
        state.loginInfo.loading = false;
    },
    [types.LOGIN_FAILE] (state, accountInfo) {
        state.loginInfo.loading = false;
    },
    [types.REGISTER] (state, { isLoading }) {
        state.regInfo.loading = isLoading
    },
    [types.REGISTER_SUCCESS] (state, { user }) {   
        state.regInfo.loading = false;
    },
    [types.REGISTER_FAILE] (state, accountInfo) {
        state.regInfo.loading = false;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
