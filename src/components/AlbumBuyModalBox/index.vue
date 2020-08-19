<template>
  <div class="ModalBox" v-if="isShowModalBox">
    <div class="title">
      <span>{{ !isConfirm ? "确认订单" : "网上支付提示" }}</span>
      <i @click="changeIsShowModalBox(false)"></i>
    </div>
    <!-- 支付商品列表 -->
    <div v-if="!isConfirm" class="content">
      <!-- 下单内容 -->
      <div class="nav">
        <img :src="buyInfo.picUrl" />
        <div class="info">
          <div>
            <span class="name">{{ buyInfo.name }}</span>
            <span class="price">￥{{ buyInfo.price }}</span>
          </div>
          <div>
            <span class="author">{{ buyInfo.singerName }}</span>
            <span class="num">
              x
              <i>{{ buyInfo.num ? buyInfo.num : 1 }}</i>
            </span>
          </div>
        </div>
      </div>

      <div class="allPrice clearFix">
        <div>
          需支付：
          <span
            >￥{{
              (buyInfo.num
                ? buyInfo.num * buyInfo.price
                : buyInfo.price / 1
              ).toFixed(2)
            }}</span
          >
        </div>
      </div>
      <!-- 支付方式 -->
      <div class="payment">
        <div>选择支付方式：</div>
        <div>
          <div
            @click="isWxZfb = true"
            :class="isWxZfb ? 'active' : ''"
            class="wx"
          ></div>
          <div
            @click="isWxZfb = false"
            :class="!isWxZfb ? 'active' : ''"
            class="zfb"
          ></div>
        </div>
        <div>
          <button @click="Pay" class="determine">确认支付</button>
          <button class="off" @click="changeIsShowModalBox(false)">取消</button>
        </div>
      </div>
    </div>
    <!-- 支付确认界面 -->
    <div v-else class="confirm">
      <div>请在新打开的支付宝页面完成支付,支付完成前请不要关闭该窗口</div>
      <div>
        若支付遇到问题，请联系
        <a href="javaScript:;">@云音乐客服</a>
      </div>
      <div class="btn">
        <button @click="payComplete">已经完成支付</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AlbumBuyModalBox",
  props: {
    buyInfo: Object,
    // 控制模态框是否显示
    isShowModalBox: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isWxZfb: true, // 支付宝支付还是微信支付
      isConfirm: false,
    };
  },
  methods: {
    changeIsShowModalBox(val) {
      this.isConfirm = false;
      this.$emit("update:isShowModalBox", val);
    },
    // 点击微信或支付宝支付
    Pay() {
      // 判断用户是否登录 没有登录跳转到登录界面
      const user_token = localStorage.getItem("user_token");
      if (!user_token) {
        this.$router.push("/login");
      } else {
        this.isConfirm = true;
        const buyInfo = this.buyInfo;
        const album = {
          attr: "",
          img: buyInfo.picUrl,
          name: buyInfo.name,
          num: buyInfo.num, // 商品数量
          price: buyInfo.price,
          status: 1, // 1被选中
        };
        if (this.isWxZfb) {
          // 微信支付直接跳转到我的订单界面(已经支付成功)
          console.log("支付成功");
          const boughtList = JSON.parse(
            sessionStorage.getItem("boughtList") || "[]"
          );
          const index = boughtList.findIndex(
            (item) => item.name === album.name
          );
          if (index === -1) {
            boughtList.push(album);
          } else {
            boughtList[index].num = boughtList[index].num / 1 + album.num;
          }
          sessionStorage.setItem("boughtList", JSON.stringify(boughtList));
        } else {
          // 支付宝支付直接跳转到订单详情界面(没有支付支付成功)
          console.log("支付失败");
          const goodList = JSON.parse(
            sessionStorage.getItem("goodList") || "[]"
          );
          const index = goodList.findIndex((item) => item.name === album.name);
          if (index === -1) {
            goodList.push(album);
          } else {
            goodList[index].num = goodList[index].num / 1 + album.num;
          }
          sessionStorage.setItem("goodList", JSON.stringify(goodList));
        }
      }
    },
    // 点击模态框已经支付完成按钮
    payComplete() {
      if (this.isWxZfb) {
        // 微信支付直接跳转到我的订单界面(已经支付成功)
        this.$router.push("/store/order");
        console.log("支付成功");
      } else {
        // 支付宝支付直接跳转到订单详情界面(没有支付支付成功)
        console.log("支付失败");
        this.$router.push("/cart");
      }
    },
  },
};
</script>
<style lang="less" scoped>
.clearFix::after,
.clearFix::before {
  content: "";
  clear: both;
  display: table;
}
.ModalBox {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -325px;
  transform: translateY(-60%);
  width: 650px;
  // height: 466px;
  // height: 297px;
  z-index: 10;
  background: #ffffff;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  .title {
    width: 100%;
    box-sizing: border-box;
    height: 60px;
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #666;
    font-weight: bold;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px 4px 0 0;
    background-color: #f6f6f6;
    padding: 0 20px;
    i {
      width: 18px;
      height: 18px;
      background: url("./image/chag.png");
    }
    span {
      flex: 1;
    }
  }
  .content {
    width: 100%;
    padding: 30px 20px 0 20px;
    box-sizing: border-box;
    .nav {
      width: 100%;
      display: flex;
      border: 1px solid #e5e5e5;
      img {
        width: 88px;
        height: 88px;
        vertical-align: top;
      }
      .info {
        padding: 20px 0 0 16px;
        flex: 1;
        width: 100%;

        div {
          display: flex;
          align-items: center;
          margin-right: 10px;
          &:nth-child(2) {
            margin-top: 10px;
          }
        }
        .name {
          font-size: 14px;
          color: #333;
          flex: 1;
        }
        .price {
          width: 95px;
          text-align: right;
          font-size: 18px;
          color: #333;
          font-weight: bold;
        }
        .author {
          flex: 1;
          font-size: 12px;
          color: #888888;
        }
        .num {
          width: 95px;
          text-align: right;
          color: #999999;
          font-size: 14px;
        }
      }
    }
    .allPrice {
      width: 100%;
      div {
        float: right;
        font-size: 18px;
        color: #666;
        margin-top: 20px;
        span {
          font-size: 28px;
          font-weight: bold;
          color: #cb3b3b;
        }
      }
    }
    .payment {
      width: 100%;
      margin-top: 20px;
      div:nth-child(1) {
        line-height: 34px;
        font-size: 14px;
        color: #333;
      }
      div:nth-child(2) {
        width: 100%;
        font-size: 0px;
        div {
          display: inline-block;
          width: 190px;
          height: 50px;
          cursor: pointer;
          background: url("./image/pay.png") no-repeat 0 9999px;
        }
        .wx {
          margin-right: 20px;
          background-position: 0px 0px;
          &.active {
            background-position: 0px -180px;
          }
        }
        .zfb {
          background-position: 0px -120px;
          &.active {
            background-position: 0px -300px;
          }
        }
      }
      div:nth-child(3) {
        width: 100%;
        margin-top: 20px;
        margin-bottom: 40px;
        button {
          cursor: pointer;
          border: none;
          outline: none;
          width: 142px;
          height: 42px;
          border: 1px solid;
          font-size: 16px;
        }
        .determine {
          margin-right: 20px;

          color: #ffffff;
          background-color: #d33a31;
          border-color: #cb3b3b;
        }
        .off {
          border-color: #d9d9d9;
          color: #666;
          background: transparent;
        }
      }
    }
  }
  .confirm {
    width: 100%;
    text-align: center;
    div:nth-child(1) {
      margin-top: 70px;
      line-height: 20px;
      color: #333;
      font-size: 16px;
    }
    div:nth-child(2) {
      padding-top: 16px;
      line-height: 20px;
      color: #999;
      font-size: 14px;
      // a {
      //   // color: #0c73c2 !important;
      // }
    }
    div:nth-child(3) {
      padding: 30px 0;

      button {
        width: 175px;
        height: 40px;
        border: none;
        outline: none;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: #d33a31;
        color: #fff;
        font-size: 16px;
      }
    }
  }
}
</style>
