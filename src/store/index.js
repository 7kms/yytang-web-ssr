import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import * as actions from './actions'
import * as getters from './getters'
Vue.use(Vuex)
const state = {

}
export default new Vuex.Store({
    actions,
    getters,
    modules
})
