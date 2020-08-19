import axios from "./axios"
import request from "./request"
// 发送请求获取数字专辑列表
export function resGetAlbumList() {
  const params =
    "ccQMduZWGN6d0lE9WaPPFxK0InyPVsYNJgcT%2BYDnNdYJDbqjhroBpYccGUm%2B42KN"
  const encSecKey =
    "6fc9c047702c77a20b71c1ba8edffe3f61d6006377e1257cbae22242f2cb17c04192f499cb1afaa632734a68e3caebbcff4d17d932c8d51207390031c92ddf5ba19ec054772ebfb64c41434908bc49efa99bfb27a2e7a672da9bbcf155e432865434a4b931b737282bbfce8de866a6454587589bab2f820e8381436cf75305a6"
  return axios({
    url: `/weapi/vipmall/albumproduct/list?params=${params}&encSecKey=${encSecKey}`,
    method: "POST",
  })
}

// 发送请求获取数字专辑排行版
export function resGetAlbumRanking() {
  const params =
    "J1C4WSlEjvN5ocCMkt5gj0XLeMQkZ9FWSCEffP8yv6RUtenu2JAuEGYw2wO6SQQFknx%2BqZQljNfVJ4bGIjT%2B0Nqjh17Rmwo1G3A%2FXZ5r7qAt1KkK%2BtLpVIJqxbpvKArfK12HxHOcizcyiQvP0LTa%2BuSyqmAVqU71SF41ffmljQNLXx9L7eQNH%2F4llTDBqpWNKy7kQQVDnXg%2Bf7hW8qGj5mOEn9zVugINj9zlxOU7RVNlFn59JKyV4ifrX1%2FeNSY7z6rjaAY%2FDWaEpr4%2FsJNszXzOZ8SkbjleRk%2F7sz7yKigpjhEUlJAQ5LSQICXFQPjEMtmyWl%2BMSDh81UArU%2FDGphoHxm71nzUOEe%2F4OxMWXjXxBqctLU6U6InfHRajbh%2FIdneKCnk9dzc3axRXAceaJM8Ifvbn0S3Zq6tGmLpro5ehLGHqFyoJh%2FSFG1tKhHgwj90yyDn%2F0v1YFe2EaCEK%2FjYhOudg%2BLczGLoFkZJ7cclwYk2jSA5kz6pzSP2dgpgZ7h%2FOsOTBplWkBDq21thO7iX6f1R2AGWq%2FrG70xtDfxHC9ip77rc9YO8qqmiJmR08wHN0%2BAmPa5B48IKFYYyP95vFW3jMMJXoWd9EahY%2Fli9siNp0LMF5MXNHQzvHV7bjEfMxEJpXbUWGmmxBuJMgvvffHtn2EidIY03QseelxbmyG6oeZS8uKa2oWH0BK%2BEIQdlsBxUlK4tubzMd7tJK%2FFxKPpdO4BGlX51cv%2FDHkjuSyTLUiLTB55Z%2FbAUZNnO1EzB4VCA%2BOmiRACi8T8225MiK0VadJGdDlS7vHBil23IGBBrUpqdKSvuuOQCvrB0MFpQO8rzTqwiN4O0yaj3BTyK2l7ZzlJ8l%2FDEY9sV5tdfSCTK%2BVPgHLdkeNX4o6%2BRNPaLvlieRK1l565jJP%2B9mbgIBYfKux9k959jkmz6pxFU1o1UQQuaL%2BxDkaqRfHxkmCimpanzthPgTpXrzxP1XP1l%2F7HKlCEQhzuR1hXlh02f9f8%2BIk0aAwpscmBCW47XeNLm%2FwW%2FBhwznz3eUW5QbLsp8LSqnZbnr35OWY%2FEKTgfOYRsd0oZPaB0k9MdkNuaroIyJtdTecA6meduFn1Xi%2BkTJfBVLOmqyqOax9wiM%2Bug%3D"
  const encSecKey =
    "c8ecf6d39ad8ecb48726d9d221466552e0a6443fcf6e260a4fa30f79e11a17e8594101a5c227382456dfa56dcd94e3032f7229c404e428300ef62a258671fd7f169c37086fc60b22a8a1cebc27d74bdf3652a5cb9ce49ae7cd8d0a85e22d83aa3018bbc7942ec9bf12c89e4a8e3f286e05b005ef2c172be072f69f24284d8949"
  return axios({
    url: `weapi/batch?params=${params}&encSecKey=${encSecKey}`,
    method: "POST",
  })
}
// 发送请求获取往年的专辑 单曲 销售排行
export function resGetYearedAlbumRanking({ type, isAlbum }) {
  let params = ""
  let encSecKey = ""
  if (type === 2) {
    //19年
    if (isAlbum) {
      // 专辑
      console.log("19专辑")

      params =
        "byXc%2F2u5K%2BPOVoDoBHquiAiAA18IxQ6VwMlcMkCui0b8zfwTjBPN6%2F7M4BsOJ2fFtrB4Nq%2FjF91JdCc0sObC2xqRcGQ8tzdJRokACp8TL6c%3D"

      encSecKey =
        "dac2af0e6bc6ea0249192b8d7110e5c5940c20a9909108d84821c8b17e024b58711be752fd094dfd01a49d8352428cd113c4fa44bba75fc5e6bbb7d5830343aeeede88c0e518c694fe6f8cc7543f2517ed10437351ea9f5cfcc9df4df4d038395b37392e7324723b3f0e1a90038dc58eeebc6cff06375976798b38d484cfdccb"
    } else {
      // 单曲
      console.log("19单曲")
      params =
        "cLnL6QK7CSWY1l5xI9NAooUIlmXTzgNhzYPZY7HtecP9qZjHc%2F2G4eRabYzqENA1nD1g3piLEd7UnK1lB4cz2a1rHVd4Ry%2FL86rc6ERugPw%3D"

      encSecKey =
        "09f3852614078564285f0c39aa8fa8904f06ea007cdbc86db7fa810ee9a918ba9f4b7427ad52ec757543a6ec5c2a62debc2ef812afb2068c6d7824c5cd67cb3e4f3e3f327b467bd97ed80dd21ba4ea1c74b62635bd90748944e5cba0f746a17de6f2266282331ac7f25148488164e0d5ce648d8a8a8f07b9e23d592676c85c3b"
    }
  }
  if (type === 3) {
    // 18年
    if (isAlbum) {
      // 专辑
      console.log("18专辑")
      params =
        "E9edo8Jp6wV6Vdsf5ToQOfd%2FdSaBVxNhKtPzeJLo1dB4%2FxO1UKM79TERSqOB99I73HzOnXofn%2B6NNpGBIahuwza2o4Z3aDRtuFX8zzaTShs%3D"

      encSecKey =
        "72bd84b4645520c16fc6d9cbbedc5dad048644382964dc70bc05aa14e1e561247f852f4acc84a9dd239afd7541203e28ff07ff58ded095044c9b6cf29136544fa89b1b77f5bf865ef8f866a3245e35ddbd771dd9789cf09ef8724a2eaf11519d867a9ebe577c7d448dc5f425fd7ea517669e4f756338d704cfcd39aed64980ea"
    } else {
      // 单曲
      console.log("18单曲")
      params =
        "8Nx1FIV3woBK6FPUXxhef%2Bgo5GdV%2Bn2odwBLbF2v7cufoY6Sa54ywmh7Tc13NOb6nett0jeCRyc9QczGjfGZ4aU1vUMN1bSbethkaKJc0RA%3D"

      encSecKey =
        "26195293dff91e30639fca15c1285d7ff770e1f43303df4ee874d8e5bfc3e2d30eb4acbb46be27b7f935493b8cfd03d49b2c47138b69882be82fee7229e8018045b5d9ad04706257bf53a1b9518295b7bdd8d4fb1316e8f45b3f2c4741afe36f79b84eb38d93f35472efae1df04813a4eef74cad35ca2a46e412a037e2bf0d07"
    }
  }
  return axios({
    url: `weapi/feealbum/songsaleboard/year/type?params=${params}&encSecKey=${encSecKey}`,
    method: "POST",
  })
}
// 发送请求获取今日专辑畅销列表
export function resGetAlbumBestSeller() {
  const params =
    "bkEegfzMXh84Kfli0j8BDWxTM4Ewvefaf0Sk73uHj0W%2F%2BFgVVGYloS2Dxre9h%2BLI8oez4lko1GUgBgwLzAsqlwChh%2F74b6kJJyPqUX5BYaI%3D"
  const encSecKey =
    "ddd6c62633d1d4045ea7aed7cf7ceb7c4561ba5c847ed5418bb91784f1c4f6cf991d9bed4727fa910b55e6e0c79798a5b454b5256a101be9d9606cba474d5194e83d730bfa873883789bcb24fa5e3b18f765875a8b065b3e9acf24a54ca2f0ce278ed0a777bf09bcf1293609a3aa1fb4d04de93328dc4e2d127d5bc55c09d9c2"
  return axios({
    url: `weapi/feealbum/songsaleboard/daily/type?params=${params}&encSecKey=${encSecKey}`,
    method: "POST",
  })
}
// 发送请求获取专辑的详情信息
export function resGetAlbumInfo({ albumId }) {
  return request({
    url: "/getAlbumInfo",
    method: "GET",
    params: {
      albumId,
    },
  })
}
// 发送请求获取专辑的歌曲信息
export function resGetAlbumSong({ albumId }) {
  return request({
    url: "/getAlbumSong",
    method: "GET",
    params: {
      albumId,
    },
  })
}
// 发送请求获取专辑的评论信息
export function resGetAlbumComment({ albumId }) {
  return request({
    url: "/getAlbumComment",
    method: "GET",
    params: {
      albumId,
    },
  })
}
// 发送请求添加评论信息
export function resAddAlbumComment({ comment, albumId }) {
  return request({
    url: "/addAlbumComment",
    method: "POST",
    data: {
      albumId,
      comments: comment,
    },
  })
}
// 评论点击赞
export function resFabulous({ albumId, userId, commentId }) {
  return request({
    url:`/changeFabulousAlbumComment/${albumId}/${userId}/${commentId}`,
    method:'GET'
  })
}

// 发送请求获取专辑的粉丝购买排行信息
export function resGetAlbumFans({ albumId }) {
  return request({
    url: "/getAlbumFans",
    method: "GET",
    params: {
      albumId,
    },
  })
}
