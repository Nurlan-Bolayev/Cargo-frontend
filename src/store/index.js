import Vue from 'vue'
import Vuex from 'vuex'
import axios from "@/axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    admin: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setAdmin(state, admin) {
      state.admin = admin;
    }
  },
  actions: {
    async fetchUser({commit}) {
      const {data} = await axios.get('api/users/me');
      commit('setUser', data);
    },
    async fetchAdmin({commit}) {
      const {data} = await axios.get('api/admins/me');
      commit('setAdmin', data);
    },

  },
  modules: {}
})
