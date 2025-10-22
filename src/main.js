import './assets/main.scss'
import App from './App.vue'
import router from './router/index.js'
import {createApp} from "vue";
import Naive from 'naive-ui'

const app = createApp(App)
app.use(Naive)
app.use(router)
app.mount('#app')
