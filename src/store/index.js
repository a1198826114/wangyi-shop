import vuex from "vuex";
import Vue from "vue";

import modules from "./modules/index";
Vue.use(vuex);
export default new vuex.Store({
  modules,
});
