<template>
  <!-- 专辑详情 -->
  <div class="InfoConent">
    <!-- 头部导航分享 -->
    <div class="hearder">
      <div class="path">
        <router-link to="/" class="index">首页</router-link>
        <!-- <a class="index">首页</a> -->
        <i class="name"></i>
        <span>{{ albumName }}</span>
      </div>
      <div class="share">
        <i></i>
        <a>分享</a>
      </div>
    </div>

    <!-- 专辑购买详情 -->
    <AlbumShop :saleNum="saleNum" :albumInfo="albumInfo" />

    <!-- 专辑详情相关介绍 今日畅销 -->
    <div class="albumIntroduce-bestSeller">
      <div class="albumIntroduce-content">
        <!-- 专辑介绍 -->
        <div class="special-Intro">
          <div class="hearder1">
            <span>数字专辑</span>
            <a>数字专辑购买须知</a>
          </div>

          <template v-for="item in 2">
            <a-skeleton
              v-if="isSkeleton"
              style="margin:10px 0"
              :key="item"
              active
              :paragraph="{ rows: 2 }"
            />
          </template>

          <!-- 专辑介绍文案 -->
          <div class="info" v-if="!isSkeleton">
            <div class="title">专辑介绍</div>
            <!-- 添加active 类 控制 是否全部显示 -->
            <div class="text" :class="isInfo ? '' : 'active'">
              <template v-for="(item, index) in albumInfo.product.descr">
                <p v-if="item.resource === '<br>'" :key="index">
                  <br />
                </p>
                <p v-else :key="index">{{ item.resource }}</p>
              </template>
            </div>
            <!-- div 添加 active类 控制图标 -->
            <div
              @click="isInfo = !isInfo"
              class="all"
              :class="isInfo ? 'active' : ''"
            >
              <span>{{ !isInfo ? "显示全部" : "收起" }}</span>
              <i></i>
            </div>
          </div>

          <!-- 歌曲列表 -->
          <div class="songList">
            <a-skeleton
              v-if="isSkeleton"
              style="margin-top:50px"
              active
              title
              :paragraph="{ rows: 1 }"
            />
            <div class="title" v-if="!isSkeleton">歌曲列表</div>

            <!-- g骨架屏 -->
            <template v-for="item in 5">
              <a-skeleton
                v-if="isSkeleton"
                style="margin:20px 0"
                :key="item"
                active
                title
                :paragraph="{ rows: 2 }"
              />
            </template>

            <template v-for="(item, index) in albumSongs">
              <div v-if="!isSkeleton" class="content" :key="item.songId">
                <span>{{ index + 1 }}</span>
                <div class="songName">
                  {{ item.simpleSongData.name }}
                  <span class="author" v-if="item.simpleSongData">{{
                    item.simpleSongData.alia[0]
                  }}</span>
                  <!-- <span class="btn">免费</span> -->

                  <button
                    @click="buySong(item)"
                    v-if="albumInfo.product"
                    class="shopBtn"
                  >
                    ￥{{ item.price }}
                  </button>
                </div>
              </div>
            </template>
          </div>

          <!-- 今日粉丝榜累计粉丝榜-->
          <div class="todayOrAllList">
            <div class="title">
              <div>
                <button
                  class="today"
                  :class="isTopDaily ? 'active' : ''"
                  @click="isTopDaily = true"
                >
                  今日粉丝榜
                </button>
                <button
                  class="cumulative"
                  :class="!isTopDaily ? 'active' : ''"
                  @click="isTopDaily = false"
                >
                  累计粉丝榜
                </button>
              </div>
            </div>
            <!-- 添加active类控制是否全部显示 -->
            <div
              class="list"
              v-if="albumFans.dailyList && albumFans.toplist"
              :class="isAllFans ? 'active' : ''"
            >
              <!-- 骨架屏 -->
              <a-skeleton
                v-if="isSkeleton"
                style="margin:40px 0  10px 0"
                active
                :avatar="{ shape: 'square', size: 70 }"
                title
                :paragraph="{ rows: 3 }"
              />
              <a-skeleton
                v-if="isSkeleton"
                style="margin:10px 0"
                active
                :avatar="{ shape: 'square', size: 70 }"
                title
                :paragraph="{ rows: 3 }"
              />
              <a-skeleton
                v-if="isSkeleton"
                style="margin:10px 0"
                active
                :avatar="{ shape: 'square', size: 70 }"
                title
                :paragraph="{ rows: 3 }"
              />

              <template v-if="!isSkeleton">
                <div class="one item" v-if="albumFans.dailyList.length > 1">
                  <span class="index">1</span>
                  <div class="image">
                    <img
                      v-lazy="
                        isTopDaily
                          ? albumFans.dailyList[0].avatarUrl
                          : albumFans.toplist[0].avatarUrl
                      "
                      alt
                    />
                  </div>
                  <div class="name">
                    <a href="javascript:;">{{
                      isTopDaily
                        ? albumFans.dailyList[0].nickname
                        : albumFans.toplist[0].nickname
                    }}</a>
                  </div>
                  <span class="num"
                    >{{
                      isTopDaily
                        ? albumFans.dailyList[0].quantity
                        : albumFans.toplist[0].quantity
                    }}张</span
                  >
                </div>
                <div class="two item" v-if="albumFans.dailyList.length > 1">
                  <span class="index">2</span>
                  <div class="image">
                    <img
                      v-lazy="
                        isTopDaily
                          ? albumFans.dailyList[1].avatarUrl
                          : albumFans.toplist[1].avatarUrl
                      "
                      alt
                    />
                  </div>
                  <div class="name">
                    <a href="javascript:;">{{
                      isTopDaily
                        ? albumFans.dailyList[1].nickname
                        : albumFans.toplist[1].nickname
                    }}</a>
                  </div>
                  <span class="num"
                    >{{
                      isTopDaily
                        ? albumFans.dailyList[1].quantity
                        : albumFans.toplist[1].quantity
                    }}张</span
                  >
                </div>
                <div class="three item" v-if="albumFans.dailyList.length > 2">
                  <span class="index">3</span>

                  <div class="image">
                    <img
                      v-lazy="
                        isTopDaily
                          ? albumFans.dailyList[2].avatarUrl
                          : albumFans.toplist[2].avatarUrl
                      "
                      alt
                    />
                  </div>
                  <div class="name">
                    <a href="javascript:;">{{
                      isTopDaily
                        ? albumFans.dailyList[2].nickname
                        : albumFans.toplist[2].nickname
                    }}</a>
                  </div>
                  <span class="num"
                    >{{
                      isTopDaily
                        ? albumFans.dailyList[2].quantity
                        : albumFans.toplist[2].quantity
                    }}张</span
                  >
                </div>
              </template>

              <!-- 骨架屏 -->
              <a-skeleton
                v-if="isSkeleton"
                style="margin:10px 0"
                active
                :avatar="{ shape: 'square', size: 50 }"
                title
                :paragraph="{ rows: 2 }"
              />
              <a-skeleton
                v-if="isSkeleton"
                style="margin:10px 0"
                active
                :avatar="{ shape: 'square', size: 50 }"
                title
                :paragraph="{ rows: 2 }"
              />

              <!-- 余下 -->
              <template
                v-for="(item, index) in isTopDaily
                  ? albumFans.dailyList
                  : albumFans.toplist"
              >
                <div
                  v-if="index > 2 && !isSkeleton"
                  class="surplus"
                  :key="item.userId"
                >
                  <span class="index">{{ index + 1 }}</span>
                  <div class="image">
                    <img v-lazy="item.avatarUrl" alt />
                  </div>
                  <div class="name">
                    <a href="javascript:;">{{ item.nickname }}</a>
                  </div>
                  <span class="num" v-if="item.quantity"
                    >{{ item.quantity }}张</span
                  >
                </div>
              </template>
            </div>
            <!-- div 添加 active类 控制图标 -->
            <div
              v-if="!isAllFans && !isSkeleton"
              @click="isAllFans = true"
              class="all"
              :class="isAllFans ? 'active' : ''"
            >
              <span>显示全部</span>
              <i></i>
            </div>
          </div>

          <!-- 精彩评论 -->
          <Comment
            @getAlbumComment="getAlbumComment"
            :albumId="albumId"
            :albumComments="albumComments"
            :isSkeleton="isSkeleton"
          />
        </div>
      </div>

      <!-- 今日畅销 -->
      <div class="bestSeller">
        <div class="hearder1">
          <span>今日畅销</span>
        </div>
        <template v-for="item in 5">
          <a-skeleton
            :key="item"
            v-if="isSkeleton"
            style="margin:20px 0  10px 0"
            active
            :avatar="{ shape: 'square', size: 100 }"
            title
            :paragraph="{ rows: 3 }"
          />
        </template>

        <div v-if="!isSkeleton" class="content">
          <div
            class="album"
            @click="toAlbumInfo(item)"
            v-for="item in albumBestSellers"
            :key="item.albumId"
          >
            <div class="image">
              <img v-lazy="item.coverUrl" alt />
            </div>
            <div class="info">
              <div class="name">
                <a href>{{ item.artistName }}</a>
              </div>
              <div class="num">
                已销售
                <span>{{ item.saleNum }}</span
                >张
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹出模态框 -->
    <AlbumBuyModalBox
      :isShowModalBox.sync="isShowModalBox"
      :buyInfo="buyInfo"
    />
  </div>
