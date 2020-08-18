// 封装api接口函数
// 引入二次封装的axios
import ajax from './ajax'
import Axios from 'axios'



// 定义接口
// 获取input里面的的数据
export const reqSearch=()=>ajax.get(`/searchsuggest/get`)
//获取首页轮播数据的数据
export const reqBanners=()=>ajax.get('/product/ipbanner',{params:{type:0}})
//获取首页推荐商品
export const reqRmdComd=()=>ajax.get('/hotproduct_v2/gets',{params:{limit:60,offset:0}} )
//获取首页热门商品
export const reqHotComd=()=>ajax.get('/allProduct/gets',{params:{limit:60,offset:0}} )
// IP商城选择分类后展示商品的请求
// export const reqProducts=(obj)=>ajax.post('/product/search',obj)
// export const reqProducts=(obj)=>ajax.post( `/product/search?limit=60&offset=${obj}&category_1=IP%E5%91%A8%E8%BE%B9`)
//IP商城品牌,分类,价格的请求
export const reqCategoryList=()=>ajax.get('/sortedAndFilter/list',{params:{category1Id:1008002}})


