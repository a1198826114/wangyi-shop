import { GETALBUMLIST, GETALBUMRANKING } from "./mutation-type";
import { resGetAlbumList, resGetAlbumRanking } from "../../api/album";
const state = {
  albumList: [], // 专辑列表
  albumRanking: {}, // 专辑排行版
};
const mutations = {
  changeAlbumList(state, val) {
    state.albumList = val;
  },
  changeAlbumRanking(state, val) {
    state.albumRanking = val;
  },
};
const actions = {
  // 异步修改专辑列表数据
  [GETALBUMLIST]: async ({ commit }) => {
    const result = await resGetAlbumList();
    if (result.code) {
      commit("changeAlbumList", result.products.slice(0, 8));
    } else {
      console.log("获取专辑列表失败");
    }
  },
  // 异步修改专辑排行数据
  [GETALBUMRANKING]: async ({ commit }) => {
    const result = await resGetAlbumRanking();
    if (result.code === 200) {
      const albumRanking = {
        daily: [],
        total: [],
        week: [],
        year: [],
      };
      for (let i in result) {
        if (i.indexOf("daily", 28) !== -1) {
          if (i.indexOf("type/", -1) !== -1) {
            // 单曲
            albumRanking.daily[1] = result[i].products;
          } else {
            // 专辑
            albumRanking.daily[0] = result[i].products;
          }
        }
        if (i.indexOf("total", 28) !== -1) {
          if (i.indexOf("type/", -1) !== -1) {
            // 单曲
            albumRanking.total[1] = result[i].products;
          } else {
            // 专辑
            albumRanking.total[0] = result[i].products;
          }
        }
        if (i.indexOf("week", 28) !== -1) {
          if (i.indexOf("type/", -1) !== -1) {
            // 单曲
            albumRanking.week[1] = result[i].products;
          } else {
            // 专辑
            albumRanking.week[0] = result[i].products;
          }
        }
        if (i.indexOf("year", 28) !== -1) {
          if (i.indexOf("type/", -1) !== -1) {
            // 单曲
            albumRanking.year[1] = result[i].products;
          } else {
            // 专辑
            albumRanking.year[0] = result[i].products;
          }
        }
      }
      commit("changeAlbumRanking", albumRanking);
    } else {
      console.log("获取数字榜单失败");
    }
  },
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
