import Home from "@/pages/Home"
import IP from "@/pages/IP"

// 专辑列表
import AlbumList from "../pages/AlbumList"
// 专辑详情
import Album from "../pages/Album"
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
  },
  {
    path: "/",
    redirect: "/",
  },
]
