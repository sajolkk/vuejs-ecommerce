import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Sweetalert from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import moment from 'moment'

library.add(fas);
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!store.getters.userInfo) {
        next({
          name: 'login',
        })
      } else {
        next()
      }
    } else if (to.matched.some(record => record.meta.requiresVisitor)) {
      if (store.getters.userInfo) {
        next()
      } else {
        next()
      }
    } else {
      next()
    }
});
createApp(App).use(store).use(router).use(moment).use(Sweetalert).component('font-awesome',FontAwesomeIcon).mount('#app')

