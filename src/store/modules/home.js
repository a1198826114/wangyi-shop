import { reqSearch, reqBanners,reqRmdComd,reqHotComd } from '@/api'

const state = {
    //点击input 的搜索数据
    searchList: [],
    //轮播图数据
    bannersList: [],
    //推荐商品数据
    rmdComdList:[],
    //热门商品数据
    HotComdList:[]
}
const mutations = {
    //直接修改数据状态
    // 搜索框数据
    RECIVE_SEARCH_LIST(state, searchList) {
        state.searchList = searchList

    },
    //修改轮播图数据
    RECEIVE_BANNERS_LIST(state, bannersList) {
        state.bannersList = bannersList
    },
    //修改推荐商品数据
    RECEIVE_RMDCOMD_LIST(state, rmdComdList) {
        state.rmdComdList = rmdComdList
    },
    //修改推荐商品数据
    RECEIVE_HOTCOMD_LIST(state, HotComdList) {
        state.HotComdList = HotComdList
    }
}
const actions = {
    //获取搜索数据
    async getSearch({ commit }) {
        const result = await reqSearch()
        if (result.code === 200) {
            commit('RECIVE_SEARCH_LIST', result.data)

        }
        // console.log(result.data)
    },
    //获取轮播图数据
    async getBanner({ commit }) {
        const  result = await reqBanners()
        // console.log(result)
        if (result.code === 200) {
            commit('RECEIVE_BANNERS_LIST', result.banners)
        }
        // console.log(result.banners)
    },
    //获取推荐商品数据
    async getRmdComd({ commit }) {
        const  result = await reqRmdComd()
        console.log(result)
        if (result.code === 200) {
            commit('RECEIVE_RMDCOMD_LIST', result.data)
        }
        console.log(result.data)
    },
    //获取热门商品的数据
    async getHotComd({ commit }) {
        const  result = await reqHotComd()
        console.log(result)
        if (result.code === 200) {
            commit('RECEIVE_HOTCOMD_LIST', result.data)
        }
        console.log(result.data)
    }

}
const getters = {
        
}
export default {
    state,
    mutations,
    actions,
    getters
}
