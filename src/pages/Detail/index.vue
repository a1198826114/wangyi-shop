<template>
  <!-- 商品详情页 -->
  <div class="detail-container">
    <!-- 头部导航 -->
    <header class="header">
      <div class="left-nav">
        <a href="javascript:;">首页</a>
        <span>
          &nbsp;
          <img src="./image/ar.png" />
          &nbsp;{{ product.name }}
        </span>
      </div>
      <div class="share">分享</div>
    </header>
    <!-- 商品主要内容 -->
    <div class="main">
      <!-- 左侧放大镜区域 -->
      <div class="left-container">
        <img class="pic" v-lazy="showImage ? showImage : product.coverUrl" alt />
        <div class="imgBox" @mousemove="handleMove"></div>
        <div class="mask" ref="mask"></div>
        <div class="bigImgbox">
          <img :src="showImage ? showImage : product.coverUrl" ref="bigImg" alt />
        </div>
        <div class="swiper">
          <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide class="slide-item" v-for="(item, index) in product.picUrls" :key="index">
              <img
                :class="{ active: currentIndex === index }"
                @click="changeImg(index, item)"
                v-lazy="item"
                alt
              />
            </swiper-slide>
          </swiper>
        </div>
      </div>

      <!-- 右侧详细介绍 -->
      <div class="introduce">
        <h2 class="title">{{ product.name }}</h2>
        <p class="sell">{{ product.suggestWord }}</p>
        <div class="price" v-if="product.skus">¥{{ product.skus[0].spePrice }}</div>
        <div class="color" v-if="product.skus && product.skus[0].attrs.length">
          <div
            v-if="product.skus"
          >{{ product.skus[0].attrs.length && product.skus[0].attrs[0].attr }}:</div>
          <span
            :class="{ active: selectIndex === index }"
            @click="changeColor(index, item)"
            v-for="(item, index) in product.skus"
            :key="index"
          >{{ item.attrs.length && item.attrs[0].attrValue }}</span>
        </div>
        <div class="count">
          <div>数量:</div>
          <span class="mins" @click="changeNum(-1)">
            <i></i>
          </span>
          <span class="num">{{ num }}</span>
          <span class="plus" @click="changeNum(1)">
            <i></i>
          </span>
        </div>
        <div class="server">
          <div>服务:</div>
          <span>7天无理由退货</span>
          <span>15天无忧换货</span>
          <span>满119包邮</span>
          <span>商家发货</span>
          <span>网易自营</span>
        </div>
        <div class="btn">
          <button class="buy-btn" @click="toBuy">立即购买</button>
          <button class="addcart-btn" @click="toCart">
            <i></i> 加入购物车
          </button>
        </div>
      </div>
    </div>
    <!-- 商品细节介绍和其他热门商品 -->
    <div class="content">
      <!-- 商品细节介绍 -->
      <div class="detail" v-if="product.descr">
        <h2 class="detail-title">商品详情</h2>
        <div class="extra">
          <p>正品低价 品质保证</p>
          <p>春节期间可正常发货</p>
          <p>装箱清单：主机× 1，数据线× 1，说明书× 1，合格证× 1。</p>
          <p>新疆、西藏、湖北地区因物流原因暂时无法配送，敬请谅解。</p>
        </div>
        <div class="big-image" v-for="(item, index) in product.descr" :key="index">
          <img :src="item.resource" alt v-if="item.type === 2" />
        </div>
        <p class="explain">
          商品交易成功后会在2个工作日内由{{
          product.businessName
          }}发货，法定节假日顺延，请在确认商品完好后再签收。若存在质量问题，请务必在7天之内联系客服：
        </p>
        <p class="explain">·客服账号：私信 @云音乐客服</p>
        <p class="explain">·温馨提示：完整的包装、配件和保修卡是电子产品进行售后的基础，请务必查看齐全后签收并妥善保管。</p>
        <p class="explain">注：因质量问题而退/换货所产生的运费报销最高15元，且须提供运费支付凭据，可寄出平邮，不支持顺丰，不支持到付。</p>
      </div>
      <!-- 热门商品 -->
      <div class="hot">
        <h2 class="hot-title">热门商品</h2>
        <div class="hot-item" v-for="item in hotProduct" :key="item.id">
          <div class="item-image">
            <img :src="item.products.coverUrl" alt />
            <span class="spec" v-if="item.products.minPrice !== item.products.originalCost">
              <span class="origin">¥{{ item.products.minPrice }}</span>
              <span class="cut">¥{{ item.products.originalCost }}</span>
            </span>
          </div>
          <div class="item-title">
            <div class="item-intro">
              <span>特价</span>
              &nbsp;{{ item.products.name }}
            </div>
            <div class="item-price">¥{{ item.products.minPrice }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 引入节流函数
import throttle from "lodash/throttle";
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";

export default {
  name: "detail",
  data() {
    return {
      swiperOptions: {
        slidesPerView: 5,
        slidesPerGroup: 2,
        slideToClickedSlide: true,
      },
      product: {},
      hotProduct: [],
      currentIndex: 0,
      showImage: "",
      selectIndex: 0,
      num: 1,
      color: "",
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
    desc() {
      return this.product.descr.splice(this.product.descr.length - 3, 3);
    },
  },
  mounted() {
    const { id } = this.$route.query;
    this.$axios.get("/api/product/detail?id=" + id).then((response) => {
      this.product = response.data.product;
    }),
      this.$axios.get("/api/hotproduct_v2/gets").then((response) => {
        this.hotProduct = response.data.data.hotProduct;
      });
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  directives: {
    swiper: directive,
  },
  methods: {
    handleMove: throttle(function (e) {
      let { offsetX, offsetY } = e;
      let left = 0;
      let top = 0;
      left = offsetX - 110;
      top = offsetY - 110;
      left = left < 0 ? 0 : left > 220 ? 220 : left;
      top = top < 0 ? 0 : top > 220 ? 220 : top;
      let maskDiv = this.$refs.mask;
      maskDiv.style.left = left + "px";
      maskDiv.style.top = top + "px";
      let bigImgDiv = this.$refs.bigImg;
      bigImgDiv.style.left = -2 * left + "px";
      bigImgDiv.style.top = -2 * top + "px";
    }, 100),
    toCart() {
      if (this.product.skus[0].attrs.length && !this.color) {
        alert("请选择颜色");
        return;
      }
      this.toBuy();
      this.$axios
        .get(
          `/api/cart/product/add?goodId=${this.product.id}&skuId=${this.product.skus[0].id}&addNum=${this.num}`
        )
        .then((res) => {
          this.$router.push("/cart");
        });
    },
    changeImg(index, item) {
      this.currentIndex = index;
      this.showImage = item;
    },
    changeNum(value) {
      if (value < 0 && this.num === 1) return;
      this.num += value;
    },
    changeColor(index, item) {
      this.selectIndex = index;
      this.color = item.attrs[0].attrValue;
    },
    toBuy() {
      const goodInfo = {
        name: this.product.name,
        attr:
          (this.product.skus[0].attrs.length &&
            this.product.skus[0].attrs[0].attrValue) ||
          this.color,
        img: this.product.coverUrl,
        price: this.product.skus[0].spePrice,
        num: this.num,
        status: 1,
        type: 0,
      };
      const goodList = JSON.parse(sessionStorage.getItem("goodList")) || [];
      if (goodList.find((item) => item.name === goodInfo.name)) {
        goodList.find((item) => {
          if (item.name === goodInfo.name) item.num += this.num;
        });
      } else {
        goodList.push(goodInfo);
      }
      sessionStorage.setItem("goodList", JSON.stringify(goodList));

      this.$router.push("/store/order/confirm");
    },
  },
};
</script>
<style lang="less" scoped>
/* 商品详情容器 */
.detail-container {
  width: 1100px;
  height: 100%;
  margin: 0 auto;
}
/* 头部导航 */
.detail-container .header {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  height: 80px;
  padding: 30px 0 19px 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #333;
}
.left-nav a {
  cursor: pointer;
  text-decoration: none;
  color: #333;
}
.left-nav span {
  color: #999;
}
.detail-container .share {
  cursor: pointer;
  margin-top: 11px;
  font-size: 16px;
  text-indent: 27px;
  color: #666;
  background: url(./image/share.png) no-repeat;
}
/* 主要内容 */
.detail-container .main {
  display: flex;
  margin-top: 20px;
}
.left-container {
  position: relative;
}
.left-container .pic {
  width: 440px;
  height: 440px;
}
.left-container .imgBox {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 440px;
  height: 440px;
}
.left-container .mask {
  position: absolute;
  display: none;
  top: 0;
  left: 0;
  width: 220px;
  height: 220px;
  cursor: move;
  background: url(./image/mask.png) no-repeat;
}

.left-container .bigImgbox {
  overflow: hidden;
  z-index: 999;
  display: none;
  position: absolute;
  width: 540px;
  height: 540px;
  top: 0;
  left: 450px;
  background: #f9f9f9;
}

.left-container .bigImgbox img {
  position: absolute;
  top: 0px;
  width: 1060px;
  height: 1060px;
  border: 0;
}
.imgBox:hover ~ .mask,
.imgBox:hover ~ .bigImgbox {
  display: block;
}
.main .left-container .swiper {
  width: 440px;
  height: 80px;
  overflow: hidden;
  box-sizing: border-box;
}
.swiper-container {
  width: 520px;
}

.swiper .slide-item {
  width: 80px !important;
  height: 80px;
  margin-right: 10px;
  background: #f9f9f9;
}

.swiper .slide-item img {
  display: block;
  width: 80px;
  height: 80px;
  box-sizing: border-box;
  border: 2px solid #fff;
}
.swiper img.active {
  border-color: #d33a31;
}
/* 右侧详情介绍 */
.main .introduce {
  margin-left: 80px;
  font-size: 12px;
  color: #333;
}
.introduce .title {
  margin: 0;
  line-height: 34px;
  font-size: 24px;
}
.introduce .sell {
  font-size: 14px;
  margin-top: 8px;
  color: #999;
}
.introduce .price {
  margin: 20px 0;
  color: #d33a31;
  font-size: 30px;
}
.introduce .color {
  display: flex;
}
.color div {
  margin-right: 30px;
  height: 30px;
  line-height: 30px;
  color: #999;
}
.color span {
  box-sizing: border-box;
  height: 30px;
  margin-bottom: 10px;
  line-height: 27px;
  text-align: center;
  margin-right: 10px;
  padding: 0 20px;
  border: 1px solid #e5e5e5;
  background: #fff;
  cursor: pointer;
}
.color .active {
  border: 2px solid #d33a31;
}
.introduce .count {
  display: flex;
}
.count div {
  margin-right: 30px;
  height: 30px;
  line-height: 30px;
  color: #999;
}
.count .mins {
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
.count .num {
  box-sizing: border-box;
  width: 59px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: 1px solid #e5e5e5;
}
.count .plus {
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
.introduce .server {
  display: flex;
  margin-top: 20px;
}
.server div {
  margin-right: 30px;
  height: 30px;
  line-height: 30px;
  color: #999;
}
.server span {
  display: inline-block;
  position: relative;
  line-height: 30px;
  margin-right: 28px;
  color: #666;
}
.server span::after {
  content: "";
  position: absolute;
  top: 13px;
  left: -8px;
  width: 3px;
  height: 3px;
  border-radius: 100%;
  background-color: #d33a31;
}
.introduce .btn {
  margin-top: 30px;
}
.btn .buy-btn {
  border: none;
  outline: none;
  box-sizing: border-box;
  line-height: 47px;
  width: 170px;
  height: 50px;
  font-size: 18px;
  border: 2px solid #d33a31;
  color: #d33a31;
  background-color: white;
  margin-right: 10px;
  cursor: pointer;
}
.btn .addcart-btn {
  border: none;
  outline: none;
  width: 188px;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  background-color: #d33a31;
  text-align: center;
  color: #fff;
  cursor: pointer;
}
.addcart-btn i {
  display: inline-block;
  margin: -4px 6px 0 0;
  vertical-align: middle;
  width: 30px;
  height: 22px;
  background: url(./image/icon-sprit.png) no-repeat 0 9999px;
  background-position: -80px -324px;
}
.detail-container .content {
  display: flex;
  justify-content: space-between;
  margin-top: 66px;
}
/* 左侧商品细节介绍 */
.content .detail {
  width: 700px;
  font-size: 14px;
  color: #ff0000;
}
.detail .detail-title {
  height: 30px;
  line-height: 30px;
  padding-bottom: 17px;
  margin-bottom: 20px;
  border-bottom: 1px solid #000;
  font-size: 22px;
  color: #333;
}
.detail .extra {
  margin-bottom: 28px;
}
.detail .extra p {
  line-height: 18px;
  padding: 5px 0;
}

.detail .big-image img {
  width: 700px;
  vertical-align: top;
}

.detail .explain {
  color: #666;
  font-size: 14px;
  padding: 5px 0;
  margin: 0;
}
.detail .explain:first-of-type {
  margin-top: 28px;
}

/* 右侧热门商品列表 */
.content .hot {
  width: 340px;
  font-size: 12px;
  color: #333;
}
.hot .hot-title {
  height: 30px;
  line-height: 30px;
  padding-bottom: 17px;
  margin-bottom: 20px;
  border-bottom: 1px solid #000;
  font-size: 22px;
}
.hot .hot-item {
  display: flex;
  margin-bottom: 40px;
  cursor: pointer;
}
.hot-item .item-image {
  position: relative;
}
.hot-item .item-image img {
  width: 100px;
  height: 100px;
  margin-right: 10px;
}
.hot-item .item-image .spec {
  position: absolute;
  width: 40px;
  height: 40px;
  top: 10px;
  left: 10px;
  background-color: #d33a31;
  border-radius: 50%;
  color: #fff;
}
.item-image .spec .origin {
  position: absolute;
  top: 5px;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 13px;
}
.item-image .spec .cut {
  position: absolute;
  top: 18px;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 12px;
  opacity: 0.7;
  text-decoration: line-through;
}
.hot-item .item-title {
  margin-top: 10px;
  line-height: 24px;
  text-align: left;
  font-size: 14px;
}
.item-title .item-intro span {
  border: 1px solid #d74d45;
  overflow: hidden;
  box-sizing: border-box;
  line-height: 19px;
  padding: 0 3px;
  border-radius: 1px;
  color: #d74d45;
  font-size: 12px;
}
</style>
