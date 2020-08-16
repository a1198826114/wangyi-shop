import {reqSearch} from '@/api'

const state ={
    //点击input 的搜索数据
    searchList:[]
}
const mutations={
    //直接修改数据状态
    // 搜索框数据
    RECIVE_SEARCH_LIST(state,searchList){
        state.searchList=searchList
        console.log(state.searchList)
    }
}
const actions={
    //获取搜索数据
    async getSearch({commit}){
        const result = await reqSearch()
        if(result.code===200){
            commit('RECIVE_SEARCH_LIST',result.data)
            
        }
    }
}
const getters ={

}
export default{
    state,
    mutations,
    actions,
    getters
}
