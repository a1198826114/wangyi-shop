<template>
  <div class="outer">
    <div class="inner">
      <!-- 订单确认 -->
      <div class="header">
        <span>订单确认</span>
      </div>
      <div class="content">
        <!-- 收货信息 -->
        <div class="userInfo">
          <div class="userInfoTitle">
            <span>收货信息</span>
          </div>

          <div class="contactDetails">
            <div class="contactTop">
              <span>
                <i></i>
                <em>默认地址</em>
              </span>
              <a href="javascript:;" @click="modify(index)">修改</a>
            </div>
            <div class="contactBottom">
              <div class="bottomLeft">
                <div class="phone">
                  <span>
                    <em>收 货 人 :</em>
                    {{ userName }}
                  </span>
                  <span>
                    <em>联系方式 :</em>
                    {{ phone }}
                  </span>
                </div>
                <div class="adress">
                  <span>
                    <em>收货地址 :</em>
                    {{ local1Name + local2Name + local3Name + detailPlace }}
                  </span>
                </div>
              </div>
              <div class="bottomRight">
                <a href="javascript:;" @click="changeAdress">更换收货地址</a>
                <button @click="add()">新建地址</button>
              </div>
            </div>
          </div>
        </div>
        <!-- 商品信息 -->
        <div class="goodsInfo">
          <div class="goodsInfoTitle">
            <span class="goodInfo">商品信息</span>
            <span class="sale">金额</span>
            <span class="count">数量</span>
            <span class="total">小计</span>
          </div>
          <div
            class="goodsDetail"
            v-for="(item, index) in goodsList"
            :key="index"
          >
            <img class="goodPicture" :src="item.img" />
            <span class="desc">
              <em>{{ item.name }}</em>
              <i>{{ item.attr }}</i>
            </span>
            <span class="saleDeatil">￥{{ item.price }}</span>
            <span class="countDetail">{{ item.num }}</span>
            <span class="totalDetail">￥{{ item.price * item.num }}</span>
          </div>

          <div class="dealWrapper">
            <div class="deal">
              <div class="goodsAll">
                <span class="goodsAllLeft">商品合计:</span>
                <span class="goodsAllRight">￥{{ totalPrice }}</span>
              </div>
              <div class="roadPrice">
                <span class="roadPriceLeft">运费:</span>
                <span class="roadPriceRight">￥10</span>
              </div>
              <div class="factPay">
                <span class="factPayLeft">实付金额</span>
                <span class="factPayRight">￥{{ totalPrice + 10 }}</span>
              </div>
              <div class="sendOrder">
                <div class="sendOrderLeft">
                  <input type="checkbox" v-model="isSelected" />
                  <span>我同意云音乐商城购买协议</span>
                </div>
                <button @click="sendOrder" :class="{ active: isSelected }">
                  提交订单
                </button>
              </div>
              <div class="infoAll">
                <span>{{ userName }}&nbsp;&nbsp;&nbsp;</span>
                <span>{{ phone }}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>{{
                  local1Name + local2Name + local3Name + detailPlace
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 支付方式 -->
        <div class="payway" ref="show2">
          <div class="paywayTitle">
            选择支付方式
            <span @click="payShow">x</span>
          </div>
          <div class="paywayContent">
            <div class="paywayOrder">
              <em></em>
              <span>提交订单</span>
            </div>
            <div class="firstBuy">先购先得，请尽快支付</div>
            <div class="payTotal">
              支付金额:
              <em>￥</em>
              <i>{{ totalPrice + 10 }}</i>
            </div>
          </div>
          <div class="paywayFooter">
            <div class="weixin" @click="weixinPay"></div>
          </div>
        </div>
        <!-- 微信支付 -->
        <div class="saoMiao" ref="show3">
          <div class="saoMiaoTitle">
            微信支付
            <span @click="delweixinPay">x</span>
          </div>
          <div class="saoMiaoContent">
            <div class="saoMiaoLeft">
              <div class="picture1"></div>
              <div class="picture2Wrapper">
                <div class="picture2"></div>
              </div>
              <span>
                为避免系统自动取消订单，请在
                <em>{{ countTime }}</em
                >秒内完成支付
              </span>
            </div>
            <div class="saoMiaoRight"></div>
          </div>
        </div>
      </div>
      <div class="change" ref="show">
        <div class="changeTitle">修改收货地址</div>
        <div class="chageContent">
          <div class="getGoodPeople">
            <span>收&nbsp;&nbsp;货&nbsp;&nbsp;人</span>
            <input type="text" v-model="name" />
          </div>
          <div class="phoneNumber">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="80px"
              class="demo-ruleForm"
              hide-required-asterisk
            >
              <el-form-item label="手机号码" prop="phone" class="phoneWrapper">
                <el-input
                  class="rulePhone"
                  v-model="ruleForm.phone"
                  placeholder="请输入手机号码"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="changeArea">
            <span>收货地区</span>
            <el-select
              class="area"
              v-model="category1Id"
              @change="category1Changed"
            >
              <el-option
                :value="value.id"
                :label="value.locationName"
                v-for="(value, index) in categoryList1"
                :key="index"
              ></el-option>
            </el-select>
            <el-select
              class="area"
              v-model="category2Id"
              @change="category2Changed"
            >
              <el-option
                :label="value.locationName"
                :value="value.id"
                v-for="(value, index) in categoryList2"
                :key="index"
              ></el-option>
            </el-select>
            <el-select
              class="area"
              v-model="category3Id"
              @change="category3Changed"
            >
              <el-option
                :label="value.locationName"
                :value="value.id"
                v-for="(value, index) in categoryList3"
                :key="index"
              ></el-option>
            </el-select>
          </div>
          <div class="detailAdress">
            <span>详细地址</span>

            <textarea cols="30" rows="10" v-model="detailAdress"></textarea>
          </div>
          <div class="changeFooter">
            <button class="changeConfirm" @click="saveNewAdress">
              保存新地址
            </button>
            <button class="changeDelete" @click="delShow">取消</button>
          </div>
        </div>
      </div>
      <div class="exchange" ref="show1">
        <div class="exchangeTitle">更换收货地址</div>
        <div class="exchangeContent">
          <ul>
            <li
              v-for="(item, index) in userList"
              :key="index"
              :class="{ active: index === choosed }"
              @click="choose(index)"
            >
              <div>
                <em>收&nbsp;货&nbsp;人&nbsp;:</em>
                <span>{{ item.name }}</span>
              </div>
              <div>
                <em>联系方式 &nbsp;:</em>
                <span>{{ item.phone }}</span>
              </div>
              <div>
                <em>收货地址 &nbsp;:</em>
                <span>
                  {{
                    item.location1Name +
                      item.location2Name +
                      item.location3Name +
                      item.detailAdress
                  }}
                </span>
              </div>
            </li>
          </ul>
          <div class="exchangeFoot">
            <button class="exchangeConfirm" @click="confirmModify">确定</button>
            <button class="exchangeDelete" @click="delexchangeDelete">
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqPlace } from "../../api/index";

export default {
  name: "orderConfirm",
  data() {
    return {
      countTime: 15,
      totalPrice: 0,
      goodsList: [],
      isSelected: false,
      newOrSave: false,
      choosed: -1,
      index: -1,
      name: "",
      userName: "",
      phone: "",
      userList: [],
      detailAdress: "",
      location1Name: "",
      location2Name: "",
      location3Name: "",
      local1Name: "",
      local2Name: "",
      local3Name: "",
      detailPlace: "",
      category1Id: null,
      category2Id: null,
      category3Id: null,
      categoryList1: [],
      categoryList2: [],
      categoryList3: [],
      ruleForm: {
        phone: "",
      },
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "请输入11位手机号",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  mounted() {
    const userArray = JSON.parse(localStorage.getItem("user-info"));
    if (!userArray) {
      this.$router.push("/store/adress");
      return;
    }
    const goodsList = JSON.parse(sessionStorage.getItem("goodList"));
    this.goodsList = goodsList;

    const defaultConfig = userArray.find((item) => item.setdefault);
    this.phone = defaultConfig.phone;
    this.userName = defaultConfig.name;
    this.local1Name = defaultConfig.location1Name;
    this.local2Name = defaultConfig.location2Name;
    this.local3Name = defaultConfig.location3Name;
    this.detailPlace = defaultConfig.detailAdress;
    this.totalPrice = goodsList.reduce(
      (prev, cur) => prev + cur.price * cur.num,
      0
    );
  },
  methods: {
    //取消微信支付
    delweixinPay() {
      this.$refs.show2.style.display = "none";
      this.$refs.show3.style.display = "none";
    },
    payShow() {
      this.$refs.show2.style.display = "none";
    },
    //点击进行支付
    weixinPay() {
      this.$refs.show3.style.display = "block";
      const that = this;
      var maxtime = 15; //
      function CountDown() {
        if (maxtime >= 0) {
          var seconds = Math.floor(maxtime % 60);
          that.countTime = seconds;
          maxtime--;
        } else {
          clearInterval(timer);
          that.$message({
            type: "success",
            message: "支付成功",
          });
          const newArray1 = JSON.parse(sessionStorage.getItem("goodList"));
          const newArray2 = JSON.parse(sessionStorage.getItem("boughtList"));
          console.log(newArray1);
          console.log(newArray2);
          const newArray3 = [...newArray2, ...newArray1];
          console.log(newArray3);
          sessionStorage.setItem("boughtList", JSON.stringify(newArray3));
          that.$router.push("/store/order");
        }
      }
      var timer = setInterval(CountDown, 1000);
    },
    //提交订单
    sendOrder() {
      if (!this.isSelected) return;
      this.$refs.show2.style.display = "block";
    },
    //点击确定修改样式
    confirmModify() {
      const userArray = JSON.parse(localStorage.getItem("user-info"));
      this.local1Name = userArray[this.choosed].location1Name;
      this.local2Name = userArray[this.choosed].location2Name;
      this.local3Name = userArray[this.choosed].location3Name;
      this.detailPlace = userArray[this.choosed].detailAdress;
      this.phone = userArray[this.choosed].phone;
      this.userName = userArray[this.choosed].name;
      this.$refs.show1.style.display = "none";
    },
    //点击切换样式样式
    choose(index) {
      this.choosed = index;
    },
    //更换收货地址
    changeAdress() {
      this.$refs.show1.style.display = "block";
      const userArray = JSON.parse(localStorage.getItem("user-info"));
      this.userList = userArray;
    },
    //点击新增
    add() {
      this.newOrSave = true;
      this.$refs.show.style.display = "block";
      this.publicMethods();
    },
    //点击修改
    modify(index) {
      this.index = index;
      this.$refs.show.style.display = "block";
      this.publicMethods();
    },
    async publicMethods() {
      const { data } = await reqPlace();
      this.id = data.id;
      this.categoryList1 = data.data[1];
      this.categoryList2 = data.data[2];
      this.categoryList3 = data.data[3];
    },
    async category1Changed(id) {
      const res = this.categoryList1.find((item) => item.id === id);
      this.location1Name = res.locationName;
      this.categoryList2 = [];
      this.categoryList3 = [];
      this.category2Id = null;
      this.category3Id = null;
      await this.$store.dispatch("category2Id", id);
      this.categoryList2 = this.$store.state.category.categoryList2;
      // console.log(this.$store.state.category.);
    },

    // 切换2级类别
    async category2Changed(id) {
      const res = this.categoryList2.find((item) => item.id === id);
      this.location2Name = res.locationName;
      this.categoryList3 = [];
      this.category3Id = null;
      await this.$store.dispatch("category3Id", id);
      this.categoryList3 = this.$store.state.category.categoryList3;
    },
    category3Changed(id) {
      this.id = id;
      const res = this.categoryList3.find((item) => item.id === id);
      this.location3Name = res.locationName;
    },

    //保存新地址
    saveNewAdress() {
      const id = localStorage.getItem("user_id");

      const adressConfig = {
        name: this.name,
        phone: this.ruleForm.phone,
        detailAdress: this.detailAdress,
        setdefault: true, //新添加的默认为默认地址
        id,
        addressId: this.category3Id,
        location1Name: this.location1Name,
        location2Name: this.location2Name,
        location3Name: this.location3Name,
      };

      if (
        adressConfig.name &&
        adressConfig.phone &&
        adressConfig.detailAdress &&
        adressConfig.addressId
      ) {
        const userArray = JSON.parse(localStorage.getItem("user-info")) || [];
        if (this.newOrSave) {
          userArray.forEach((item) => (item.setdefault = false));
          //添加地址
          userArray.push(adressConfig);

          localStorage.setItem("user-info", JSON.stringify(userArray));
          this.$message({
            message: "添加地址成功",
            type: "success",
          });
          history.go(0); //刷新页面并读取缓存数据
        } else {
          //修改地址

          userArray.splice(this.index, 1, adressConfig);
          localStorage.setItem("user-info", JSON.stringify(userArray));
          this.$message({
            message: "修改地址成功",
            type: "success",
          });
          history.go(0); //刷新页面并读取缓存数据
        }
      } else {
        this.$message({
          message: "请添加完整信息",
          type: "error",
        });
      }
    },
    //点击取消隐藏界面
    delShow() {
      this.$refs.show.style.display = "none";
    },
    delexchangeDelete() {
      this.$refs.show1.style.display = "none";
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
  position: relative;
  .header {
    width: 100%;
    height: 73px;
    font-size: 18px;
    color: #333;
    line-height: 73px;
    font-weight: bold;
    border-bottom: 1px solid #333;
  }
  .content {
    width: 100%;
    position: relative;
    // height: 1000px;
    margin-top: 15px;
    margin-bottom: 100px;
    // 收货信息
    .userInfo {
      width: 100%;
      height: 195px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      font-size: 14px;
      box-sizing: border-box;
      .userInfoTitle {
        width: 100%;
        height: 40px;
        background-color: rgb(244, 244, 244);
        color: #999;
        span {
          line-height: 40px;
          margin-left: 20px;
        }
      }
      .contactDetails {
        width: 100%;
        padding-left: 30px;
        box-sizing: border-box;
        .contactTop {
          width: 100%;
          height: 26px;
          box-sizing: border-box;
          padding-top: 25px;
          color: #999;
          margin-bottom: 45px;
          i {
            display: inline-block;
            width: 16px;
            height: 20px;
            background-image: url("./images/dinwei.png");
            vertical-align: bottom;
            margin-right: 5px;
          }
          a {
            margin-left: 20px;
            padding: 4px 17px;
            font-size: 12px;
            border: 1px solid rgba(0, 0, 0, 0.1);
          }
        }
        .contactBottom {
          display: flex;
          .bottomLeft {
            width: 80%;
            .phone {
              margin-bottom: 10px;
              span {
                margin-right: 60px;
                em {
                  color: #999;
                }
              }
            }
            .adress {
              em {
                color: #999;
              }
            }
          }
          .bottomRight {
            width: 20%;
            height: 60px;
            border-left: 1px solid rgba(0, 0, 0, 0.05);
            display: flex;
            flex-direction: column;
            a {
              text-align: center;
              color: #0373c2;
              margin-top: -8px;
            }
            button {
              outline: none;
              width: 100px;
              height: 30px;
              border: 1px solid rgba(0, 0, 0, 0.2);
              margin: 8px auto;
            }
          }
        }
      }
    }
    .goodsInfo {
      width: 100%;
      margin-top: 50px;
      font-size: 14px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      .goodsInfoTitle {
        width: 100%;
        height: 40px;
        background-color: rgb(244, 244, 244);
        color: #999;
        span {
          line-height: 40px;

          display: inline-block;
        }
        .goodInfo {
          margin-left: 20px;
          width: 566px;
        }
        .sale {
          margin-left: 40px;
          width: 195px;
        }
        .count {
          margin-right: 50px;
          width: 50px;
        }
        .total {
          width: 80px;
          margin-left: 40px;
        }
      }
      .goodsDetail {
        width: 100%;
        height: 117px;
        .goodPicture {
          width: 80px;
          height: 80px;
          margin-left: 20px;
          margin-right: 20px;
          vertical-align: middle;
        }
        .desc {
          width: 370px;
          display: inline-block;
          height: 100px;
          box-sizing: border-box;
          padding-top: 28px;
          vertical-align: middle;
          i {
            margin-top: 7px;
            display: block;
            color: #999;
          }
        }
        .saleDeatil {
          margin-left: 138px;
          display: inline-block;
          height: 117px;
          line-height: 117px;
        }
        .countDetail {
          margin-left: 175px;
        }
        .totalDetail {
          margin-left: 120px;
        }
      }
      .dealWrapper {
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
        overflow: hidden;
        .deal {
          width: 100%;
          border-top: 1px solid #eaeaea;
          padding-top: 30px;
          padding-right: 40px;
          box-sizing: border-box;
          .goodsAll {
            .goodsAllRight {
              margin-left: 90px;
            }
            .goodsAllLeft {
              margin-left: 830px;
            }
          }
          .roadPrice {
            margin-top: 8px;
            .roadPriceLeft {
              margin-left: 858px;
            }
            .roadPriceRight {
              margin-left: 90px;
            }
          }
          .factPay {
            margin-top: 8px;
            .factPayRight {
              font-size: 18px;
              color: #d33a31;
              margin-left: 80px;
            }
            .factPayLeft {
              margin-left: 830px;
            }
          }
          .sendOrder {
            margin-top: 10px;
            height: 65px;
            display: flex;
            justify-content: space-between;
            button {
              width: 174px;
              height: 50px;
              cursor: pointer;
              background-color: #ccc;
              color: white;
              text-align: center;
              line-height: 50px;
              border: none;
              margin-top: 5px;
              outline: none;
              font-size: 16px;
              &.active {
                background-color: #d33a31;
              }
            }
            .sendOrderLeft {
              margin-top: 48px;
            }
          }
          .infoAll {
            float: right;
            color: #666;
            margin-bottom: 24px;
          }
        }
      }
    }
    .payway {
      display: none;
      position: absolute;
      width: 650px;
      height: 370px;
      border-radius: 4px;
      box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
      background-color: white;
      z-index: 2;
      top: 120px;
      left: 220px;
      .paywayTitle {
        box-sizing: border-box;
        width: 100%;
        height: 60px;
        background-color: #f6f6f6;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        line-height: 60px;
        padding-left: 20px;
        font-size: 16px;
        font-weight: bold;
        color: #666;
        span {
          float: right;
          font-size: 22px;
          color: lightgray;
          margin-right: 10px;
          vertical-align: middle;
          cursor: pointer;
        }
      }
      .paywayContent {
        font-size: 16px;
        width: 100%;
        box-sizing: border-box;
        padding: 30px 20px 20px 20px;
        .paywayOrder {
          em {
            vertical-align: middle;
            display: inline-block;
            width: 26px;
            height: 26px;
            margin-right: 10px;
            background-image: url("https://s2.music.126.net/store/web/img/goub.png?c8a625e264daa53fe863a4345006fb3f");
          }
          padding-top: 20px;
          font-size: 22px;
        }
        .firstBuy {
          padding-top: 16px;
        }
        .payTotal {
          padding-top: 20px;
          padding-bottom: 30px;
          border-bottom: 1px solid rgb(242, 242, 242);
          em,
          i {
            color: #d33a31;
          }
        }
      }
      .paywayFooter {
        width: 100%;
        padding-left: 20px;
        padding-top: 15px;
        .weixin {
          cursor: pointer;
          width: 190px;
          height: 50px;
          background-image: url("https://s2.music.126.net/store/web/img/sprite/pay.png?06324589e82f11a12c103221ab855e85");
        }
      }
    }
    .saoMiao {
      display: none;
      position: absolute;
      width: 650px;
      height: 490px;
      border-radius: 4px;
      box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
      background-color: white;
      z-index: 2;
      top: 120px;
      left: 220px;
      .saoMiaoTitle {
        box-sizing: border-box;
        width: 100%;
        height: 60px;
        background-color: #f6f6f6;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        line-height: 60px;
        padding-left: 20px;
        font-size: 16px;
        font-weight: bold;
        color: #666;
        span {
          float: right;
          font-size: 22px;
          color: lightgray;
          margin-right: 10px;
          vertical-align: middle;
          cursor: pointer;
        }
      }
      .saoMiaoContent {
        box-sizing: border-box;
        padding: 70px 20px 20px 74px;
        display: flex;
        .saoMiaoLeft {
          width: 286px;
          height: 300px;
          border-right: 1px solid rgb(228, 228, 228);
          .picture1 {
            width: 145px;
            height: 37px;
            margin-left: 45px;
            margin-bottom: 15px;
            background-image: url("https://s2.music.126.net/store/web/img/wxscan2.png?00fb88858d96f4ad4d8defcbbb311665");
          }
          .picture2Wrapper {
            width: 220px;
            height: 220px;
            border: 1px solid rgba(0, 0, 0, 0.1);
            box-sizing: border-box;
            padding-top: 20px;
            padding-left: 20px;
            .picture2 {
              width: 180px;
              height: 180px;
              background-image: url("./images/erweima.png");
              background-size: cover;
            }
          }
          span {
            display: inline-block;
            padding-top: 12px;
            em {
              color: #d33a31;
            }
          }
        }
        .saoMiaoRight {
          width: 190px;
          height: 296px;
          margin-left: 20px;
          background-image: url("https://s2.music.126.net/store/web/img/wxscan.png?7b48352b647cd5290517ccd2bcea8a93");
        }
      }
    }
  }
  .change {
    display: none;
    border-radius: 4px;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    top: 45px;
    left: 215px;
    position: absolute;
    width: 650px;
    height: 500px;
    background-color: white;
    z-index: 2;
    .changeTitle {
      box-sizing: border-box;
      width: 100%;
      height: 60px;
      background-color: #f6f6f6;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      line-height: 60px;
      padding-left: 20px;
      font-size: 16px;
      font-weight: bold;
      color: #666;
    }
    .chageContent {
      width: 100%;
      box-sizing: border-box;
      padding: 30px 20px;
      font-size: 14px;
      color: rgb(51, 51, 51);
      .getGoodPeople {
        height: 35px;
        padding-top: 20px;
        span {
          margin-right: 12px;
        }
        input {
          width: 296px;
          height: 22px;
          padding: 5px 6px;
          border: 1px solid rgb(229, 229, 229);
          outline: none;
        }
      }
      .phoneNumber {
        height: 35px;
        padding-top: 20px;
        /deep/.phoneWrapper {
          width: 100%;
          /deep/.el-form-item__label {
            width: 80px !important;
            margin-left: -13px;
          }
          /deep/ .el-input__inner {
            width: 308px;
            height: 35px;
            padding: 5px 6px;
            border-radius: 0px;
            margin-left: -17px;
          }
        }
      }
      .changeArea {
        height: 35px;
        padding-top: 25px;
        span {
          margin-right: 7px;
        }
        .area {
          width: 145px;
          height: 35px;
          margin-right: 7px;
        }
      }
      .detailAdress {
        padding-top: 20px;
        span {
          margin-right: 7px;
          vertical-align: middle;
        }
        textarea {
          width: 456px;
          height: 99px;
          padding: 5px 6px;
          border: 1px solid rgb(229, 229, 229);
          outline: none;
          vertical-align: middle;
        }
      }
      .changeFooter {
        margin-top: 20px;
        display: block;
        button {
          line-height: 40px;
          height: 40px;
          cursor: pointer;
          outline: none;
        }
        .changeConfirm {
          width: 160px;
          text-align: center;
          color: white;
          background-color: #cb3b3b;
          border: none;
          margin-left: 63px;
        }
        .changeDelete {
          height: 41px;
          width: 138px;
          border: 1px solid rgb(217, 217, 217);
          margin-left: 22px;
          background-color: white;
        }
      }
    }
  }
  .exchange {
    display: none;
    border-radius: 4px;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    top: 45px;
    left: 215px;
    position: absolute;
    width: 650px;
    height: 500px;
    background-color: white;
    z-index: 2;
    .exchangeTitle {
      box-sizing: border-box;
      width: 100%;
      height: 60px;
      background-color: #f6f6f6;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      line-height: 60px;
      padding-left: 20px;
      font-size: 16px;
      font-weight: bold;
      color: #666;
    }
    .exchangeContent {
      height: 100%;

      width: 100%;
      padding-top: 30px;
      padding-bottom: 20px;
      padding-left: 20px;
      // padding: 30px 14px 20px 20px;
      box-sizing: border-box;

      ul {
        height: 300px;
        overflow: scroll;
        overflow-x: hidden !important;
        &::-webkit-scrollbar {
          width: 5px;
          height: 10px;
        }
        &::-webkit-scrollbar-thumb {
          -webkit-box-shadow: inset 0 0 5px agba(0, 0, 0, 0.5);
          /* 设置滚动条阴影 */
          background: rgba(0, 0, 0, 0.1);
          border-radius: 5px;
        }
        li {
          width: 608px;
          height: 102px;
          border: 1px solid rgb(244, 244, 244);
          margin-bottom: 10px;
          padding-left: 10px;

          padding-top: 20px;
          &.active {
            border: 2px solid rgb(211, 58, 49);
          }
          div {
            font-size: 14px;
            width: 100%;
            height: 30px;
            line-height: 30px;
            color: #333;
            em {
              color: rgb(153, 153, 153);
              margin-right: 8px;
            }
          }
        }
      }
      .exchangeFoot {
        margin-top: 30px;
        button {
          width: 140px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          border: none;
          outline: none;
          font-size: 16px;
          cursor: pointer;
        }
        .exchangeConfirm {
          margin-left: 150px;
          margin-right: 25px;
          background-color: rgb(211, 58, 49);
          color: white;
        }
      }
    }
  }
}
</style>
