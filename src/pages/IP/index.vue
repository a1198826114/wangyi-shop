<template>
  <div>
    <!-- 中间内容容器 -->
    <div class="contain-wrap">
      <!-- 导航栏信息 -->
      <div class="nav">
        <div class="nav-warp">
          <span class="oneNav">
            <!-- <a href>首页</a> -->
            <router-link to="/">首页</router-link>
          </span>
          <span class="towNav">
            <i></i>
            IP周边
          </span>
        </div>
      </div>
      <!-- 品牌,分类,价格 -->
      <div class="menu">
        <div class="menu-fillter">
          <div class="menu-wrap">
            <div class="brand">
              <span class="title">品牌</span>
              <ul class="brand-item" v-if="categoryList[1]">
                <li
                  v-for="(item, index) in categoryList[1].value"
                  :key="item.id"
                  v-if="index <= num"
                  @click="handleNav(item.brandName)"
                >
                  <a
                    href="javascript:;"
                    @click="handcolor(index)"
                    :class="nowIndex === index ? 'active' : ''"
                    >{{ item.brandName }}</a
                  >
                </li>
              </ul>
              <a href="javascript:;" class="more" @click="handleBrand">
                更多
                <span class="iconfont">&#xe615;</span>
              </a>
            </div>
            <div class="brand">
              <div class="title">分类</div>
              <ul class="brand-item" v-if="categoryList[2]">
                <li
                  v-for="(item, index) in categoryList[2].value"
                  :key="item.id"
                  @click="handleNav1(item.kindname)"
                >
                  <a
                    href="javascript:;"
                    @click="handcolor1(index)"
                    :class="nowIndex1 === index ? 'active' : ''"
                    >{{ item.kindname }}</a
                  >
                </li>
              </ul>
            </div>
            <div class="brand">
              <div class="title">价格</div>
              <ul class="brand-item" v-if="categoryList[0]">
                <li
                  v-for="(item, index) in categoryList[0].value"
                  @click="handleNav2(item.begin, item.end)"
                  :key="item.id"
                >
                  <a
                    href="javascript:;"
                    @click="handcolor2(index)"
                    :class="nowIndex2 === index ? 'active' : ''"
                    >{{ item.begin }}~{{ item.end }}</a
                  >
                </li>
                <li>
                  <span class="tex">自定义</span>
                  <span>
                    <input
                      type="text"
                      placeholder="¥"
                      @input="inputFun"
                      ref="ref"
                    />
                  </span>
                  <span class="to">一</span>
                  <span>
                    <input
                      type="text"
                      placeholder="¥"
                      @input="inputFun1"
                      ref="ref1"
                    />
                  </span>
                </li>
                <li>
                  <a
                    href="javascript:;"
                    @click="handleToSearch"
                    :class="isOK ? 'btt' : 'btn'"
                    >确定</a
                  >
                </li>
                <li>
                  <a href="javascript:;" @click="handleReset">重置选项</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- 商品专辑排序 -->
      <div class="sort-wrap">
        <div class="product">
          <ul>
            <li>
              <a href>
                <em>综合</em>
              </a>
            </li>
            <li class="iconfont">&#xe602;</li>
            <li>
              <a href="javascript:;">
                <em @click="handpricedi">价格低到高</em>
              </a>
            </li>
            <li class="iconfont">&#xe601;</li>
            <li>
              <a href="javascript:;">
                <em @click="handpricegao">价格高到低</em>
              </a>
            </li>
          </ul>
        </div>
        <!-- 商品列表 -->
        <ul class="commodities">
          <li
            v-for="(item, index) in six.length > 0 ? six : productsList"
            :key="item.id"
            @click="handleProduct(item.id)"
          >
            <div class="cart-wrap">
              <a href="javascript:;" class="cart-top">
                <img :src="item.coverUrl" alt />
              </a>
              <div class="cart-btm">
                <h3>
                  <a href="javascript:;">{{ item.name }}</a>
                </h3>
                <p>¥{{ item.minPrice }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="pgt">
        <el-pagination
          class="msg-pagination-container"
          layout="prev, pager, next"
          :page-count="count"
          background
          :page-size="pageSize"
          :current-page="pageIndex"
          @current-change="handlepage"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "IP",
  data() {
    return {
      num: 16,
      // hide: true,
      //分页器配置
      pageIndex: 1, //默认页码是第一页
      pageSize: 12, //默认显示的条数

      //请求参数
      offset: 0,
      count: 37,
      nowIndex: -1,
      nowIndex1: -1,
      nowIndex2: -1,
      productsList: [],
      price: [],
      isOK: false,
      six: [],
    };
  },

  methods: {
    //重新发送请求的函数
    getProducts() {
      let pamas = new URLSearchParams();
      pamas.append("limit", "60");
      pamas.append("offset", this.offset);
      pamas.append("category_1", this.$route.query.title);
      axios.post("/api/product/search", pamas).then((data) => {
        // console.log(data);
        // this.six = data.data.products;
        this.productsList = data.data.products.slice(0, 12);

        console.log(this.productsList);
      });
    },
    //点击按钮显示隐藏更多品牌数据
    handleBrand() {
      if (this.num === 16) {
        this.num = 100;
      } else {
        this.num = 16;
      }
    },
    //分页的配置函数
    handlepage(val) {
      this.pageIndex = val;
      this.offset = 60 * (val - 1);
      this.getProducts();

      console.log(val);
    },
    // 品牌,分类,价格获取响应的数据
    handleNav(name) {
      console.log(name);
      let pamas = new URLSearchParams();
      pamas.append("limit", "60");
      pamas.append("offset", this.offset);
      pamas.append("brand", name);
      pamas.append("category_1", this.$route.query.title);
      axios.post("/api/product/search", pamas).then((data) => {
        console.log(data);
        // let total =
        // this.count=this.total/this.pageSize
        if (data.data.products) {
          this.productsList = data.data.products.splice(0, 12);
        } else {
          this.hide = false;
        }
      });
    },
    handleNav1(kindname) {
      let pamas = new URLSearchParams();
      pamas.append("limit", "60");
      pamas.append("offset", this.offset);
      pamas.append("brand", name);
      pamas.append("category_2", kindname);
      pamas.append("category_1", this.$route.query.title);
      axios.post("/api/product/search", pamas).then((data) => {
        console.log(data);
        // let total =
        // this.count=this.total/this.pageSize
        if (data.data.products) {
          this.productsList = data.data.products.splice(0, 12);
        } else {
          this.hide = false;
        }
      });
    },
    handleNav2(star, end) {
      let pamas = new URLSearchParams();
      pamas.append("limit", "60");
      pamas.append("offset", this.offset);
      pamas.append("price_from", star);
      pamas.append("price_to", end);
      pamas.append("category_1", this.$route.query.title);
      axios.post("/api/product/search", pamas).then((data) => {
        console.log(data);
        // let total =
        // this.count=this.total/this.pageSize
        if (data.data.products) {
          this.productsList = data.data.products.splice(0, 12);
        } else {
          this.hide = false;
        }
      });
    },
    // --------------------------------------
    // 选中品牌,分类,价格的样式函数
    handcolor(index) {
      this.nowIndex = index;
    },
    handcolor1(index) {
      this.nowIndex1 = index;
    },
    handcolor2(index) {
      this.nowIndex2 = index;
    },
    // -------------------------
    //重置选中的按钮
    handleReset() {
      history.go();
    },
    //价格从低到高排序的函数
    handpricedi() {
      this.productsList.sort((a, b) => {
        return a.minPrice - b.minPrice;
      });
    },
    //价格从高到低的函数
    handpricegao() {
      this.productsList.sort((a, b) => {
        return b.minPrice - a.minPrice;
      });
    },
    inputFun(e) {
      this.a = e.target.value;
      if (
        this.a.length > 0 &&
        (this.b === undefined ? "" : this.b.length > 0)
      ) {
        // console.log(e.target.value.length);
        this.isOK = true;
      } else {
        this.isOK = false;
      }
    },
    inputFun1(e) {
      this.b = e.target.value;
      // console.log(e.target.value, 1111111);
      // console.log(this.b.length, "cc");
      if (
        this.b.length > 0 &&
        (this.a === undefined ? "" : this.a.length > 0)
      ) {
        // console.log(this.a, this.b);
        // console.log(e.target.value.length);
        this.isOK = true;
      } else {
        this.isOK = false;
      }
    },
    handleToSearch() {
      const { a, b } = this;

      const res = this.productsList.filter((item) => {
        return item.minPrice >= this.a && item.minPrice <= this.b;
      });
      this.six = res;
      console.log(res);
      // console.log(this.$store)
    },

    // handleTo() {
    //   // let to =this.to
    //   // let form = this.from
    //   console.log(this.to);
    //   console.log(this.form);
    //   let pamas = new URLSearchParams();
    //   pamas.append("limit", "60");
    //   pamas.append("offset", this.offset);
    //   pamas.append("price_from", this.form);
    //   pamas.append("price_to", this.to);
    //   pamas.append("sort", "price_asc");
    //   pamas.append("category_1", this.$route.query.title);
    //   axios.post("/api/product/search", pamas).then((data) => {
    //     // console.log(data);
    //     return (this.productsList = data.data.products.splice(0, 12));
    //     console.log(this.productsList);
    //   });
    // },
    handleProduct(id) {
      this.$router.replace({ path: "/detail", query: { id } });
    },
  },

  mounted() {
    // 页面挂机完毕,直接获取默认数据

    this.getProducts();
    // export const reqProducts=(obj)=>ajax.post( `/product/search?limit=60&offset=${obj}&category_1=IP%E5%91%A8%E8%BE%B9`)
    this.$store.dispatch("getCategory");
    // this.$store.dispatch("getAllProduct", this.offset);
    // console.log(this.$route.query);
    // this.$store.dispatch('getAllProduct',this.$route.query)
  },

  computed: {
    ...mapState({
      categoryList: (state) => state.ip.categoryList,
      // productsList: (state) => state.ip.productsList,
    }),

    //自定义价格筛选数据的范围函数
  },
  watch: {},
};
</script>

