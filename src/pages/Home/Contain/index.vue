<template>
  <!-- 页面的主题内容 -->
  <div class="contain">
    <div class="contain-wrap">
      <!-- 首页推荐得两张图片 -->
      <div class="img-warp">
        <a href>
          <img src="../image/163img/ia_100000009.jpg" alt />
        </a>
        <a href>
          <img src="../image/163img/ia_100000010.jpg" alt />
        </a>
      </div>
      <!-- 编辑推荐部分 -->
      <div class="editorial-rmdations">
        <span class="rmd-text">编辑推荐</span>
        <div class="rmd-wrap">
          <div class="rmd-content">
            <ul id="pulic-spice">
              <li
                v-for="item in rmdComdList.hotProduct"
                :key="item.id"
                @click="handleProduct(item.productId)"
              >
                <a href="javascript:;" class="on">
                  <img :src="item.products.coverUrl" alt />
                  <div class="special-offe">
                    <span class="current-price">¥49</span>
                    <span class="old-price">
                      <del>¥99</del>
                    </span>
                  </div>
                </a>
                <!-- 文字描述 -->
                <div class="rmd-describe">
                  <h3>
                    <span>
                      <em>特价</em>
                    </span>
                    <a href>{{ item.name }}</a>
                  </h3>
                  <p>
                    <em>¥49</em>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 数字专辑部分 -->
      <router-link to="/albumList" style="text-decoration:none !important;">
        <div class="digital-album">
          <!-- 数字专辑左侧 -->
          <div class="album-left">
            <span>
              <i></i>
              数字专辑
            </span>
            <p class="buy">林俊杰孙燕姿数字单曲火热售卖中</p>
            <a href>立即购买 ></a>
          </div>
          <!-- 数字专辑右侧 -->
          <div class="album-right">
            <img src="../image/163img/ia_100000019.jpg" alt class="small" />
            <img src="../image/163img/ia_100000020.jpg" alt class="big" />
            <i></i>
          </div>
        </div>
      </router-link>
      <!-- 热门商品的部分 -->
      <div class="hot-goods" style="min-height: 816;">
        <span class="hot-sp">热门商品</span>
        <div class="goods-list">
          <ul id="pulic-spice">
            <li
              v-for="item in HotComdList.allProduct"
              :key="item.id"
              @click="handleProduct(item.id)"
            >
              <a href="javascript:;" class="on">
                <img :src="item.coverUrl" alt />
                <div class="special-offe">
                  <span class="current-price">¥{{ item.maxPrice }}</span>
                  <span class="old-price">
                    <del>¥{{ item.originalCost }}</del>
                  </span>
                </div>
              </a>
              <!-- 文字描述 -->
              <div class="rmd-describe">
                <h3>
                  <span>
                    <em>特价</em>
                  </span>
                  <a href>{{ item.name }}</a>
                </h3>
                <p>
                  <em>¥{{ item.minPrice }}</em>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="nav-right">
      <div class="nav-wrap">
        <div class="nav-item">
          <span>查看</span>
          营业执照
        </div>
        <div class="nav-item">
          <span>100%</span>
          正品
        </div>
        <div class="nav-item">
          <span>七天无理由退货</span>
        </div>
        <div class="nav-item" @click="toCart">
          <span>
            <i class="icon-carts"></i>
            <span>购物车</span>
          </span>
        </div>
        <div class="nav-item">
          <i class="icon-kefu"></i>
          <span>客服</span>
        </div>
        <div class="nav-item" id="top">
          <a href="#"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Contain",
  data() {
    return {
      productId: "",
    };
  },
  computed: {
    ...mapState({
      rmdComdList: (state) => state.home.rmdComdList,
      HotComdList: (state) => state.home.HotComdList,
    }),
  },
  methods: {
    handleProduct(id) {
      this.$router.replace({ path: "/detail", query: { id } });
    },
    toCart() {
      this.$router.replace("/cart");
    },
  },
  mounted() {
    this.$store.dispatch("getRmdComd");
    this.$store.dispatch("getHotComd");
  },
};
</script>

