import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

//element ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//sweet alert
import VueSweetalert2 from 'vue-sweetalert2'
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css'
Vue.use(VueSweetalert2)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
