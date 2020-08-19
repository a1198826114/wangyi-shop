<<<<<<< HEAD
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
=======
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import store from "./store/index";
import axios from "axios";
import VueAxios from "vue-axios";
// 引入moment 时间格式库
import moment from "moment";
// 引入图片懒加载库
import VueLazyLoad from "vue-lazyload";
// 引入ant-ui库
import { Skeleton } from "ant-design-vue";
import errorImage from "./timg (2).gif";
import loadingImage from "./timg (2).gif";
import "ant-design-vue/dist/antd.css";
import "./reset.css";

Vue.use(VueAxios, axios);
Vue.use(Skeleton);
Vue.prototype.$bus = new Vue();
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(VueLazyLoad, {
  error: errorImage,
  loading: loadingImage,
});
Vue.use(ElementUI);
Vue.prototype.$bus = new Vue();
Vue.filter("formatTime", (time) => {
  return moment(time).format("MM月DD日 HH:mm");
});
new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
>>>>>>> 项目完工
