import vuex from "vuex"
import Vue from "vue"
import album from "./module/album"
Vue.use(vuex)
export default new vuex.Store({
  modules: {
    album,
  },
})
