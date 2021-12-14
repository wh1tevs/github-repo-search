import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import { mutations } from './mutations';
import { actions } from './actions';

export const store = createStore({
  state () {
    return {
      items: [],
      totalItems: 0,
      selectedItem: null,
      favorites: {},

      currentPage: 1,
      lastQuery: '',
    }
  },
  mutations,
  actions,
  plugins: [createPersistedState()],
})
