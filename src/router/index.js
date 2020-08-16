import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
// const originpush = VueRouter.prototype.push
// VueRouter.prototype.push=function(location,oncation=()=>{},aboout){
//     return originpush.call(this,location,oncation,aboout)
// }
Vue.use(VueRouter)
export default new VueRouter({
    mode:'history',
    routes
})

