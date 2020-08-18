import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
// 引入Swiper的样式
import 'swiper/css/swiper.css'
//引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css'
// import Pagination from './components/Pagination'
// Vue.component('Pagination',Pagination)
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
