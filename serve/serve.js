// 专辑详情数据
const express = require("express")
const bodyParser = require("body-parser")
// 专辑详情数据
const album = require("./json/album.json")
// 专辑歌曲数据
const albumSong = require("./json/albumSong.json")
// 专辑评论数据
let comment = require("./json/comment.json")
comment.forEach((item) => {
  item.datas.forEach((itemChildren) => {
    itemChildren.fabulous = []
  })
})
// 专辑粉丝购买数据
const fans = require("./json/fans.json")
const app = express()
// 解析json数据
app.use(bodyParser.json())
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())
// 获取专辑详情
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
// 获取专辑歌曲列表
app.get("/getAlbumSong", (res, req) => {
  const { albumId } = res.query
  const data = albumSong.find((item) => {
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
// 获取专辑评论列表
app.get("/getAlbumComment", (res, req) => {
  const { albumId } = res.query
  const data = comment.find((item) => {
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
// 添加专辑评论
app.post("/addAlbumComment", (res, req) => {
  const { albumId, comments } = res.body
  comments.commentId = Number(Date.now() + 123456789)
  const index = comment.findIndex((item) => item.albumId === albumId / 1)
  if (index === -1) {
    req.json({
      code: 201,
      msg: "亲,请检查你的网络哦!!",
    })
  } else {
    comment[index].datas.push(comments)
    req.json({
      code: 200,
      msg: "成功",
      data: comment[index],
    })
  }
})
// 评论点赞
app.get(
  "/changeFabulousAlbumComment/:albumId/:userId/:commentId",
  (res, req) => {
    const { albumId, userId, commentId } = res.params
    console.log(res.params, 1111)

    const index = comment.findIndex((item) => item.albumId === albumId / 1)
    let index1 = null
    if (index !== -1) {
      index1 = comment[index].datas.findIndex(
        (item) => item.commentId === commentId / 1
      )
    }
    if (index === -1 || index1 === -1) {
      req.json({
        code: 201,
        msg: "亲,请检查你的网络哦!!",
      })
    } else {
      comment[index].datas[index1].fabulous.push(userId)
      comment[index].datas[index1].likedCount =
        comment[index].datas[index1].likedCount / 1 + 1

      req.json({
        code: 200,
        msg: "成功",
        data: {},
      })
    }
  }
)

// 获取专辑粉丝购买列表排行
app.get("/getAlbumFans", (res, req) => {
  const { albumId } = res.query
  const data = fans.find((item) => {
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
