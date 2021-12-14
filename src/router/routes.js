import HomePage from '/@/pages/Home.vue'
import FavoritesPage from '/@/pages/Favorites.vue'
import RepositoryPage from '/@/pages/Repository.vue'

export default [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/repository/:owner/:repo',
        name: 'RepositoryPage',
        component: RepositoryPage
    },
    {
        path: '/favorites',
        name: 'FavoritesPage',
        component: FavoritesPage
    }
]
