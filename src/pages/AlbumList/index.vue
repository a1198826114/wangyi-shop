<template>
  <div class="content">
    <!-- 数组专辑容器 -->
    <div class="digital-album">
      <h2>新碟上架</h2>
      <ul class="album-content">
        <!-- 仅仅测试这个地方使用编程式路由跳转 -->
        <template v-for="item in 8">
          <div :key="item" v-if="isSkeleton">
            <a-skeleton
              style="margin:20px 0  10px 0"
              active
              :avatar="{ shape: 'square', size: 208 }"
              title
              :paragraph="{ rows: 0 }"
            />
            <a-skeleton
              style="width:208px"
              active
              title
              :paragraph="{ rows: 3 }"
            />
          </div>
        </template>
        <template v-for="item in albumList">
          <li v-if="!isSkeleton" class="item" :key="item.albumId">
            <!-- 图片 -->
            <div class="item-img" @click="toAlbumInfo(item)">
              <img v-lazy="item.coverUrl" />
            </div>
            <h3 class="name">{{ item.albumName }}</h3>
            <div class="author">{{ item.artistName }}</div>
            <div class="price">
              ￥
              <span>{{ item.price }}</span>
            </div>
          </li>
        </template>
      </ul>
    </div>
    <!-- 排行版 -->
    <div class="ranking-board">
      <div class="nav">
        <div class="left">
          <span @click="changeIsAlbum(true)" :class="isAlbum ? 'active' : ''"
            >数字专辑榜</span
          >
          <i>|</i>
          <span @click="changeIsAlbum(false)" :class="!isAlbum ? 'active' : ''"
            >数字单曲榜</span
          >
        </div>
        <div class="right">
          <div
            class="item spot"
            @click="changeFlage(1)"
            :class="flage === 1 ? 'active' : ''"
          >
            <span>日榜</span>
          </div>

          <div
            class="item spot"
            @click="changeFlage(2)"
            :class="flage === 2 ? 'active' : ''"
          >
            <span>周榜</span>
          </div>

          <div
            class="item spot"
            @mouseenter="isYear = true"
            @mouseleave="isYear = false"
            @click="changeFlage(3)"
            :class="flage === 3 ? 'active' : ''"
          >
            <span>{{ year }}年榜</span>
            <i></i>
            <!-- ul这个隐藏请通过v-if -->
            <ul v-if="isYear">
              <li @click="getYearRanking(3)">
                {{ new Date().getFullYear() - 2 }}年榜
              </li>
              <li @click="getYearRanking(2)">
                {{ new Date().getFullYear() - 1 }}年榜
              </li>
              <li @click="getYearRanking(1)">
                {{ new Date().getFullYear() }}年榜
              </li>
            </ul>
          </div>

          <div
            class="item"
            @click="changeFlage(4)"
            :class="flage === 4 ? 'active' : ''"
          >
            <span>总榜</span>
          </div>
          <div class="rule">
            <i></i>
            <span>排行规则</span>
            <ul>
              <li>
                此榜单包含5首歌曲及以上的迷你专辑和完整专辑，按照售卖张数排名，专辑内单曲购买的数据不在统计范围，榜单30分钟更新一次。
              </li>
              <li>
                日榜：网易云音乐当日销售量最高的50张数字专辑，按照售卖张数排名，每日0点清空昨日数据，名次变化与昨日相比，榜单30分钟更新一次，只统计当前在售的数字专辑。
              </li>
              <li>
                周榜：网易云音乐本周销售量最高的50张数字专辑，按照售卖张数排名。名次变化与上周相比，榜单30分钟更新一次，只统计当前在售的数字专辑。
              </li>
              <li>
                年榜：网易云音乐所有数字专辑在当年度1月1日00:00—12月31日24:00所产生的销售量，只展示销售量排名最高的50张数字专辑，按照售卖张数排名，榜单30分钟更新一次。进入下一年度后，上个年度榜单会作为历史数据保留。
              </li>
              <li>
                总榜：网易云音乐销量最高的50张数字专辑，按照售卖张数排名，榜单30分钟更新一次。
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="nav-conent">
        <ul class="conent">
          <li class="title item">
            <div>名次</div>
            <div>专辑</div>
            <div>歌手</div>
            <div>销量</div>
          </li>
          <template v-for="item in 10">
            <a-skeleton
              v-if="isSkeleton1"
              style="margin:30px 30px ;width:1000px"
              :key="item"
              active
              :avatar="{ shape: 'square', size: 100 }"
              title
              :paragraph="{ rows: 4 }"
            />
          </template>

          <template v-if="!isSkeleton1">
            <li
              @click="toAlbumInfo(item)"
              class="item"
              v-for="(item, index) in isRanking ? ranking : yearRanking"
              :key="item.albumId"
            >
              <div class="index">
                <div class="number">
                  <span>{{ index + 1 }}</span>
                  <div>
                    <i
                      v-if="!item.newest && +item.rankIncr !== 0"
                      :class="item.rankIncr < 0 ? 'botom' : 'top'"
                      class="icon"
                    ></i>
                    <i :class="item.newest ? 'new' : ''">{{
                      item.newest
                        ? ""
                        : Math.abs(item.rankIncr) === 0
                        ? "- 0"
                        : Math.abs(item.rankIncr)
                    }}</i>
                  </div>
                </div>

                <div class="image">
                  <img v-lazy="item.coverUrl" />
                  <div></div>
                </div>
              </div>
              <div class="name">{{ item.albumName }}</div>
              <div class="singer">{{ item.artistName }}</div>
              <div class="num">
                <span>{{ item.saleNum }}</span
                >张
              </div>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { resGetYearedAlbumRanking } from "../../api/album";
