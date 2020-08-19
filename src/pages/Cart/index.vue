<template>
  <div>
    <!-- 购物车容器 -->
    <div class="cart-container">
      <h1 class="title">购物车</h1>
      <!-- 表头信息 -->
      <ul class="cart-info">
        <li class="check">
          <input type="checkbox" :checked="isAllSelected" @click="changeAllSelected" />
        </li>
        <li class="all">全选</li>
        <li class="good">商品</li>
        <li class="price">金额</li>
        <li class="count">数量</li>
        <li class="subtotal">小计</li>
        <li class="operation">操作</li>
      </ul>
      <!-- 购物车列表 -->
      <ul class="cart-table" v-if="cartInfo">
        <!-- 表头信息 -->
        <li class="cart-header">
          <div class="all-count">全部商品({{ cartInfo.length }})</div>
          <div class="right-item">
            <i></i>
            <span class="txt">
              {{
              totalPrice > 119
              ? '全场满¥119免运费'
              : `全场满¥119免运费(还差¥${119 - totalPrice})`
              }}
            </span>
            <span class="buy-more">
              {{
              totalPrice<119?'去凑单>':''
              }}
            </span>
          </div>
        </li>
        <!-- 商品信息 -->
        <li class="cart-item" v-for="(item, index) in cartInfo" :key="index">
          <div class="single-check">
            <input type="checkbox" :checked="item.status" @click="changeItemSelected(item)" />
          </div>
          <div class="good-image">
            <img :src="item.img" alt />
          </div>
          <div class="good-title">
            <p>{{ item.name }}</p>
            <span>{{item.attr}}</span>
          </div>
          <div class="single-price">¥{{ item.price }}</div>
          <div class="good-count">
            <span class="mins" @click="changeNum(-1, item)">
              <i></i>
            </span>
            <span class="num">{{ item.num }}</span>
            <span class="plus" @click="changeNum(1, item)">
              <i></i>
            </span>
          </div>
          <div class="subtotal">¥{{ item.price * item.num }}</div>
          <div class="del" @click="delItem(item, index)"></div>
        </li>

        <!-- 底部统计栏 -->
        <li class="cart-footer">
          <div class="check">
            <input type="checkbox" :checked="isAllSelected" @click="changeAllSelected" />
          </div>
          <div class="all-count">全选</div>
          <div class="selected">
            已选择
            <span>{{ isSelected }}</span> 件商品
          </div>
          <div class="dif">
            {{
            totalPrice > 119
            ? '已享受免运费 |'
            : `差${119 - totalPrice}元免运费 |`
            }}
          </div>
          <div class="total-price">
            合计 :
            <span>¥{{ totalPrice }}</span>
          </div>
          <button class="pay" @click="toBuy">结算</button>
        </li>
      </ul>
    </div>
    <!-- 编辑推荐部分 -->
    <div class="editorial-rmdations">
      <span class="rmd-text">热门推荐</span>
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
                  <a href>{{item.name}}</a>
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
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "cart",
  data() {
    return {
      cartInfo: [],
    };
  },
  computed: {
    totalPrice() {
      const res = this.cartInfo.reduce((pre, item) => {
        pre += item.price * item.num;
        return pre;
      }, 0);
      return res;
    },
    isAllSelected() {
      return this.cartInfo.length && this.cartInfo.every((item) => item.status);
    },
    isSelected() {
      return this.cartInfo.reduce((pre, item) => {
        if (item.status) pre += item.num;
        return pre;
      }, 0);
    },
    ...mapState({
      rmdComdList: (state) => state.home.rmdComdList,
    }),
  },
  mounted() {
    this.getCartInfo();
    this.$store.dispatch("getRmdComd");
  },
  methods: {
    getCartInfo() {
      this.$axios.get("/api/cart/product/getall").then(
        ({ data }) => {
          this.cartInfo =
            data.code === 200
              ? data.result.itemDatas
              : JSON.parse(sessionStorage.getItem("goodList"));
        },
        (e) => {
          alert(e.message || "请求错误");
        }
      );
    },
    changeNum(val, item) {
      if (val < 0 && item.num === 1) return;
      item.num += val;
    },
    changeItemSelected(item) {
      this.cartInfo.forEach((val) => {
        if (item === val) val.status = !val.status;
      });
    },
    delItem(item, index) {
      let param = new URLSearchParams();
      param.append("cartIds", item.cartId);
      this.$axios.post("/api/cart/product/delselect", param).then((res) => {
        this.$delete(this.cartInfo, index);
        sessionStorage.setItem("goodList", JSON.stringify(this.cartInfo));
      });

      this.getCartInfo();
    },
    changeAllSelected() {
      let flag = this.isAllSelected;
      this.cartInfo.forEach((item) => {
        item.status = !flag;
      });
    },
    toBuy() {
      const goodList = JSON.parse(sessionStorage.getItem("goodList")) || [];
      this.cartInfo.forEach((item) => {
        const goodInfo = {
          name: item.name,
          attr: item.attr,
          img: item.img,
          price: item.price,
          num: item.num,
          status: 1,
          type: 0,
        };
        if (goodList.find((item) => item.name === goodInfo.name)) {
          goodList.find((item) => {
            if (item.name === goodInfo.name) item.num += 1;
          });
        } else {
          goodList.push(goodInfo);
        }
      });
      if (goodList.length === 0) {
        this.$message({
          type: "error",
          message: "请添加购物商品",
        });
      } else {
        this.$router.push("/store/order/confirm");
      }
      sessionStorage.setItem("goodList", JSON.stringify(goodList));
    },
    handleProduct(id) {
      this.$router.replace({ path: "/detail", query: { id } });
    },
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
    padding-right: 16px;
    &:nth-child(4n-1) {
      padding-right: 0;
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
/* 购物车容器 */
.cart-container {
  width: 1100px;
  margin: 0 auto;
}
.cart-container .title {
  box-sizing: border-box;
  height: 74px;
  padding: 30px 0 19px 0;
  font-weight: 600;
  border-bottom: 1px solid #333;
  font-size: 18px;
}
/* 购物车商品统计 */
.cart-container .cart-info {
  list-style: none;
  display: flex;
  height: 66px;
  line-height: 66px;
  font-size: 14px;
  color: #999;
  text-align: left;
}
.cart-info .check {
  width: 60px;
  text-align: center;
}
.cart-info .check input {
  vertical-align: middle;
  width: 20px;
  height: 20px;
}
.cart-info .all {
  width: 100px;
  color: #333;
}
.cart-info .good {
  width: 404px;
}
.cart-info .price {
  width: 116px;
  text-align: center;
}
.cart-info .count {
  width: 108px;
  margin: 0 79px 0 42px;
  text-align: center;
}
.cart-info .subtotal {
  width: 110px;
  text-align: center;
}
.cart-container .cart-table {
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 14px;
  color: #333;
}
/* 表头信息 */
.cart-table .cart-header {
  display: flex;
  justify-content: space-between;
  height: 40px;
  line-height: 40px;
  background-color: #f4f4f4;
}
.cart-header .all-count {
  width: 404px;
  margin-left: 60px;
  color: #999;
}
.cart-header .right-item {
  margin-right: 20px;
}
.right-item i {
  display: inline-block;
  position: relative;
  top: 5px;
  width: 44px;
  height: 20px;
  background: url(./image/cart.png) no-repeat 0 9999px;
  background-position: 0px -36px;
  margin-right: 12px;
}
.right-item .txt {
  margin-right: 6px;
}
/* 商品信息 */
.cart-table .cart-item {
  display: flex;
  height: 117px;
}
.cart-item .single-check {
  width: 60px;
  line-height: 117px;
  text-align: center;
}
.single-check input {
  vertical-align: middle;
  width: 20px;
  height: 20px;
}
.cart-item .good-image {
  width: 80px;
  height: 80px;
  margin-top: 19px;
  background-color: #f5f5f5;
  margin-right: 20px;
}
.cart-item .good-image img {
  width: 80px;
  height: 80px;
}
.cart-item .good-title {
  margin: 38px 35px 0 0;
}
.good-title p {
  width: 340px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 8px;
}
.good-title span {
  color: #999;
}
.cart-item .single-price {
  width: 116px;
  height: 117px;
  line-height: 117px;
  text-align: center;
  margin-left: 30px;
}
.good-count {
  display: flex;
  position: relative;
  top: 46px;
  width: 133px;
  height: 26px;
  margin: -5px 49px 0 42px;
}
.good-count .mins {
  font-size: 20px;
  text-align: center;
  box-sizing: border-box;
  width: 34px;
  height: 30px;
  border: 1px solid #e5e5e5;
  border-right: none;
  cursor: pointer;
}
.mins i {
  opacity: 0.3;
  position: relative;
  left: 3px;
  top: 1px;
  display: block;
  width: 100%;
  height: 100%;
  background: url(./image/icon-sprit.png) no-repeat 0 9999px;
  background-position: -38px -534px;
  overflow: hidden;
}
.good-count .num {
  box-sizing: border-box;
  width: 59px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: 1px solid #e5e5e5;
}
.good-count .plus {
  font-size: 20px;
  text-align: center;
  box-sizing: border-box;
  width: 34px;
  height: 30px;
  border: 1px solid #e5e5e5;
  border-left: none;
  cursor: pointer;
}
.plus i {
  position: relative;
  left: 3px;
  top: 1px;
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url(./image/icon-sprit.png) no-repeat 0 9999px;
  background-position: 0px -534px;
}
.cart-item .subtotal {
  color: #d33a31;
  width: 116px;
  height: 117px;
  line-height: 117px;
  text-align: center;
}
.del {
  position: relative;
  z-index: 99;
  top: 5px;
  height: 10px;
  width: 10px;
  margin: 50px 60px 0 0;
  background: url(./image/cha.png);
  cursor: pointer;
}
/* 底部统计信息 */
.cart-table .cart-footer {
  display: flex;
  box-sizing: border-box;
  height: 50px;
  line-height: 50px;
  border-top: 1px solid #f2f2f2;
}
.cart-footer .check {
  width: 60px;
  text-align: center;
}
.check input {
  vertical-align: middle;
  width: 20px;
  height: 20px;
}
.cart-footer .all-count {
  width: 100px;
}
.cart-footer .selected {
  width: 404px;
  color: #999;
}
.selected span {
  color: #d33a31;
}
.cart-footer {
  position: relative;
}
.cart-footer .dif {
  margin-left: 130px;
  margin-right: 5px;
  color: #999;
}
.cart-footer .total-price {
  display: flex;
  align-items: center;
}
.cart-footer .total-price span {
  color: #d33a31;
  font-size: 20px;
  padding-bottom: 4px;
  margin-left: 12px;
}
.cart-footer .pay {
  position: absolute;
  right: 0;
  bottom: 0;
  border: none;
  outline: none;
  width: 160px;
  height: 49px;
  line-height: 50px;
  margin-left: 30px;
  font-size: 16px;
  background-color: #d33a31;
  color: #fff;
  text-align: center;
  cursor: pointer;
}
.editorial-rmdations {
  min-height: 816px;
  margin: 0 auto;
  margin-top: 50px;
  width: 1100px;
  height: auto;
}
.editorial-rmdations .rmd-text {
  display: block;
  width: 100%;
  border-bottom: 1px solid #333;
  font-weight: bold;
  font-size: 18px;
  line-height: 60px;
  color: #333;
}
</style>
