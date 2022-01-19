import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
Vue.use(Vuex);

const defaultState = {
  startDate: '2022-01-01',
  endDate: '2022-01-10',
  liked: [],
  disliked: [],
};

export default new Vuex.Store({
  state: {
    ...defaultState,
  },
  getters: {
    startDate: (state) => state.startDate,
    endDate: (state) => state.endDate,
    liked: (state) => state.liked,
    disliked: (state) => state.disliked,
  },
  mutations: {
    setStartDate: (state, payload) => (state.startDate = payload),
    setEndDate: (state, payload) => (state.endDate = payload),
    addLike: (state, payload) => state.liked.push(payload),
    removeLike: (state, payload) => (state.liked = state.liked.filter((x) => x !== payload)),
    addDislike: (state, payload) => state.disliked.push(payload),
    removeDislike: (state, payload) =>
      (state.disliked = state.disliked.filter((x) => x !== payload)),
    init: (state) => Object.assign(state, defaultState),
  },
  actions: {},
  modules: {},
  plugins: [new VuexPersistence().plugin],
});

// import Vue from 'vue';
// import Vuex from 'vuex';
// Vue.use(Vuex);

// export default new Vuex.Store({
//   state: {
//     startDate: '2022-01-01',
//     endDate: '2022-01-10',
//     liked: new Set(),
//     disliked: new Set(),
//   },
//   getters: {
//     startDate: (state): string => state.startDate,
//     endDate: (state): string => state.endDate,
//     liked: (state): Set<string> => state.liked,
//     disliked: (state): Set<string> => state.disliked,
//   },
//   mutations: {
//     setStartDate: (state, payload: string) => (state.startDate = payload),
//     setEndDate: (state, payload: string) => (state.endDate = payload),
//     setLiked: (state, payload: Set<string>) => (state.liked = payload),
//     setDisliked: (state, payload: Set<string>) => (state.disliked = payload),
//   },
//   actions: {},
//   modules: {},
//   // plugins: [vuexLocal.plugin],
// });
