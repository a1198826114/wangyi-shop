//路由的动态加载
const Home = () => import("@/pages/Home");
const IP = () => import("@/pages/IP");
const Login = () => import("@/pages/Login");
const Adress = () => import("@/pages/MyAdress");
// 专辑列表
const AlbumList = () => import("@/pages/AlbumList");
const Order = () => import("@/pages/MyOrder");
const OrderConfirm = () => import("@/pages/OrderConfirm");
// 动态引入商品详情页组件
const Detail = () => import("@/pages/Detail");
// 动态引入购物车组件
const Cart = () => import("@/pages/Cart");
// 专辑详情
const Album = () => import("@/pages/Album");
export default [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/ip",
    component: IP,
  },
  // 数字专辑列表
  {
    path: "/albumList",
    component: AlbumList,
  },
  // 数字专辑详情
  {
    path: "/addAlbum",
    component: Album,
    beforeEnter: (to, form, next) => {
      // 只有携带看商品的 albumId  albumName saleNum 可以跳转
      const { albumId, albumName, saleNum } = to.query;
      if (albumId && albumName && saleNum) {
        next();
      } else {
        next("/albumList");
      }
    },
  },
  {
    path: "/",
    redirect: "/",
  },
  //登录界面
  {
    path: "/login",
    component: Login,
  },
  //我的地址
  {
    path: "/store/adress",
    component: Adress,
  },
  //我的订单
  {
    path: "/store/order",
    component: Order,
  },
  //订单确认
  {
    path: "/store/order/confirm",
    component: OrderConfirm,
  },
  {
    path: "/detail",
    component: Detail,
    beforeEnter: (to, from, next) => {
      if (!to.query.id) next(from.path);
      next();
    },
  },
  {
    path: "/cart",
    component: Cart,
  },
];
