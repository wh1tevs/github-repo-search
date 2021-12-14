import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store';

import mdiVue from 'mdi-vue/v3';
import icons from '/@/icons';

import '/~/styles/styles.css';

createApp(App)
    .use(router)
    .use(store)
    .use(mdiVue, { icons })
    .mount('#app')
