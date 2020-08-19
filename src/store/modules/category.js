import { CHANGECATEGORY2ID, CHANGECATEGORY3ID } from "./mutation-type";
import { getCategory2Id, getCategory3Id } from "../../api/index";
const state = {
  categoryList2: [],
  categoryList3: [],
};
const mutations = {
  [CHANGECATEGORY2ID](state, val) {
    state.categoryList2 = val;
  },
  [CHANGECATEGORY3ID](state, val) {
    state.categoryList3 = val;
  },
};
const actions = {
  async category2Id({ commit }, id) {
    const { data } = await getCategory2Id(id);

    commit(CHANGECATEGORY2ID, data.data);
  },
  async category3Id({ commit }, id) {
    const { data } = await getCategory3Id(id);
    commit(CHANGECATEGORY3ID, data.data);
  },
};
export default {
  state,
  mutations,
  actions,
};
