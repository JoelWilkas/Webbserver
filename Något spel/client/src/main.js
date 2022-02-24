import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './views/App'
import store from './store'
import VueClipboard from 'vue-clipboard2'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'


createApp(App)
.use(store)
.use(VueClipboard)
.use(router)
.mount('#app')
