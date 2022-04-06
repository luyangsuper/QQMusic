import { createApp } from 'vue'
import antd from 'ant-design-vue'
import './assets/fonts/font.css'
import 'ant-design-vue/dist/antd.less'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router.js'

const app = createApp(App)
app.use(antd)
app.use(createPinia())
app.use(router);
app.mount('#app')
