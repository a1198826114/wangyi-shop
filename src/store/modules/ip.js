import { reqCategoryList } from "@/api";

const state = {
  categoryList: [],
};
const mutations = {
  //修改三个分类的初始数据
  RECEIVE_CATEGORY_LIST(state, categoryList) {
    state.categoryList = categoryList;
  },
};
const actions = {
  async getCategory({ commit }) {
    let result = await reqCategoryList();
    // console.log(result)

    if (result.data.code === 200) {
      commit("RECEIVE_CATEGORY_LIST", result.data.data);
    }

    // console.log(result.data)
  },
};

const getters = {};
export default {
  state,
  actions,
  mutations,
  getters,
};
