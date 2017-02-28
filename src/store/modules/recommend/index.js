import * as types from './mutation-types'
import $api from 'api'
const state = {
    posterUrl: ''
}
const getters = {
    posterUrl: state => state.posterUrl
}
const actions = {
    getRecommendInfo ({ commit, state, dispatch }, accountInfo) {
        commit(types.LOGIN, { isLoading: true });
        return new Promise((resolve, reject) => {
             $api.post('/login', accountInfo)
            .then(data => {
                commit(types.LOGIN_SUCCESS, data)
                resolve(data);
            }, data => {
                commit(types.LOGIN_FAILE, data);
                reject(data);
            })
        })
    }
}
const mutations = {
    
}

export default {
    state,
    getters,
    actions,
    mutations
}
