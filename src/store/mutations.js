import {
    SET_TOTAL,
    SET_ITEMS,
    SET_SELECTED_ITEM,
    SET_LAST_QUERY,
    SET_PAGE,
    ADD_TO_FAVORITES,
    REMOVE_FROM_FAVORITES,
    SET_FAVORITES,
} from '/@/store/mutation-type';

export const mutations = {
    [SET_ITEMS]: (state, value) => state.items = value,
    [SET_TOTAL]: (state, value) => state.total = value,
    [SET_SELECTED_ITEM]: (state, repo) => state.selectedItem = repo,
    [SET_LAST_QUERY]: (state, value) => state.lastQuery = value,
    [SET_PAGE]: (state, value) => state.currentPage = value,
    [SET_FAVORITES]: (state, value) => state.favorites = value,
    [ADD_TO_FAVORITES]: (state, value) => state.favorites = { ...state.favorites, [value.id]: value },
    [REMOVE_FROM_FAVORITES]: (state, value) => {
        delete state.favorites[value.id];
        state.favorites = { ...state.favorites };
    },
}
