import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import store from './store'
import VueClipboard from 'vue-clipboard2'


createApp(App)
.use(store).use(VueClipboard)
.mount('#app')
