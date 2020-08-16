import {GETALBUMLIST} from "./mutation-type"
const state = {
  albumList: [], // 专辑列表
}
const mutations = {
  changeAlbumList(state, val) {
    state.albumList = val
  },
}
const actions = {
    // 异步修改专辑列表数据
    getAlbumList({commit}){

    }
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters,
}
