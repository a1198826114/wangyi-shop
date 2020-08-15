import Home from '@/pages/Home'
import IP from '@/pages/IP'

export default[
    {
        path:'/',
        component:Home
    },
    {
        path:'/ip',
        component:IP
    },
    {
        path:'/',
        redirect:'/'
    }
]






