import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    darkTheme: false,
    apiKey: "",
    paper: "",
    previousPaper: "",
    previousId: "",
    user: null,
    uid: null
  },
  mutations: {
    changeDarkMode(state, mode) {
      state.darkTheme = mode;
    },
    setPaper(state, payload) {
      state.paper = payload;
    },
    setPreviousPaper(state, payload) {
      state.previousPaper = payload;
    },
    setPreviousId(state, payload) {
      state.previousId = payload;
    },
    setUID(state, uid) {
      state.uid = uid;
    }
  },
  actions: {},
  modules: {}
})