<style lang="less" scoped>
// 公共样式
#pulic-spice {
  margin-top: 20px;
  width: 100%;
  min-height: 816px;

  li {
    float: left;
    position: relative;
    width: 263px;
    height: 382px;
    // padding-right: 26px;
    margin-right: 12px;
    &:nth-child(5n-1) {
      margin-right: 0;
    }
    a {
      width: 263px;
      height: 263px;
      background-color: #f9f9f9;
      display: block;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .special-offe {
        position: absolute;
        width: 60px;
        height: 60px;
        top: 10px;
        left: 10px;
        background-color: #d33a31;
        border-radius: 50%;
        color: #fff;
        .current-price {
          display: block;
          position: absolute;
          top: 12px;
          left: 0;
          width: 100%;
          text-align: center;
          font-size: 15px;
        }
        .old-price {
          position: absolute;
          top: 30px;
          left: 0;
          width: 100%;
          text-align: center;
          font-size: 13px;
          opacity: 0.7;
        }
      }
    }
    .rmd-describe {
      text-align: center;
      margin-top: 10px;

      h3 {
        font-size: 14px;
        line-height: 18px;
        font-weight: normal;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        span {
          border: 1px solid #d74d45;
          box-sizing: border-box;
          line-height: 19px;
          padding: 0 3px;
          border-radius: 1px;
          color: #d74d45;
          font-size: 12px;
        }
        a {
          display: inline;
          color: #333;
        }
      }
      p {
        white-space: nowrap;
        color: #d33a31;
        margin-top: 4px;
        em {
          font-size: 16px;
        }
      }
    }
  }
  a {
    text-decoration: none;
  }
}
//<!-- 页面的主题内容 -->
.contain {
  overflow: hidden;
  width: 1100px;
  min-height: 750px;
  margin: 0 auto;
  background: #fff;
  padding-bottom: 160px;
  .contain-wrap {
    width: 100%;
    margin: 0;
    height: 100%;
    .img-warp {
      width: 100%;
      margin-top: 40px;
      display: flex;
      justify-content: space-between;
      a {
        display: block;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .editorial-rmdations {
      min-height: 816px;
      margin-top: 50px;
      width: 100%;
      height: auto;
      .rmd-text {
        font-weight: bold;
        font-size: 24px;
        color: #333;
      }
      // .rmd-wrap{
      //     .rmd-content{

      //     }
      // }
    }
    .digital-album {
      position: relative;
      width: 96%;
      height: 180px;
      margin-top: 10px;
      background-color: #e5e5e5;
      .album-left {
        width: 700px;
        margin: 0 20px 0 60px;
        height: 180px;
        span {
          display: block;
          padding-top: 28px;
          font-size: 32px;
          font-weight: bold;
          color: #000000;
          i {
            position: relative;
            top: 5px;
            margin-right: 10px;
            display: inline-block;
            width: 32px;
            height: 32px;
            background-image: url(../image/163img/ia_100000100.png);
          }
        }
        .buy {
          position: relative;
          margin-top: 9px;
          font-size: 16px;
          color: rgba(0, 0, 0, 0.7);
        }
        a {
          display: block;
          margin-top: 18px;
          font-size: 24px;
          font-weight: bold;
          color: #000000;
          text-decoration: none;
        }
      }
      .album-right {
        position: absolute;
        top: 30px;
        right: 50px;
        width: 210px;
        height: 120px;
        .small {
          position: absolute;
          top: 15px;
          left: 0;
          width: 100px;
          height: 100px;
        }
        .big {
          position: absolute;
          z-index: 99;
          top: 0;
          left: 60px;
          width: 120px;
          height: 120px;
        }
        i {
          position: absolute;
          top: 0;
          left: 175px;
          width: 35px;
          height: 120px;
          border: none;
          background-image: url(../image/163img/ia_100000101.png);
          background-position: 0px -73px;
        }
      }
    }
    .hot-goods {
      margin-top: 50px;
      width: 100%;
      height: 100%;
      .hot-sp {
        font-weight: bold;
        font-size: 24px;
      }
      .goods-list {
        height: 100%;
      }
    }
  }
  .nav-right {
    .nav-wrap {
      position: fixed;
      top: 50%;
      left: 50%;
      margin-top: -138px;
      margin-left: 570px;
      z-index: 98;
      width: 60px;
      height: auto;
      font-size: 12px;
      background: #fff;
      text-align: center;
      border: 1px solid rgba(0, 0, 0, 0.4);
      .nav-item {
        border-bottom: 1px solid #e5e5e5;
        height: 58px;
        border: 1px solid transparent;
        text-align: center;
        border-bottom: 1px solid #e5e5e5;
        span {
          .icon-carts {
            display: block;
            width: 20px;
            height: 20px;
            margin: 11px 0 5px 17px;
            background-position: 0px -71px;
            background-image: url(../image/totop.png);
          }

          &:nth-child(1) {
            display: block;
            margin-top: 13px;
            line-height: 1.5;
            color: #666666;
          }
        }
        .icon-kefu {
          display: block;
          width: 20px;
          height: 20px;
          margin: 11px 0 5px 19px;
          background-position: 0px -101px;
          background-image: url(../image/totop.png);
        }
      }
      #top {
        height: 35px;
        border: none;
        background-position: -70px -0px;
        background-image: url("../image/totop.png");
        a {
          display: block;
          width: 100%;
          height: 100%;
          text-decoration: none;
        }
      }
    }
  }
}
</style>
