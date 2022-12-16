import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import policyInterpretion from './modules/policyInterpretion'
import comment from './modules/comment'
import ir from './modules/ir'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    policyInterpretion,
    comment,
    ir
  }
})
