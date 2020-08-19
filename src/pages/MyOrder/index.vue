<template>
  <div class="outer">
    <div class="inner">
      <!-- 订单确认 -->
      <div class="header">
        <span>首页</span>
        <em>></em>
        <i>我的订单</i>
      </div>
      <div class="content">
        <ul class="choose">
          <li class="myOrder active">我的订单</li>
          <li class="myAdress" @click="toMyAdress">我的收货地址</li>
        </ul>
        <div class="processWrapper">
          <div class="process">
            <div class="processStep">
              <span class="active">全部</span>
              <!-- <i></i>
              <span>待发货</span>
              <i></i>
              <span>待收货</span>
              <i></i>
              <span>全部</span>-->
            </div>
            <template v-if="isOrder">
              <div
                class="processShow"
                v-for="(item, index) in goodsList"
                :key="index"
              >
                <div class="processShowTitle">订单编号:68990156178</div>
                <div class="processContent">
                  <img class="orderImage" :src="item.img" />
                  <div class="goodInfo">
                    <div class="desc">{{ item.name }}</div>
                    <div class="property">{{ item.attr }}</div>
                  </div>
                  <div class="saleProperty">
                    <div class="sale">￥{{ item.price }}</div>
                    <div class="count">x {{ item.num }}</div>
                  </div>
                  <div class="totalMoney">
                    <div class="money">￥{{ item.num * item.price }}</div>
                    <div class="extraMoney">(含运费:￥0)</div>
                  </div>
                  <div class="endTime">查看物流详情</div>
                  <div class="payProcess">
                    <button>取消订单</button>
                    <!-- <a href>取消订单</a> -->
                  </div>
                </div>
              </div>
            </template>
            <div class="processHide" v-else>
              <div class="bigImg"></div>
              <span>您当前没有待支付的订单</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "order",
  data() {
    return {
      goodsList: [],
      isOrder: false,
    };
  },
  mounted() {
    const goodsList = JSON.parse(sessionStorage.getItem("boughtList"));
    if (goodsList) {
      this.isOrder = true;
      this.goodsList = goodsList;
    } else {
      this.isOrder = false;
    }
  },
  methods: {
    toMyAdress() {
      this.$router.push("/store/adress");
    },
  },
};
</script>
<style lang="less" scoped>
html,
body,
.outer {
  width: 100%;
}

.inner {
  width: 1100px;
  margin: 0 auto;
  .header {
    box-sizing: border-box;
    width: 100%;
    height: 79px;
    font-size: 18px;
    color: #999;
    padding-top: 30px;
    font-weight: bold;
    border-bottom: 1px solid #333;
    span {
      color: #333;
    }
  }
  .content {
    width: 100%;
    margin-top: 15px;
    display: flex;
    margin-right: 15px;
    .choose {
      width: 200px;
      margin-right: 15px;
      li {
        font-size: 16px;
        width: 200px;
        height: 50px;
        line-height: 50px;
        box-sizing: border-box;
        padding-left: 25px;
        position: relative;
        &:hover {
          font-weight: bold;
        }
        &.active {
          font-weight: bold;
          background-color: rgba(0, 0, 0, 0.04);
          &::before {
            content: "";
            width: 3px;
            background-color: #d33a31;
            height: 24px;
            display: inline-block;
            position: absolute;
            left: 0px;
            top: 13px;
          }
        }
      }
    }
    .processWrapper {
      width: 100%;
      margin-bottom: 200px;
      .process {
        width: 100%;
        .processStep {
          height: 50px;
          line-height: 50px;
          font-size: 16px;
          color: #999;
          span {
            position: relative;
            &:hover {
              color: black;
              font-weight: bold;
            }
            &.active {
              font-weight: bold;
              color: black;
            }
          }
          // i {
          //   display: inline-block;
          //   width: 3px;
          //   height: 3px;
          //   border-radius: 50%;
          //   background-color: #999;
          //   margin-bottom: 3px;
          //   margin-left: 12px;
          //   margin-right: 12px;
          // }
        }
        .processShow {
          width: 100%;
          margin-bottom: 25px;
          font-size: 14px;
          color: #999;
          border: 1px solid #eaeaea;
          // margin-bottom: 215px;
          .processShowTitle {
            box-sizing: border-box;
            padding-left: 20px;
            width: 100%;
            height: 40px;
            line-height: 40px;
            background-color: rgba(0, 0, 0, 0.04);
          }
          .processContent {
            width: 100%;
            height: 120px;
            display: flex;
            .orderImage {
              width: 80px;
              height: 80px;
              display: block;
              margin: 20px;
            }
            .goodInfo {
              width: 245px;
              .desc {
                margin-top: 38px;
                width: 100%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                color: #666;
              }
              .property {
                margin-top: 8px;
              }
            }
            .saleProperty {
              width: 128px;
              height: 120px;
              text-align: center;
              .sale {
                margin-top: 38px;
                color: #333;
              }
              .count {
                margin-top: 8px;
              }
            }
            .totalMoney {
              width: 125px;
              height: 120px;
              text-align: center;
              border-left: 1px solid rgb(234, 234, 234);
              border-right: 1px solid rgb(234, 234, 234);
              .money {
                margin-top: 38px;
                color: #333;
              }
              .extraMoney {
                margin-top: 8px;
              }
            }
            .endTime {
              color: #333;
              width: 125px;
              height: 120px;

              text-align: center;
              box-sizing: border-box;
              padding-top: 48px;
              border-right: 1px solid rgb(234, 234, 234);
              i {
                color: #d33a31;
              }
            }
            .payProcess {
              flex: 1;
              height: 120px;
              button {
                border: none;
                background-color: #d33a31;
                color: white;
                text-align: center;
                width: 97px;
                height: 30px;
                margin-left: 22px;
                margin-top: 40px;
              }
              a {
                display: inline-block;
                margin-left: 45px;
                margin-top: 5px;
                color: #999;
              }
            }
          }
        }
        .processHide {
          width: 100%;
          padding-top: 100px;
          height: 380px;
          font-size: 20px;
          box-sizing: border-box;
          color: #666;
          text-align: center;
          .bigImg {
            width: 95px;
            height: 107px;
            background-image: url("https://s2.music.126.net/store/web/img/order_empty.png?ad555f3f7db1f133450e5bcf26fb4544");
            margin: 0 auto;
            margin-bottom: 30px;
          }
        }
      }
    }
  }
}
</style>
