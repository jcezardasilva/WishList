import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import { v4 as uuidv4 } from 'uuid';
import App from './App.vue'


const app = createApp(App);

app.config.globalProperties.$uuidv4 = uuidv4;
app.use(ElementPlus);
app.mount('#app');

import "bootstrap"