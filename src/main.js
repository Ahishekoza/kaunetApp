import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Quasar,LocalStorage,SessionStorage } from 'quasar'

import quasarUserOptions from './quasar-user-options'


createApp(App).use(Quasar,{LocalStorage,SessionStorage}, quasarUserOptions).use(store).use(router).mount('#app')
