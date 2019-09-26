import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    viewHeight: 0
  },
  mutations: {
    setState (state, obj) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const val = obj[key]
          state[key] = val
        }
      }
    }
  },
  actions: {
    //
  },
  modules: {
    user,
    app
  }
})
