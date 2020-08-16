<template>
  <!-- 专辑详情 -->
  <div class="InfoConent">
    <!-- 头部导航分享 -->
    <div class="hearder">
      <div class="path">
        <router-link to="/" class="index">首页</router-link>
        <!-- <a class="index">首页</a> -->
        <i class="name"></i>
        <span>L.O.V.E</span>
      </div>
      <div class="share">
        <i></i>
        <a>分享</a>
      </div>
    </div>

    <!-- 专辑购买详情 -->
    <AlbumShop />

    <!-- 专辑详情相关介绍 今日畅销 -->
    <div class="albumIntroduce-bestSeller">
      <div class="albumIntroduce-content">
        <!-- 专辑介绍 -->
        <div class="special-Intro">
          <div class="hearder1">
            <span>数字专辑</span>
            <a>数字专辑购买须知</a>
          </div>
          <!-- 专辑介绍文案 -->
          <div class="info">
            <div class="title">专辑介绍</div>
            <!-- 添加active 类 控制 是否全部显示 -->
            <div class="text active">
              <p>DUO团队倾心打造全新大碟《L.O.V.E.》</p>
              <p>
                时隔6年，一首首具个人色彩的作品逐渐诞生，让这个愿望不再只是纸言词组。全新大碟《L.O.V.E.》一共收录8首广东作品、2首国语作品，以及1首英语作品，由DUO团队成员包办曲词编监全碟制作。6年间先后在英国、广州及香港三地录音室进行现场录音(Live
                Recording)，历经无数次的反覆录制及编排后，终让这批风格多样的「臣」曲呈现大家眼前
              </p>
              <p>DUO团队倾心打造全新大碟《L.O.V.E.》</p>
              <p>DUO团队倾心打造全新大碟《L.O.V.E.》</p>
              <p>DUO团队倾心打造全新大碟《L.O.V.E.》</p>
              <p>DUO团队倾心打造全新大碟《L.O.V.E.》</p>
              <p>DUO团队倾心打造全新大碟《L.O.V.E.》</p>
              <p>DUO团队倾心打造全新大碟《L.O.V.E.》</p>
              <p>
                时隔6年，一首首具个人色彩的作品逐渐诞生，让这个愿望不再只是纸言词组。全新大碟《L.O.V.E.》一共收录8首广东作品、2首国语作品，以及1首英语作品，由DUO团队成员包办曲词编监全碟制作。6年间先后在英国、广州及香港三地录音室进行现场录音(Live
                Recording)，历经无数次的反覆录制及编排后，终让这批风格多样的「臣」曲呈现大家眼前
              </p>
              <p>DUO团队倾心打造全新大碟《L.O.V.E.》</p>
              <p>DUO团队倾心打造全新大碟《L.O.V.E.》</p>
              <p>DUO团队倾心打造全新大碟《L.O.V.E.》</p>
              <p>DUO团队倾心打造全新大碟《L.O.V.E.》</p>
              <p>
                时隔6年，一首首具个人色彩的作品逐渐诞生，让这个愿望不再只是纸言词组。全新大碟《L.O.V.E.》一共收录8首广东作品、2首国语作品，以及1首英语作品，由DUO团队成员包办曲词编监全碟制作。6年间先后在英国、广州及香港三地录音室进行现场录音(Live
                Recording)，历经无数次的反覆录制及编排后，终让这批风格多样的「臣」曲呈现大家眼前
              </p>
              <p>DUO团队倾心打造全新大碟《L.O.V.E.》</p>
              <p>DUO团队倾心打造全新大碟《L.O.V.E.》</p>
              <p>DUO团队倾心打造全新大碟《L.O.V.E.》</p>
              <p>DUO团队倾心打造全新大碟《L.O.V.E.》</p>
            </div>
            <!-- div 添加 active类 控制图标 -->
            <div class="all active">
              <span>显示全部</span>
              <i></i>
            </div>
          </div>

          <!-- 歌曲列表 -->
          <div class="songList">
            <div class="title">歌曲列表</div>
            <div class="content">
              <span>1</span>
              <div class="songName">小期待</div>
            </div>
            <div class="content">
              <span>1</span>
              <div class="songName">小期待</div>
            </div>
            <div class="content">
              <span>2</span>
              <div class="songName">小期待</div>
            </div>
            <div class="content">
              <span>3</span>
              <div class="songName">小期待</div>
            </div>
            <div class="content">
              <span>4</span>
              <div class="songName">小期待</div>
            </div>
            <div class="content">
              <span>5</span>
              <div class="songName">小期待</div>
            </div>
          </div>

          <!-- 今日粉丝榜累计粉丝榜-->
          <div class="todayOrAllList">
            <div class="title">
              <div>
                <button class="today active">今日粉丝榜</button>
                <button class="cumulative">累计粉丝榜</button>
              </div>
            </div>
            <!-- 添加active类控制是否全部显示 -->
            <div class="list active">
              <div class="one item">
                <span class="index">1</span>
                <div class="image">
                  <img
                    src="http://p1.music.126.net/sJ1zv_SvRxx78kIOlZT6Iw==/18538865557661753.jpg?param=70y70"
                    alt
                  />
                </div>
                <div class="name">
                  <a href="javascript:;">小白菜</a>
                </div>
                <span class="num">1000张</span>
              </div>
              <div class="two item">
                <span class="index">1</span>
                <div class="image">
                  <img
                    src="http://p1.music.126.net/sJ1zv_SvRxx78kIOlZT6Iw==/18538865557661753.jpg?param=70y70"
                    alt
                  />
                </div>
                <div class="name">
                  <a href="javascript:;">小白菜</a>
                </div>
                <span class="num">1000张</span>
              </div>
              <div class="three item">
                <span class="index">1</span>
                <div class="image">
                  <img
                    src="http://p1.music.126.net/sJ1zv_SvRxx78kIOlZT6Iw==/18538865557661753.jpg?param=70y70"
                    alt
                  />
                </div>
                <div class="name">
                  <a href="javascript:;">小白菜</a>
                </div>
                <span class="num">1000张</span>
              </div>
              <!-- 余下 -->
              <div class="surplus">
                <span class="index">4</span>
                <div class="image">
                  <img
                    src="http://p1.music.126.net/sJ1zv_SvRxx78kIOlZT6Iw==/18538865557661753.jpg?param=70y70"
                    alt
                  />
                </div>
                <div class="name">
                  <a href="javascript:;">小白菜</a>
                </div>
                <span class="num">1000张</span>
              </div>
              <div class="surplus">
                <span class="index">4</span>
                <div class="image">
                  <img
                    src="http://p1.music.126.net/sJ1zv_SvRxx78kIOlZT6Iw==/18538865557661753.jpg?param=70y70"
                    alt
                  />
                </div>
                <div class="name">
                  <a href="javascript:;">小白菜</a>
                </div>
                <span class="num">1000张</span>
              </div>
              <div class="surplus">
                <span class="index">4</span>
                <div class="image">
                  <img
                    src="http://p1.music.126.net/sJ1zv_SvRxx78kIOlZT6Iw==/18538865557661753.jpg?param=70y70"
                    alt
                  />
                </div>
                <div class="name">
                  <a href="javascript:;">小白菜</a>
                </div>
                <span class="num">1000张</span>
              </div>
            </div>
            <!-- div 添加 active类 控制图标 -->
            <div class="all active">
              <span>显示全部</span>
              <i></i>
            </div>
          </div>

          <!-- 精彩评论 -->
          <Comment />
        </div>
      </div>

      <!-- 今日畅销 -->
      <div class="bestSeller">
        <div class="hearder1">
          <span>今日畅销</span>
        </div>
        <div class="content">
          <div class="album">
            <div class="image">
              <img
                src="http://p1.music.126.net/1-WYcjngQv-gd7X0o-NuFA==/109951165163258166.jpg?imageView&thumbnail=200x200"
                alt
              />
            </div>
            <div class="info">
              <div class="name">
                <a href>folklore新车险部沙发发发父爽肤水发顺丰法法发顺丰三发啊发</a>
              </div>
              <div class="num">
                已销售
                <span>12243431</span>张
              </div>
            </div>
          </div>
          <div class="album">
            <div class="image">
              <img
                src="http://p1.music.126.net/1-WYcjngQv-gd7X0o-NuFA==/109951165163258166.jpg?imageView&thumbnail=200x200"
                alt
              />
            </div>
            <div class="info">
              <div class="name">
                <a href>folklore新车险部沙发发发父爽肤水发顺丰法法发顺丰三发啊发</a>
              </div>
              <div class="num">
                已销售
                <span>12243431</span>张
              </div>
            </div>
          </div>

          <div class="album">
            <div class="image">
              <img
                src="http://p1.music.126.net/1-WYcjngQv-gd7X0o-NuFA==/109951165163258166.jpg?imageView&thumbnail=200x200"
                alt
              />
            </div>
            <div class="info">
              <div class="name">
                <a href>folklore新车险部沙发发发父爽肤水发顺丰法法发顺丰三发啊发</a>
              </div>
              <div class="num">
                已销售
                <span>12243431</span>张
              </div>
            </div>
          </div>
          <div class="album">
            <div class="image">
              <img
                src="http://p1.music.126.net/1-WYcjngQv-gd7X0o-NuFA==/109951165163258166.jpg?imageView&thumbnail=200x200"
                alt
              />
            </div>
            <div class="info">
              <div class="name">
                <a href>folklore新车险部沙发发发父爽肤水发顺丰法法发顺丰三发啊发</a>
              </div>
              <div class="num">
                已销售
                <span>12243431</span>张
              </div>
            </div>
          </div>
          <div class="album">
            <div class="image">
              <img
                src="http://p1.music.126.net/1-WYcjngQv-gd7X0o-NuFA==/109951165163258166.jpg?imageView&thumbnail=200x200"
                alt
              />
            </div>
            <div class="info">
              <div class="name">
                <a href>folklore新车险部沙发发发父爽肤水发顺丰法法发顺丰三发啊发</a>
              </div>
              <div class="num">
                已销售
                <span>12243431</span>张
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AlbumShop from '../Album/AlbumShop'
import Comment from '../Album/Comment'
export default {
  name: 'Album',
  components: {
    AlbumShop,
    Comment
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.InfoConent {
  width: 1100px;
  margin: 0 auto;

  //   头部导航分享
  .hearder {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 0 19px 0;
    font-size: 16px;
    font-weight: 600;
    color: #999999;
    line-height: 24px;
    border-bottom: 1px solid black;
    a {
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }

    .path {
      display: flex;
      .index {
        width: 36px;
        height: 24px;
        color: #333;
        font-size: 18px;
      }
      .name {
        width: 16px;
        height: 26px;
        margin: 0 4px 0 8px;
        background: url(./image/ar.png) no-repeat left center;
      }
    }
    .share {
      display: flex;
      align-items: center;
      i {
        width: 20px;
        height: 21px;
        margin-right: 11px;
        background: url(./image/share.png) no-repeat left center;
      }
      a {
        color: #666666;
      }
    }
  }

  //   专辑详情相关介绍 今日畅销
  .albumIntroduce-bestSeller {
    width: 1100px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    // 专辑详情相关介绍
    .albumIntroduce-content {
      width: 700px;
      // 专辑介绍
      .special-Intro {
        width: 100%;
        .hearder1 {
          width: 100%;
          border-bottom: 1px solid black;
          padding-bottom: 17px;
          padding-top: 10px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          & span:nth-child(1) {
            color: #333333;
            font-size: 22px;
            font-weight: bold;
          }
          & a {
            font-size: 16px;
            color: #999;
            font-weight: normal;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
        }
        // 专辑介绍文案
        .info {
          width: 100%;
          .title {
            height: 24px;
            margin-bottom: 12px;
            font-size: 16px;
            color: #333;
            font-weight: bold;
          }
          .text {
            width: 100%;
            font-size: 14px;
            color: #666666;
            width: 204px;
            overflow: hidden;
            &.active {
              height: 120px;
            }
            p {
              width: 100%;
              line-height: 24px;
            }
          }
          .all {
            display: block;
            width: 120px;
            margin: 0 auto;
            padding: 0 20px;
            line-height: 48px;
            text-align: center;
            color: #aeaeae;
            font-size: 14px;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
            i {
              display: inline-block;
              width: 11px;
              height: 6px;
              vertical-align: middle;
              background: url(./image/icon.png) no-repeat 0 9999px;
              background-position: -120px -216px;
            }
            &.active i {
              background-position: -118px -78px;
            }
          }
        }

        // 歌曲列表
        .songList {
          width: 100%;
          .title {
            line-height: 16px;
            padding-bottom: 11px;
            padding-top: 50px;
            font-size: 16px;
            font-weight: bold;
            color: #333;
          }
          .content {
            width: 100%;
            height: 70px;
            box-sizing: border-box;
            padding: 20px 0;
            display: flex;
            line-height: 70px;
            span {
              width: 28px;
              height: 70px;
              font-size: 15px;
              color: #999;
            }
            .songName {
              flex: 1;
              height: 70px;
              font-size: 16px;
              color: #333;
              border-bottom: 1px solid #f2f2f2;
            }
          }
        }

        // 今日粉丝榜累计粉丝榜
        .todayOrAllList {
          width: 100%;
          .title {
            width: 100%;
            margin-top: 90px;
            text-align: center;
            div {
              font-size: 0px;
              border: 1px solid #e5e5e5;
              display: inline-block;
              button {
                width: 110px;
                height: 28px;
                border: none;
                outline: none;
                font-size: 14px;
                color: #999;
                background-color: #fff;
                &.active {
                  background-color: #e5e5e5;
                  color: #333;
                }
              }
            }
          }
          .list {
            width: 100%;
            height: 493px;
            overflow: hidden;
            .item {
              width: 100%;
              padding: 20px 0;
              height: 117px;
              display: flex;
              align-items: center;
              position: relative;
              box-sizing: border-box;
              &::after {
                content: '';
                bottom: 0;
                left: 30px;
                position: absolute;
                width: 670px;
                height: 1px;
                background-color: #e5e5e5;
              }

              .index {
                font-size: 20px;
                width: 30px;
                color: #d33a31;
              }
              .image {
                position: relative;
                &::before {
                  content: '';
                  position: absolute;
                  overflow: hidden;
                  top: -19px;
                  left: 22px;
                  width: 29px;
                  height: 16px;
                  background: url(./image/icon.png) no-repeat 0 9999px;
                }
                img {
                  width: 70px;
                  height: 70px;
                  vertical-align: top;
                }
              }
              .name {
                flex: 1;

                margin-left: 15px;
                a {
                  font-size: 18px;
                  color: #333 !important;
                  font-weight: bold;
                }
              }
              .num {
                text-align: right;

                width: 70px;
                color: #999;
                font-size: 14px;
              }
            }
            .one {
              .image {
                border: 3px solid #d6aa34;
                &::before {
                  background-position: 0px -508px;
                }
              }
            }
            .two {
              .image {
                border: 3px solid #cccccc;
                &::before {
                  background-position: -80px -404px;
                }
              }
            }
            .three {
              .image {
                border: 3px solid #baa17b;
                &::before {
                  background-position: -40px -404px;
                }
              }
            }
            .surplus {
              width: 100%;
              display: flex;
              padding: 10px 0;
              align-items: center;
              position: relative;
              &::after {
                content: '';
                bottom: 0;
                left: 30px;
                position: absolute;
                width: 670px;
                height: 1px;
                background-color: #e5e5e5;
              }
              .index {
                font-size: 16px;
                width: 30px;
                color: #999;
              }
              img {
                width: 50px;
                width: 50px;
                vertical-align: top;
              }
              .name {
                flex: 1;
                margin-left: 15px;
                a {
                  font-size: 16px;
                  color: #333 !important;
                  font-weight: bold;
                }
              }
              .num {
                text-align: right;
                width: 70px;
                color: #999;
                font-size: 14px;
              }
            }
          }
          .list.active {
            height: 100%;
          }
          .all {
            display: block;
            width: 120px;
            margin: 0 auto;
            padding: 0 20px;
            line-height: 48px;
            text-align: center;
            color: #aeaeae;
            font-size: 14px;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
            i {
              display: inline-block;
              width: 11px;
              height: 6px;
              vertical-align: middle;
              background: url(./image/icon.png) no-repeat 0 9999px;
              background-position: -120px -216px;
            }
            &.active i {
              background-position: -118px -78px;
            }
          }
        }

        // 精彩评论
        // .comment {
        //   width: 100%;
        //   margin-top: 30px;
        //   margin-bottom: 30px;
        //   .title {
        //     width: 100%;
        //     font-size: 16px;
        //     font-weight: bold;
        //     color: #333;
        //   }
        //   .comment-nav {
        //     width: 100%;

        //     .list {
        //       width: 100%;
        //       padding: 15px 0;
        //       display: flex;
        //       border-bottom: 1px solid #cccccc;
        //       img {
        //         width: 50px;
        //         height: 50px;
        //         vertical-align: top;
        //         margin-right: 10px;
        //       }
        //       .info {
        //         flex: 1;
        //         p {
        //           a {
        //             color: #0c73c2 !important;
        //             margin-right: 7px;
        //           }
        //           width: 100%;
        //           font-size: 12px;
        //           color: #333;
        //           line-height: 24px;
        //         }
        //         .date {
        //           margin-top: 15px;
        //           width: 100%;
        //           color: #999;
        //           font-size: 12px;
        //           display: flex;
        //           align-items: center;
        //           justify-content: space-between;
        //           .fabulous {
        //             display: flex;
        //             align-items: center;
        //             cursor: pointer;
        //             color: #333333;
        //             &.active i {
        //               background-position: -78px -674px;
        //             }
        //             i {
        //               margin-right: 5px;
        //               width: 15px;
        //               height: 15px;
        //               display: inline-block;
        //               background: url(./image/icon.png) no-repeat 0 9999px;
        //               background-position: -26px -674px;
        //             }
        //           }
        //         }
        //       }
        //     }
        //   }
        //   .all {
        //     display: block;
        //     width: 120px;
        //     margin: 0 auto;
        //     padding: 0 20px;
        //     line-height: 48px;
        //     text-align: center;
        //     color: #aeaeae;
        //     font-size: 14px;
        //     cursor: pointer;
        //     &:hover {
        //       text-decoration: underline;
        //     }

        //     i {
        //       display: inline-block;
        //       width: 11px;
        //       height: 6px;
        //       vertical-align: middle;
        //       background: url(./image/icon.png) no-repeat 0 9999px;
        //       background-position: -120px -216px;
        //     }
        //     &.active i {
        //       background-position: -118px -78px;
        //     }
        //   }
        // }
      }
    }

    //   今日畅销
    .bestSeller {
      width: 340px;
      .hearder1 {
        width: 100%;
        margin-bottom: 20px;
        border-bottom: 1px solid black;
        padding-bottom: 17px;
        padding-top: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
          color: #333333;
          font-size: 22px;
          font-weight: normal;
        }
      }
      .content {
        width: 100%;
        height: 100px;
        .album {
          width: 100%;
          display: flex;
          margin-bottom: 30px;
          justify-content: space-between;
          .image {
            width: 100px;
            height: 100px;
            border: 1px solid rgba(0, 0, 0, 0.1);
            position: relative;
            cursor: pointer;
            &::before {
              content: '';
              position: absolute;
              top: 0;
              right: -17px;
              width: 17px;
              height: 100px;
              background-image: url(./image/cover_alb_100.png);
            }
            img {
              width: 100px;
              height: 100px;
            }
          }

          .info {
            width: 214px;
            margin-top: 20px;
            div {
              width: 100%;
              height: 24px;
              line-height: 24px;
              font-size: 14px;
              color: #333;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .num {
              width: 100%;
              color: #999;
              margin-top: 7px;
              cursor: default;
            }
          }
        }
      }
    }
  }
}
</style>