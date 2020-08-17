// 专辑详情数据
const express = require("express")
// 专辑详情数据
const album = require("./json/album.json")
const app = express()
// 获取战专辑详情
app.get("/getAlbumInfo", (res, req) => {
  const { albumId } = res.query
  const data = album.find((item) => {
    return item.albumId === albumId / 1
  })
  if (data) {
    req.json({
      code: 200,
      data,
      msg: "成功",
    })
  } else {
    req.json({
      code: 201,
      data: {},
      msg: "亲,请检查你的网络哦！！",
    })
  }
})
app.listen(4399, () => {
  console.log("4399端口监听中")
})