</template>
<script>
import AlbumShop from "../Album/AlbumShop";
import Comment from "../Album/Comment";
import AlbumBuyModalBox from "../../components/AlbumBuyModalBox";
import {
  resGetAlbumInfo,
  resGetAlbumSong,
  resGetAlbumComment,
  resGetAlbumFans,
  resGetAlbumBestSeller,
} from "../../api/album";
export default {
  name: "Album",
  components: {
    AlbumShop,
    Comment,
    AlbumBuyModalBox,
  },
  data() {
    return {
      albumName: "", // 专辑名称
      albumId: null, // 专辑id
      saleNum: "0", // 已卖数量
      price: "0",
      albumBestSellers: {}, // 今日畅销
      albumInfo: {
        product: [],
        album: [],
      }, // 专辑详情
      albumSongs: [], // 专辑歌曲列表
      albumComments: [], // 专辑评论列表
      albumFans: {}, // 专辑粉丝排行版列表
      isTopDaily: true, // true 显示今日 false 显示全部
      isAllFans: false, // 排行版是否全部显示
      isInfo: false, // 专辑文本信息是否全部显示
      isShowModalBox: false, // 控制下单模态框显示
      buyInfo: {}, // 下单物品数据
      isSkeleton: true,
    };
  },
  mounted() {
    const { albumName, albumId, saleNum } = this.$route.query;
    const {
      getAlbumBestSeller,
      getAlbumInfo,
      getAlbumSong,
      getAlbumComment,
      getAlbumFans,
    } = this;
    this.albumName = albumName;
    this.albumId = albumId;
    this.saleNum = saleNum;
    Promise.all([
      getAlbumBestSeller(),
      getAlbumInfo(albumId),
      getAlbumSong(albumId),
      getAlbumComment(albumId),
      getAlbumFans(albumId),
    ]).then((res) => {
      this.isSkeleton = false;
    });
    // 订阅一个事件 获取下单的数据
    this.$bus.$on("getBuyInfo", (val) => {
      this.buyInfo = val;
      this.isShowModalBox = true;
    });
  },
  beforeDestroy() {
    this.$bus.$off("getBuyInfo");
  },
  methods: {
    // 发送请求获取今日畅销
    async getAlbumBestSeller() {
      const result = await resGetAlbumBestSeller();
      if (result.code === 200) {
        this.albumBestSellers = result.products;
      } else {
        console.log("获取今日畅销数据失败");
      }
    },
    // 发送请求获取专辑的详情信息
    async getAlbumInfo(albumId) {
      const result = await resGetAlbumInfo({ albumId });

      if (result.code === 200) {
        this.albumInfo = result.data;
      } else {
        console.log(result.msg);
      }
    },
    // 发送请求获取专辑的歌曲信息
    async getAlbumSong(albumId) {
      const result = await resGetAlbumSong({ albumId });

      if (result.code === 200) {
        this.albumSongs = result.data.songs;
      } else {
        console.log(result.msg);
      }
    },
    // 发送请求获取专辑的评论信息
    async getAlbumComment(albumId) {
      const result = await resGetAlbumComment({ albumId });

      if (result.code === 200) {
        this.albumComments = result.data.datas;
      } else {
        console.log(result.msg);
      }
    },
    // 发送请求获取专辑的粉丝购买排行信息
    async getAlbumFans(albumId) {
      const result = await resGetAlbumFans({ albumId });

      if (result.code === 200) {
        this.albumFans = result.data;
      } else {
        console.log(result.msg);
      }
    },
    // 获取子组件中的专辑价格
    getPrice(value) {
      this.price = value;
    },
    // 歌曲列表下单
    buySong(item) {
      const object = {
        songId: item.songId,
        price: item.price,
        name: item.simpleSongData.name,
        singerName: item.simpleSongData.alia[0],
        picUrl: item.simpleSongData.al.picUrl,
      };
      this.buyInfo = object;
      this.isShowModalBox = true;
    },
    //
    toAlbumInfo(item) {
      this.$router.push({
        path: "/addAlbum",
        query: {
          albumId: item.albumId,
          albumName: item.albumName,
          saleNum: item.saleNum,
        },
      });
      // 强制刷新本页面
      history.go(0);
    },
  },
};
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
              overflow: hidden;
              font-size: 16px;
              color: #333;
              border-bottom: 1px solid #f2f2f2;
              .author {
                font-size: 12px;
                color: #aeaeae;
              }
              .btn {
                font-size: 14px;
                border: 1px solid #aeaeae;
                padding: 0 5px;
                margin-left: 5px;
              }
              .shopBtn {
                width: 95px;
                border: none;
                outline: none;
                height: 30px;
                margin-top: 20px;
                margin-left: 10px;
                line-height: 30px;
                font-size: 14px;
                background-color: #d33a31;
                color: #ffffff;
                float: right;
              }
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
                content: "";
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
                // width: 70px;
                // height: 70px;
                &::before {
                  content: "";
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
                  // color: #333 !important;
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
              .image {
                width: 50px;
                height: 50px;
              }
              &::after {
                content: "";
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
                  // color: #333 !important;
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
              content: "";
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