<style lang="less" scoped>
// 内容主题
.active {
  background-color: #666666;
  color: white;
}
.btt {
  background-color: red;
  color: #fff;
  height: 20px;
  padding: 3px 13px;
  font-weight: 600;
  margin-right: 20px;
}
.contain-wrap {
  padding-bottom: 160px;
  width: 1100px;
  margin: 0 auto;
  background-color: #fff;
  .nav {
    margin-bottom: 30px;
    border: snow 1px #333;
    .nav-warp {
      padding: 30px 0 19px 0;
      font-size: 18px;
      font-weight: 600;
      .towNav {
        font-size: 16px;
        color: #999;
        i {
          position: relative;
          top: 7px;
          display: inline-block;
          width: 16px;
          height: 26px;
          margin: 0 4px 0 8px;
          background: url("./image/ar.png") no-repeat left center;
        }
      }
    }
  }
  .menu {
    width: 100%;
    margin: 20px auto 0 auto;
    .menu-fillter {
      width: 1098px;
      margin: 0 auto;
      border: 1px solid rgba(0, 0, 0, 0.1);
      font-size: 14px;
      text-align: center;
      .menu-wrap {
        color: #333;
        .brand {
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          overflow: hidden;
          .title {
            height: 44px;
            width: 80px;
            line-height: 44px;
            color: #999;
            font-weight: 600;
            float: left;
          }
          .brand-item {
            width: 938px;
            float: left;
            li {
              height: 44px;
              line-height: 44px;
              padding: 0 4px;
              float: left;
              a {
                height: 24px;
                padding: 3px 15px;
              }

              span {
                float: left;

                input {
                  width: 66px;
                  height: 20px;
                  font-size: 14px;
                  border: 2px solid rgba(0, 0, 0, 0.15);
                }
              }
              .to {
                padding: 0 4px;
              }
              .tex {
                padding: 0 10px 0 20px;
              }
              .btn {
                background-color: #ccc;
                color: #fff;
                height: 20px;
                padding: 3px 13px;
                font-weight: 600;
                margin-right: 20px;
                &:active {
                  background: red;
                  color: white;
                }
              }
            }
          }
          .more {
            float: left;
            width: 60px;
            padding-right: 20px;
            height: 24px;
            margin-top: 10px;
            text-decoration: none;
            &:hover {
              color: #333;
            }
            .iconfont {
              float: right;
              font-size: 6px;
            }
          }
        }

        .price {
          display: flex;
          .title {
            height: 44px;
            width: 80px;
            line-height: 44px;
            color: #999;
            font-weight: 600;
          }
          .brand-item {
            width: 938px;

            li {
              height: 44px;
              line-height: 44px;
              padding: 0 4px;
              float: left;
            }
          }
        }
      }
    }
  }
  .sort-wrap {
    width: 1100px;
    margin: 0 auto;
    .product {
      ul {
        height: 21px;
        margin: 30px 0 30px 0;
        font-size: 16px;
        li {
          float: left;
          padding-right: 16px;
        }
        .iconfont {
          color: red;
        }
      }
    }
    .commodities {
      margin-top: 20px;
      width: 100%;
      height: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;

      li {
        position: relative;
        width: 263px;
        height: 382px;
        margin-right: 12px;
        &:nth-child(5n-1) {
          margin-right: 0;
        }
        .cart-wrap {
          .cart-top {
            width: 263px;
            height: 263px;
            background-color: #f9f9f9;
            display: inline-block;
            img {
              width: 263px;
              height: 263px;
            }
          }
          .cart-btm {
            margin-top: 10px;
            text-align: center;
            h3 {
              font-size: 14px;
              line-height: 18px;
              font-weight: normal;
              color: #333;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
            }
            p {
              padding-top: 4px;
              font-size: 16px;
              color: #d33a31;
            }
          }
        }
      }
    }
  }
}
.pgt {
  text-align: center;
}
</style>
<style></style>
