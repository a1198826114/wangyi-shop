<template>
  <div class="outer">
    <div class="inner">
      <!-- 订单确认 -->
      <div class="header">
        <span>首页</span>
        <em>></em>
        <i>我的收货地址</i>
      </div>
      <div class="content">
        <ul class="choose">
          <li class="myOrder" @click="toMyOrder">我的订单</li>
          <li class="myAdress active">我的收货地址</li>
        </ul>
        <div class="myAdressRight">
          <div class="origin" v-if="showFlag">
            <div class="adressTitle">
              <span class="adressTitleLeft">我的收货地址</span>
              <span class="adressTitleRight" @click="add">
                <i>+</i>新建收货地址
              </span>
            </div>
            <div class="adressContent">
              <div class="contentTitle">
                <span class="user">收货人</span>
                <span class="userAdress">收货地址</span>
                <span class="phone">联系电话</span>
                <span class="operate">操作</span>
              </div>
              <div
                class="contentDetails"
                v-for="(item, index) in userList"
                :key="index"
              >
                <span class="userDetails">{{ item.name }}</span>
                <span class="userAdressDetails">{{
                  item.location1Name + item.location2Name + item.location3Name
                }}</span>
                <span class="phoneDetails">{{ item.phone }}</span>
                <span class="operateDetails">
                  <a href="javascript:;" @click="modify(index)">修改</a>

                  <i>|</i>

                  <el-button type="text" @click="delAdress(index)"
                    ><a href="javascript:;">删除</a></el-button
                  >
                </span>
                <span class="defaultDetails">
                  <el-button type="text" @click="setDefaultAdress(index)"
                    ><em>默认地址</em>
                  </el-button>
                </span>
              </div>
            </div>
          </div>

          <div class="originHide" v-else>
            <div class="originHideTitle">
              <span class="adressTitleLeft">我的收货地址</span>
            </div>
            <div class="originAdress">
              <div class="originchageContent">
                <div class="originFirstLine">
                  <div class="origingetGoodPeople">
                    <span>收&nbsp;&nbsp;货&nbsp;&nbsp;人</span>
                    <input type="text" v-model="name" class="originUser" />
                  </div>
                  <div class="originphoneNumber">
                    <el-form
                      :model="ruleForm"
                      :rules="rules"
                      ref="ruleForm"
                      label-width="80px"
                      class="demo-ruleForm"
                      hide-required-asterisk
                    >
                      <el-form-item
                        label="手机号码"
                        prop="phone"
                        class="originphoneWrapper"
                      >
                        <el-input
                          class="originrulePhone"
                          v-model="ruleForm.phone"
                          placeholder="请输入手机号码"
                        ></el-input>
                      </el-form-item>
                    </el-form>
                  </div>
                </div>

                <div class="originchangeArea">
                  <span>收货地区</span>
                  <el-select
                    class="originarea"
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
                    class="originarea"
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
                    class="originarea"
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
                <div class="origindetailAdress">
                  <span>详细地址</span>
                  <!-- <input type="textarea" v-model="detailAdress" rows="4" /> -->
                  <textarea
                    cols="30"
                    rows="10"
                    v-model="detailAdress"
                  ></textarea>
                </div>
                <el-button
                  :plain="true"
                  class="originchangeConfirm"
                  @click="saveNewAdress"
                  >保存新地址</el-button
                >
              </div>
            </div>
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
    </div>
  </div>
</template>

<script>
import { reqPlace } from "../../api/index";

