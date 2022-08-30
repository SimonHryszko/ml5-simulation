import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import './index.css';
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import 'sweetalert2/dist/sweetalert2.min.css';

const pinia = createPinia()
const app = createApp(App)

pinia.use(piniaPluginPersistedstate);
app.use(pinia)
app.use(router)
app.mount('#app');