import { GETALBUMLIST, GETALBUMRANKING } from "@/store/modules/mutation-type";
export default {
  name: "AlbumList",
  data() {
    return {
      isSkeleton: true,
      isSkeleton1: true,
      flage: 1, // 1日榜  2周榜 3年榜 4总榜
      isAlbum: true, // 显示 专辑榜单 还是 单曲榜单
      isYear: false, // 是否显示年榜的选择框
      isRanking: true, // 是否使用ranking计算属性
      yearRanking: [], // 往年排行数据
      year: new Date().getFullYear(),
      type: 1, // 榜单年份状态  1 本年 2 去年 3 前年
    };
  },
  mounted() {
    // 发送请求获取专辑列表
    // 发送请求获取专辑榜单
    Promise.all([
      this.$store.dispatch(GETALBUMLIST),
      this.$store.dispatch(GETALBUMRANKING),
    ]).then((res) => {
      this.isSkeleton = false;
      this.isSkeleton1 = false;
    });
  },
  computed: {
    ...mapState({
      albumList: (state) => state.album.albumList,
      albumRanking: (state) => state.album.albumRanking,
    }),
    // 计算页面排行榜渲染的数据
    ranking() {
      const { flage, isAlbum, albumRanking } = this;
      let arr = [];
      if (flage === 1) {
        arr = albumRanking.daily;
      }
      if (flage === 2) {
        arr = albumRanking.week;
      }
      if (flage === 3) {
        arr = albumRanking.year;
      }
      if (flage === 4) {
        arr = albumRanking.total;
      }
      console.log();
      if (arr === undefined) {
        return [];
      } else {
        return isAlbum ? arr[0] : arr[1];
      }
    },
  },
  methods: {
    // 切换显示专辑排行和单曲排行
    changeIsAlbum(isAlbum) {
      this.isAlbum = isAlbum;
      this.getYearRanking(this.type);
    },
    // 切换显示周日年总排行版
    changeFlage(flage) {
      this.flage = flage;
      if (flage !== 3) {
        this.isRanking = true;
        this.year = new Date().getFullYear();
      }
    },
    // 发送请求获取过头2年的年排行
    async getYearRanking(type) {
      this.type = type;
      if (type === 1) {
        this.year = new Date().getFullYear();
        this.isRanking = true;
        return;
      } else {
        this.isSkeleton1 = true;
        type === 2
          ? (this.year = new Date().getFullYear() - 1)
          : (this.year = new Date().getFullYear() - 2);
        this.isRanking = false;
        const result = await resGetYearedAlbumRanking({
          type,
          isAlbum: this.isAlbum,
        });
        if (result.code === 200) {
          this.yearRanking = result.products;
          this.isSkeleton1 = false;
        } else {
          console.log("获取往年榜单排行失败");
        }
      }
    },
    // 跳转到专辑详情页面
    toAlbumInfo(album) {
      console.log(album.saleNum);
      this.$router.push({
        path: "/addAlbum",
        query: {
          albumId: album.albumId,
          albumName: album.albumName,
          saleNum: album.saleNum,
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
.content {
  width: 1100px;
  //   overflow: hidden;
  height: 100%;
  margin: 0 auto;
  margin-bottom: 100px;
  background-color: #fff;
  //   数字专辑
  .digital-album {
    width: 100%;
    h2 {
      width: 100%;
      line-height: 24px;
      font-weight: 700;
      font-size: 24px;
      margin: 50px 0 20px;
    }
    .album-content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .item {
        width: 243px;
        text-align: center;
        font-size: 14px;
        margin-bottom: 50px;
        .item-img {
          cursor: pointer;
          width: 210px;
          height: 210px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          box-sizing: border-box;
          position: relative;

          &::before {
            content: "";
            position: absolute;
            right: -33px;
            top: 0;
            height: 210px;
            width: 33px;
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAABQCAYAAAApzERWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjFCMjlBQzRCQzEwRjExRTY4RTAxQzAxQjA4QUIxMzg3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjFCMjlBQzRDQzEwRjExRTY4RTAxQzAxQjA4QUIxMzg3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MUIyOUFDNDlDMTBGMTFFNjhFMDFDMDFCMDhBQjEzODciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MUIyOUFDNEFDMTBGMTFFNjhFMDFDMDFCMDhBQjEzODciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz52xVm+AAAEoElEQVR42uSYS2tkRRTH697udGK6Ow9jIhkdSTYiLgwq7sQH+AEEF4ObiCsXbnQlotkNBty4EoKbwQSiguAXEEQRVyq4cjlEdCLmYUhiOq++1/+vrHOp9CPdHVEQC4qcqq7/eZ9TdZPkee6uMlJ3xZFoPt6y910/wLJUPQj0XUmSlPuVyMHDaF3/x238LwFXVlbuvhJyfn7+26WlpScUlgc7xLR7OKampq6vrq7eGhsbe13r3b5VHR4edjMzM9Nra2vvaX2tb+Dp6amrVCpucnJyRuubmlN9AbMscycnJx4stZH4oWalJ1DDAUbyyMiIm56efkz7yz2BpVIpicHj4+Oo/aJ+e+FS4Pn5eV4ulykvDz4+PnbyMMt3NO/vCmw2mw6wbPRg1ozZ2Vkq5d2uQFqHgB4gyWls78TExDM683xH4NDQkJd0dnaWq5CdZgITPB1UfosibwNyGOcwgspprLK8fJ/+vNwGRJIOl4LKuQB5rHK1WuXcq5rVtgQQIDOVW6VivxJjUssbbc4RZy8l2JdrDSP/mzRytVqNs6/E9ZuafTqQRY7yQIstU+DrWj5dAM0+bIULUoP6ha1IDR6+caF1KO3Mq5nZh1SjsZMi0HhOc9TKCrVMaiYmlhRcKolpgIfr9Tqgpy7kKrYC0KHc7EMDy2M8HELzrFUHqsK9kIptZrfRqCsazJO+50hCurGxwQ9IbaKB2onFNBsdHfWn7ToUeF779wDKDw4OzmQ89mWoGuKUBEBOzQJEXZJf4xGSnKT0qRY7BqDRto+TaG4aD6fYYGrBOQQ9NzowLAo92DmfdjpgiW5MTG2AIeYP+EwJ+ucxTQxbaYBh3JtGTvDRjmjXiQ5jIgbmvWj3Vyr5az/txrmHxOrfv1iNa5/0H2nwmjOPXkZH6jZS28QBERMX05aGkcS9NN7MA5eQbgXdcgbyN1TN2KAGjaYGAUKHBDfakmCDQs5C+yhUJd2oy9Z9ip261LhN66CAEyQak9hegLaPVK4GjR/Tubk5HFdpNBrYkkYJXXg75LFXVefY/oGyyhcWFni25DpcorearXQ5sw81g7dvC7iNqnRupPhbBpXNvphGGv1V4+vimkMCboar2WQSjaaAj46OwHxhnTyVwc0OEjwDbA3hcupNIL8q7kdiY7EECK3eUtCAgpqfa3qxhTSCHkugQRkQNff39zn2yYX7MUgo0dGg1QJLZlto2O7w8PBnnf/yQlmhFget2skcedo0AQT5AeGNH0jeEVw+xkQqFiDs29nZ+V3Lj1pfHbGdqTExpwRp71O8ba8O6yvcGTAxh/B3e3v7F5271fbQ1UHLkoTbiSInEbhI9/b27GnW6NhzAFnADUQVCIgXP+vYrFCJGJpdOIu/m5ubfDq90bXLWbaYnVxjSi17iv102bMzs8uEK4wM2d3d/Vi/fXrpVwCXpbmet6pi9r323+z5+WDOIIkFuqO9lzRPegJRj6eI7NrS+m3Nnb6uANTb2tr6dXFx8TWt7wzyifTN8vLyo4N+Irn19fWHBLo2KJAubZ9FNXm33u/H9f/hU5dnUs3+gTAQMHhy8P91/Ov/XflTgAEAxNxpsKghb60AAAAASUVORK5CYII=");
            background-repeat: no-repeat;
            background-size: 27px 210px;
          }
          img {
            width: 100%;
            height: 100%;
            vertical-align: top;
          }
        }
        .name,
        .author,
        .price {
          width: 210px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .name {
          font-weight: 700px;
          margin-top: 12px;
        }
        .author {
          color: #666;
          line-height: 22px;
        }
        .price {
          color: #d33a31;
        }
      }
    }
  }
  //   排行榜
  .ranking-board {
    width: 100%;
    .nav {
      margin: 50px 0 30px 0;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      .left {
        display: flex;
        align-items: center;
        i {
          margin: 0 20px;
          font-size: 20px;
          color: rgba(0, 0, 0, 0.1);
        }
        span {
          font-weight: 700;
          font-size: 20px;
          color: #999;
          cursor: default;
        }
        span.active {
          font-size: 24px;
          color: #333;
        }
      }
      .right {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #999;
        font-weight: 700;
        height: 40px;
        .item {
          padding: 0 20px;
          box-sizing: border-box;
          height: 40px;
          line-height: 40px;
          position: relative;
          i {
            display: inline-block;
            width: 9px;
            height: 6px;
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAASCAYAAABFGc6jAAAAAXNSR0IArs4c6QAAAYRJREFUOBG9ld9KAlEQxn9qphRCZBRRQfQC3QXd9Fa9oFchQXVREHVhXRgVomhq5qp9Y3tMbXfTapubceffd87MN8dEDta6sD+AJWKQBLTScJFKwmFcIP65033IC+d/JKmrXccNZRgpD+pZyOh6K3EALkCpBbfD1h3DpX5U/xrIalptq6tbfcguZB/gSF8Z3/Rb1dmEQglerVDKVauBJ37XerAt2+gAzj+nHixC8QkaLm8EZIY3aIvzGhvrLuAnWqe80lzK47kTQOYQSlW9y2m3tMvziwqW2wKazgzcowNtsk41uvZ0Uti35VhukD90FhuwrLkZOcTQmcTTfhQeoRkU/aV1LkjRXe1XQ/u15WxRWqc51X6ErkgokBXVY9sUE5NiYj4KRAy7eYG7qJjAGY0n1PV8KEhMDRbzWUyw99P6LZCGONiDM2mRaVLM5vtE0miJbJ1LfYaeuF5RK3dkU/2h9NXWk3v93/jfkWomIKugd6QjctR19FUheRr+uVpWiaw+5nwH9iVashOrpwsAAAAASUVORK5CYII=);
            background-size: 9px 6px;
            margin-left: 15px;
          }
          &.spot::before {
            content: "";
            position: absolute;
            right: -2px;
            top: 19px;
            width: 4px;
            height: 4px;
            border-radius: 4px;
            background: #ccc;
          }
          &.spot::after {
            content: "";
            position: absolute;
            right: -1px;
            bottom: 8px;
            width: 2px;
            height: 6px;
            border-radius: 1px;
            background: #ccc;
          }
          & span:hover {
            color: black;
            cursor: pointer;
          }
          ul {
            cursor: pointer;
            width: 110px;
            height: 120px;
            box-sizing: border-box;
            position: absolute;
            top: 40px;
            left: 43px;
            z-index: 2;
            border-radius: 6px;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            text-align: center;
            font-size: 17px;
            color: white;
            font-weight: initial;
          }
          &.active span {
            color: #d33a31;
          }
        }
        .rule {
          display: flex;
          align-items: center;
          & span:hover + ul {
            height: 180px;
            border: 1px solid rgba(0, 0, 0, 0.1);
            box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
          }
          cursor: default;
          i {
            width: 16px;
            height: 16px;
            margin-right: 5px;
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAABPCAYAAADrwOU5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAvBJREFUeNrsl89vEkEUx99M19rgBQIl0AunHiApJwlnm3ioPTaRRCJtPOvVP8I/wtgaPJj0RIomDfAHYC81oYmeeigghcAFBGwZ9ztxG1wX9hdNVPgmw+wO+z773s57sztMqCKdRqMR1et12TqdDvX7fTm+srJCXq+XQqGQbJxzvSkxPbBWq1GlUiGPx0Nra2vk9/slCAK41WpRtVqlXq9HsViMwuGwMRDd2dmZ9Coej1MgEKBpajabdHp6Kj2NRqPEGPsdCK/a7TYlEglaXl4mKxoOh1Qul8nn80lvIa6FCc/swCBcCxvYgiGBmAB4hzAnwXK5nGyToLAFAywOOibA7JlNE2zBAIudnJwIzGQkEiE3Oj8/lxnAkWcAuhUYYCnILS3PjFQsFqnb7VIwGKRkMjnxOjDA4mZ33tzclH2j0SCDovpDXCO7lRYpR23iYboVGGBxlA5q063AkAsGflDoqM1Jk6KpVCpNrGswwMKDFipdFAoFMRgMhF3BBrZgQHKWsQSBjkJHwVuVtjjAVlvGbm/5mvkCO8tXAM1SnGYsbpKsMh1sERGyUbu4uLjJtV/HZKWZwuxCLcHsQC3DrEJtwaxAbcPMoI5g06D/eKX8n0DKvN4Vk8bQ65veRn+smN3w4Nk+sx2ykZdOpWheAGrkjf5mZh4r4xcaQR2FrIe6Dnka1Cjk8Wv0x4tangcgkhaf+fcM/uuqGVC0DVykzZykjdQgvbdBV+KQFLZzN/vms/bt6MjDfiqzJX6IggpYR49zxyEPU5nnTLB3SyRSGECP82Fq74UjoBDMw/jSwzvvD+RGDj3OR+ouwv2e93FGWPn+ntZuN23U/dpX12kzh4sD9rlaS+e/fRk/n4GHYv2vC1lJ52svuVCKb7dXP2mDT48u74/YFd41r+w/Q6LeiK6Pn3ysPcAAepyrGfXd8fKVzje2BF3vk6BVdeSS0dJu9lHwg5McvZnK9FF9QzU/VAd2stshx+vh4jW6ADrQTwEGAPeuEaBImwkfAAAAAElFTkSuQmCC);
            background-size: 16px auto;
          }
          span {
            color: #999;
            font-weight: normal;
            font-size: 12px;
          }
          ul {
            position: absolute;
            z-index: 1;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            height: 0;
            overflow: hidden;
            // height: 180px;
            top: 45px;
            left: -155px;
            line-height: 18px;
            padding: 0 20px;
            border-radius: 2px;
            background: #fff;
            font-size: 12px;
            font-weight: initial;
            color: #666;
            white-space: nowrap;
          }
        }
      }
    }
    // 排行版列表
    .nav-conent {
      width: 100%;
      .conent {
        width: 100%;
        border: 1px solid #e5e5e5;
        .item {
          height: 120px;
          // line-height: 100px;
          display: flex;
          align-items: center;
          padding: 10px 0;
          cursor: pointer;
          .index {
            width: 235px;
            height: 100%;
            display: flex;
            .number {
              width: 90px;
              height: 100%;
              text-align: center;
              box-sizing: border-box;
              padding-top: 25px;
              .icon {
                width: 7px;
                height: 7px;
                margin-right: 1px;
                display: inline-block;
                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAABPCAYAAADrwOU5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAvBJREFUeNrsl89vEkEUx99M19rgBQIl0AunHiApJwlnm3ioPTaRRCJtPOvVP8I/wtgaPJj0RIomDfAHYC81oYmeeigghcAFBGwZ9ztxG1wX9hdNVPgmw+wO+z773s57sztMqCKdRqMR1et12TqdDvX7fTm+srJCXq+XQqGQbJxzvSkxPbBWq1GlUiGPx0Nra2vk9/slCAK41WpRtVqlXq9HsViMwuGwMRDd2dmZ9Coej1MgEKBpajabdHp6Kj2NRqPEGPsdCK/a7TYlEglaXl4mKxoOh1Qul8nn80lvIa6FCc/swCBcCxvYgiGBmAB4hzAnwXK5nGyToLAFAywOOibA7JlNE2zBAIudnJwIzGQkEiE3Oj8/lxnAkWcAuhUYYCnILS3PjFQsFqnb7VIwGKRkMjnxOjDA4mZ33tzclH2j0SCDovpDXCO7lRYpR23iYboVGGBxlA5q063AkAsGflDoqM1Jk6KpVCpNrGswwMKDFipdFAoFMRgMhF3BBrZgQHKWsQSBjkJHwVuVtjjAVlvGbm/5mvkCO8tXAM1SnGYsbpKsMh1sERGyUbu4uLjJtV/HZKWZwuxCLcHsQC3DrEJtwaxAbcPMoI5g06D/eKX8n0DKvN4Vk8bQ65veRn+smN3w4Nk+sx2ykZdOpWheAGrkjf5mZh4r4xcaQR2FrIe6Dnka1Cjk8Wv0x4tangcgkhaf+fcM/uuqGVC0DVykzZykjdQgvbdBV+KQFLZzN/vms/bt6MjDfiqzJX6IggpYR49zxyEPU5nnTLB3SyRSGECP82Fq74UjoBDMw/jSwzvvD+RGDj3OR+ouwv2e93FGWPn+ntZuN23U/dpX12kzh4sD9rlaS+e/fRk/n4GHYv2vC1lJ52svuVCKb7dXP2mDT48u74/YFd41r+w/Q6LeiK6Pn3ysPcAAepyrGfXd8fKVzje2BF3vk6BVdeSS0dJu9lHwg5McvZnK9FF9QzU/VAd2stshx+vh4jW6ADrQTwEGAPeuEaBImwkfAAAAAElFTkSuQmCC)
                  no-repeat;
                background-size: 20px auto;
                &.top {
                  background-position: 0 -55px;
                }
                &.botom {
                  background-position: 0 -65px;
                }
              }
              .new {
                display: inline-block;
                width: 20px;
                height: 7px;
                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAABPCAYAAADrwOU5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAvBJREFUeNrsl89vEkEUx99M19rgBQIl0AunHiApJwlnm3ioPTaRRCJtPOvVP8I/wtgaPJj0RIomDfAHYC81oYmeeigghcAFBGwZ9ztxG1wX9hdNVPgmw+wO+z773s57sztMqCKdRqMR1et12TqdDvX7fTm+srJCXq+XQqGQbJxzvSkxPbBWq1GlUiGPx0Nra2vk9/slCAK41WpRtVqlXq9HsViMwuGwMRDd2dmZ9Coej1MgEKBpajabdHp6Kj2NRqPEGPsdCK/a7TYlEglaXl4mKxoOh1Qul8nn80lvIa6FCc/swCBcCxvYgiGBmAB4hzAnwXK5nGyToLAFAywOOibA7JlNE2zBAIudnJwIzGQkEiE3Oj8/lxnAkWcAuhUYYCnILS3PjFQsFqnb7VIwGKRkMjnxOjDA4mZ33tzclH2j0SCDovpDXCO7lRYpR23iYboVGGBxlA5q063AkAsGflDoqM1Jk6KpVCpNrGswwMKDFipdFAoFMRgMhF3BBrZgQHKWsQSBjkJHwVuVtjjAVlvGbm/5mvkCO8tXAM1SnGYsbpKsMh1sERGyUbu4uLjJtV/HZKWZwuxCLcHsQC3DrEJtwaxAbcPMoI5g06D/eKX8n0DKvN4Vk8bQ65veRn+smN3w4Nk+sx2ykZdOpWheAGrkjf5mZh4r4xcaQR2FrIe6Dnka1Cjk8Wv0x4tangcgkhaf+fcM/uuqGVC0DVykzZykjdQgvbdBV+KQFLZzN/vms/bt6MjDfiqzJX6IggpYR49zxyEPU5nnTLB3SyRSGECP82Fq74UjoBDMw/jSwzvvD+RGDj3OR+ouwv2e93FGWPn+ntZuN23U/dpX12kzh4sD9rlaS+e/fRk/n4GHYv2vC1lJ52svuVCKb7dXP2mDT48u74/YFd41r+w/Q6LeiK6Pn3ysPcAAepyrGfXd8fKVzje2BF3vk6BVdeSS0dJu9lHwg5McvZnK9FF9QzU/VAd2stshx+vh4jW6ADrQTwEGAPeuEaBImwkfAAAAAElFTkSuQmCC)
                  no-repeat;
                background-size: 20px auto;
                background-position: 0 -35px;
              }
              & > span {
                color: #d33a31;
                font-size: 24px;
              }
              div {
                height: 16px;
                line-height: 16px;
                font-size: 12px;
                color: #999;
              }
            }
            .image {
              width: 145px;
              height: 100%;
              display: flex;
              img {
                width: 100px;
                height: 100px;
                vertical-align: top;
              }
              div {
                width: 7px;
                height: 100px;
                background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAABQCAYAAAApzERWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjFCMjlBQzRCQzEwRjExRTY4RTAxQzAxQjA4QUIxMzg3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjFCMjlBQzRDQzEwRjExRTY4RTAxQzAxQjA4QUIxMzg3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MUIyOUFDNDlDMTBGMTFFNjhFMDFDMDFCMDhBQjEzODciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MUIyOUFDNEFDMTBGMTFFNjhFMDFDMDFCMDhBQjEzODciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz52xVm+AAAEoElEQVR42uSYS2tkRRTH697udGK6Ow9jIhkdSTYiLgwq7sQH+AEEF4ObiCsXbnQlotkNBty4EoKbwQSiguAXEEQRVyq4cjlEdCLmYUhiOq++1/+vrHOp9CPdHVEQC4qcqq7/eZ9TdZPkee6uMlJ3xZFoPt6y910/wLJUPQj0XUmSlPuVyMHDaF3/x238LwFXVlbuvhJyfn7+26WlpScUlgc7xLR7OKampq6vrq7eGhsbe13r3b5VHR4edjMzM9Nra2vvaX2tb+Dp6amrVCpucnJyRuubmlN9AbMscycnJx4stZH4oWalJ1DDAUbyyMiIm56efkz7yz2BpVIpicHj4+Oo/aJ+e+FS4Pn5eV4ulykvDz4+PnbyMMt3NO/vCmw2mw6wbPRg1ozZ2Vkq5d2uQFqHgB4gyWls78TExDM683xH4NDQkJd0dnaWq5CdZgITPB1UfosibwNyGOcwgspprLK8fJ/+vNwGRJIOl4LKuQB5rHK1WuXcq5rVtgQQIDOVW6VivxJjUssbbc4RZy8l2JdrDSP/mzRytVqNs6/E9ZuafTqQRY7yQIstU+DrWj5dAM0+bIULUoP6ha1IDR6+caF1KO3Mq5nZh1SjsZMi0HhOc9TKCrVMaiYmlhRcKolpgIfr9Tqgpy7kKrYC0KHc7EMDy2M8HELzrFUHqsK9kIptZrfRqCsazJO+50hCurGxwQ9IbaKB2onFNBsdHfWn7ToUeF779wDKDw4OzmQ89mWoGuKUBEBOzQJEXZJf4xGSnKT0qRY7BqDRto+TaG4aD6fYYGrBOQQ9NzowLAo92DmfdjpgiW5MTG2AIeYP+EwJ+ucxTQxbaYBh3JtGTvDRjmjXiQ5jIgbmvWj3Vyr5az/txrmHxOrfv1iNa5/0H2nwmjOPXkZH6jZS28QBERMX05aGkcS9NN7MA5eQbgXdcgbyN1TN2KAGjaYGAUKHBDfakmCDQs5C+yhUJd2oy9Z9ip261LhN66CAEyQak9hegLaPVK4GjR/Tubk5HFdpNBrYkkYJXXg75LFXVefY/oGyyhcWFni25DpcorearXQ5sw81g7dvC7iNqnRupPhbBpXNvphGGv1V4+vimkMCboar2WQSjaaAj46OwHxhnTyVwc0OEjwDbA3hcupNIL8q7kdiY7EECK3eUtCAgpqfa3qxhTSCHkugQRkQNff39zn2yYX7MUgo0dGg1QJLZlto2O7w8PBnnf/yQlmhFget2skcedo0AQT5AeGNH0jeEVw+xkQqFiDs29nZ+V3Lj1pfHbGdqTExpwRp71O8ba8O6yvcGTAxh/B3e3v7F5271fbQ1UHLkoTbiSInEbhI9/b27GnW6NhzAFnADUQVCIgXP+vYrFCJGJpdOIu/m5ubfDq90bXLWbaYnVxjSi17iv102bMzs8uEK4wM2d3d/Vi/fXrpVwCXpbmet6pi9r323+z5+WDOIIkFuqO9lzRPegJRj6eI7NrS+m3Nnb6uANTb2tr6dXFx8TWt7wzyifTN8vLyo4N+Irn19fWHBLo2KJAubZ9FNXm33u/H9f/hU5dnUs3+gTAQMHhy8P91/Ov/XflTgAEAxNxpsKghb60AAAAASUVORK5CYII=");
                background-size: auto 100px;
                background-repeat: no-repeat;
              }
            }
          }
          .name {
            width: 420px;
            color: #333333;
            font-size: 14px;
          }
          .singer {
            width: 236px;
            color: #333333;
            font-size: 14px;
          }
          .num {
            flex: 1;
            color: #999;
            font-size: 14px;
          }
          &:hover {
            background: #f4f4f4;
          }
        }
        .title {
          cursor: default;
          width: 100%;
          height: 39px;
          line-height: 39px;
          padding: 0;
          margin-bottom: 1px;
          background: #f4f4f4;
          color: #999;
          font-weight: 700;
          font-size: 14px;
          display: flex;
          & div:nth-child(1) {
            width: 90px;
            text-align: center;
          }
          & div:nth-child(2) {
            width: 420px;
            margin-left: 145px;
          }
          & div:nth-child(3) {
            width: 236px;
          }
          & div:nth-child(4) {
            flex: 1;
          }
        }
      }
    }
  }
}
</style>
