import './assets/main.scss'
import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import Naive from 'naive-ui'

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const app = createApp(App)

app.use(Naive)
app.use(router)
app.component('QuillEditor', QuillEditor)

app.mount('#app')
