import Vue from 'vue'
import App from './App.vue'
import vuejquery from '../../node_modules/vuejquery'

Vue.use(vuejquery)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