export default {
  name: "Adress",
  mounted() {
    this.publicMethods();
    const res = JSON.parse(localStorage.getItem("user-info"));
    if (res) {
      const newArray = res.filter(
        (item) => item.id === localStorage.getItem("user_id")
      );

      this.userList = newArray;
    }
  },
  data() {
    return {
      index: -1,
      newOrSave: false,
      userList: [],
      name: "",
      showFlag: JSON.parse(localStorage.getItem("user-info")),
      detailAdress: "",
      category1Id: null,
      category2Id: null,
      category3Id: null,
      categoryList1: [],
      categoryList2: [],
      categoryList3: [],
      location1Name: "",
      location2Name: "",
      location3Name: "",
      id: 0,
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
  methods: {
    //点击去我的地址
    toMyOrder() {
      this.$router.push("/store/order");
    },
    //点击取消隐藏界面
    delShow() {
      this.$refs.show.style.display = "none";
    },
    //点击修改
    modify(index) {
      this.index = index;
      this.$refs.show.style.display = "block";
      this.publicMethods();
    },
    //点击新增
    add() {
      this.newOrSave = true;
      this.$refs.show.style.display = "block";
      this.publicMethods();
    },
    async publicMethods() {
      const { data } = await reqPlace();
      console.log(data);
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
    //删除地址
    delAdress(index) {
      this.$confirm("确定删除该收获地址?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const userArray = JSON.parse(localStorage.getItem("user-info")) || [];
          userArray.splice(index, 1);
          localStorage.setItem("user-info", JSON.stringify(userArray));

          if (userArray.length === 0) {
            localStorage.removeItem("user-info");
            history.go(0);
          }
          this.$message({
            type: "success",
            message: "删除成功!",
          });

          history.go(0); //刷新页面并读取缓存数据
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //设置默认地址
    setDefaultAdress(index) {
      const userArray = JSON.parse(localStorage.getItem("user-info"));
      userArray.forEach((item) => {
        item.setdefault = false;
      });
      userArray[index].setdefault = true;
      localStorage.setItem("user-info", JSON.stringify(userArray));
      this.$message({
        message: "设置默认地址成功",
        type: "success",
      });
    },
    // 显示属性列表
    category3Changed(id) {
      this.id = id;
      const res = this.categoryList3.find((item) => item.id === id);
      this.location3Name = res.locationName;
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
    margin-bottom: 100px;
    padding-bottom: 160px;
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
    .myAdressRight {
      width: 100%;
      .origin {
        width: 100%;
        .adressTitle {
          height: 35px;
          margin: 15px 0;
          overflow: hidden;
          .adressTitleLeft {
            font-size: 16px;
            font-weight: bold;
          }
          .adressTitleRight {
            float: right;
            width: 130px;
            height: 25px;
            text-align: center;
            line-height: 18px;
            border: 1px solid rgb(217, 217, 217);
            i {
              font-size: 21px;
              color: #d33a31;
              margin-right: 2px;
            }
          }
        }
        .adressContent {
          width: 100%;
          border: 1px solid #d9d9d9;
          .contentTitle {
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #d9d9d9;
            background-color: #f5f5f5;
            color: #999;
            font-size: 14px;
            box-sizing: border-box;
            span {
              display: inline-block;
            }
            .user {
              width: 115px;
              margin-left: 30px;
              margin-right: 10px;
            }
            .userAdress {
              width: 327px;
              margin-right: 10px;
            }
            .phone {
              width: 88px;
            }
            .operate {
              width: 238px;
              margin-left: 50px;
            }
          }
          .contentDetails {
            width: 100%;
            height: 77px;
            line-height: 77px;
            display: flex;
            .userDetails {
              padding-left: 30px;
              width: 115px;
              height: 76px;
              padding-right: 10px;
              display: inline-block;
            }
            .userAdressDetails {
              padding-right: 5px;
              height: 76px;
              width: 327px;
              display: inline-block;
            }
            .phoneDetails {
              display: inline-block;
              width: 88px;
              height: 76px;
              padding-right: 40px;
            }
            .operateDetails {
              display: inline-block;
              height: 76px;
              width: 90px;

              a {
                font-size: 14px;
                color: rgb(12, 115, 194);
              }
              i {
                color: #eaeaea;
                margin: 0 3px;
              }
            }
            .defaultDetails {
              margin-left: 60px;

              em {
                padding: 2px 2px;
                cursor: pointer;
                color: rgb(211, 58, 49);
                border: 1px solid rgb(211, 58, 49);
              }
            }
          }
        }
      }
      .originHide {
        width: 100%;
        .originHideTitle {
          height: 35px;
          margin-top: 15px;
          margin-left: 10px;
          color: rgb(51, 51, 51);
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 50px;
        }
        .originAdress {
          width: 100%;

          .originchageContent {
            width: 100%;
            box-sizing: border-box;
            padding: 30px 20px;
            padding-top: 0px;
            font-size: 14px;
            color: rgb(51, 51, 51);
            .originFirstLine {
              width: 100%;
              display: flex;
              align-items: center;
              .origingetGoodPeople {
                height: 35px;
                margin-right: 20px;
                span {
                  margin-right: 12px;
                }
                input.originUser {
                  width: 296px;
                  height: 35px;
                  padding: 5px 6px;
                  border: 1px solid rgb(229, 229, 229);
                  outline: none;
                  margin-top: -1px;
                }
              }
              .originphoneNumber {
                height: 35px;

                /deep/.originphoneWrapper {
                  width: 100%;
                  margin-top: -3px;
                  /deep/.el-form-item__label {
                    width: 80px !important;
                    margin-left: -13px;
                  }
                  /deep/ .el-input__inner {
                    width: 308px;
                    height: 35px;
                    padding: 5px 6px;
                    border-radius: 0px;
                    margin-left: -10px;
                  }
                }
              }
            }

            .originchangeArea {
              height: 35px;
              padding-top: 25px;
              span {
                margin-right: 7px;
              }
              .originarea {
                width: 227px;
                height: 35px;
                margin-right: 7px;
              }
            }
            .origindetailAdress {
              padding-top: 55px;

              span {
                margin-right: 7px;
                vertical-align: middle;
              }
              textarea {
                vertical-align: middle;
                width: 695px;
                height: 99px;
                padding: 5px 6px;
                border: 1px solid rgb(229, 229, 229);
                outline: none;
              }
            }

            .originchangeConfirm {
              margin-top: 20px;
              height: 40px;
              cursor: pointer;
              outline: none;
              width: 160px;
              text-align: center;
              color: white;
              background-color: #cb3b3b;
              border: none;
              margin-left: 63px;
            }
          }
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
          width: 308px;
          height: 35px;
          padding: 5px 6px;
          border: 1px solid rgb(229, 229, 229);
          outline: none;
        }
      }
      .phoneNumber {
        height: 35px;
        padding-top: 35px;
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
        padding-top: 55px;
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
        padding-top: 60px;
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
}
</style>
