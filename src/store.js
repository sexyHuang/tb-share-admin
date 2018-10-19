import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      user_name: ''
    }
  },
  mutations: {
    setUser(state, data) {
      state.user = data;
    }
  },
  actions: {}
});
