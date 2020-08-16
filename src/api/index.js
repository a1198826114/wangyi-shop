// 封装api接口函数
// 引入二次封装的axios
import ajax from './ajax'



// 定义接口
// 获取大轮播图的数据
export const reqSearch=()=>ajax.get(`/searchsuggest/get`)
//获取首页的数据
