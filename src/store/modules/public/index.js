import * as types from './mutation-types'
import $api from 'api'
const state = {
    posterUrl: '',
    initList: []
}
const getters = {
    posterUrl: state => state.posterUrl
}
var getParams = () => {
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
    [types.SET_INITIAL_LIST] ({ commit }, list) {
        commit(types.SET_INITIAL_LIST, list)
    },
    [types.GET_INITIAL_LIST] ({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            $api.get('/public/discover', getParams())
            .then(data => {
                commit(types.SET_INITIAL_LIST, data.results)
                resolve(data);
            }, error => {
                console.log(error);
                reject(error);
            })
        });
    }
}
const mutations = {
    [types.SET_INITIAL_LIST] (state, list) {
       state.initList = [...state.initList, ...list]
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
