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
                <li v-for="(item,index) in categoryList[1].value" 
                :key="item.id" v-if="index<=num"
                @click="handleNav(item.brandName)"
                >
                  <a href="javascript:;">{{item.brandName}}</a>
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
                <li v-for="(item,index) in categoryList[2].value" :key="item.id">
                  <a href="javascript:;">{{item.kindname}}</a>
                </li>
              </ul>
            </div>
            <div class="brand">
              <div class="title">价格</div>
              <ul class="brand-item" v-if="categoryList[0]">
                <li v-for="(item,index) in categoryList[0].value" :key="item.id">
                  <a href="javascript:;">{{item.end}}</a>
                </li>

                <li>
                  <span class="tex">自定义</span>
                  <span>
                    <input type="text" placeholder="¥" />
                  </span>
                  <span class="to">一</span>
                  <span>
                    <input type="text" placeholder="¥" />
                  </span>
                </li>
                <li>
                  <a href class="btn">确定</a>
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
              <a href>
                <em>价格低到高</em>
              </a>
            </li>
            <li class="iconfont">&#xe601;</li>
            <li>
              <a href>
                <em>价格高到低</em>
              </a>
            </li>
          </ul>
        </div>
        <!-- 商品列表 -->
        <ul class="commodities" v-if="productsList">
          <li v-for="(item,index) in productsList">
            <div class="cart-wrap">
              <a href class="cart-top">
                <img :src="item.coverUrl" alt />
              </a>
              <div class="cart-btm">
                <h3>
                  <a href>{{item.name}}</a>
                </h3>
                <p>¥{{item.minPrice}}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="pgt">
        <el-pagination
          class="msg-pagination-container"
          layout="prev, pager, next"
          :page-count="37"
          background
          :current-page="pageIndex"
          @current-change="handlepage"
        ></el-pagination>
      </div>
    </div>
    <div class="nav-right"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from 'axios'
export default {
  name: "IP",
  data() {
    return {
      num: 16,
      //分页器配置
      pageIndex: 1, //默认页码是第一页
      // pageSize: 11, //默认显示的条数
      //请求参数
      offset: 0,
      
      productsList:[]
    };
  },

  methods: {
    //重新发送请求的函数
    getProducts(){
        let pamas = new URLSearchParams()
      pamas.append("limit","60")
      pamas.append('offset',this.offset)
      pamas.append('category_1',this.$route.query.title)
      axios.post('/api/product/search',pamas).then((data)=>{
        console.log(data)
        this.productsList=data.data.products.splice(0,12)
      })
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
      this.getProducts()

      console.log(val);
    },
    handleNav(name){
      console.log(name)
    }
  },

  mounted() {
    
    this.getProducts()
    // export const reqProducts=(obj)=>ajax.post( `/product/search?limit=60&offset=${obj}&category_1=IP%E5%91%A8%E8%BE%B9`)
    this.$store.dispatch("getCategory");
    // this.$store.dispatch("getAllProduct", this.offset);
    console.log(this.$route.query)
    // this.$store.dispatch('getAllProduct',this.$route.query)
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.ip.categoryList,
      // productsList: (state) => state.ip.productsList,
    }),
  },
};
</script>

<style lang="less" scoped>
// 内容主题
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
      justify-content: space-between;
      li {
        position: relative;
        width: 263px;
        height: 382px;

        .cart-wrap {
          .cart-top {
            width: 263px;
            height: 263px;
            background-color: #f9f9f9;
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
.pgt{
  text-align: center;
}
// 悬浮固定菜单
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
          background-image: url(./image/totop.png);
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
        background-image: url(./image/totop.png);
      }
    }
    #top {
      height: 35px;
      border: none;
      background-position: -70px -0px;
      background-image: url("./image/totop.png");
      a {
        display: block;
        width: 100%;
        height: 100%;
        text-decoration: none;
      }
    }
  }
}
</style>
<style >
</style>

