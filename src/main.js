import { createApp } from 'vue'
import store from './store'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue'

const app = createApp(App);
app.config.devtools = true;
app.use(store).use(router).use(ElementPlus).mount('#app')
