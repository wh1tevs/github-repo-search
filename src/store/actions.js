import axios from 'axios';
import { ITEMS_PER_PAGE } from '/@/constants';
import { SEARCH } from '/@/store/action-types';
import { SET_ITEMS, SET_LAST_QUERY, SET_PAGE, SET_TOTAL } from '/@/store/mutation-type';

export const actions = {
    async [SEARCH]({ commit, state }, { query, page, count }) {
        const baseUrl = 'https://api.github.com';

        if (!query) {
            commit(SET_ITEMS, [])
            commit(SET_TOTAL, 0)
            return;
        }

        const response = await axios.get(`${baseUrl}/search/repositories`, {
            params: {
                q: query,
                per_page: count || ITEMS_PER_PAGE,
                page: page || 1,
                sort: 'stars',
                order: 'desc',
            }
        })

        if (state.lastQuery !== query) {
            commit(SET_LAST_QUERY, query)
            commit(SET_PAGE, 1)
        }

        commit(SET_ITEMS, response.data.items)
        commit(SET_TOTAL, response.data.total_count)
    },
}
