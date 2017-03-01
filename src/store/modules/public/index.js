// import * as types from './mutation-types'
import $api from 'api'
const state = {
    posterUrl: ''
}
const getters = {
    posterUrl: state => state.posterUrl
}
var  getParams = () => {
    var paramObj = {
        include: 'user',
        limit: 10,
        skip: 0,
        order:'-hotIndex'
    };
    var whereObj = {"category":'frontend',"createdAt":{"$gte":{"__type":"Date","iso":new Date( Date.now() - 86400*7*1000 ).toISOString()}}};
    paramObj.where = JSON.stringify(whereObj);
    return paramObj;
}
const actions = {
    getInitList ({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
             $api.post('/public/discover', getParams())
            .then(data => {
                commit('setInitInfo', data)
                resolve(data);
            }, data => {
                commit('setInitInfo', data);
                reject(data);
            })
        })
    }
}
const mutations = {
    setInitInfo (state, data) {
            state.initList = data
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
