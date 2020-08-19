<template>
  <div class="wrapper">
    <div class="inner">
      <div class="box">
        <div class="boxTitle">
          <em>手机号登录</em>
          <i>x</i>
        </div>
        <div class="boxContent">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="手机号码" prop="phone">
              <el-input
                v-model="ruleForm.phone"
                placeholder="请输入手机号码"
              ></el-input>
            </el-form-item>
            <el-form-item label="登录密码" prop="password">
              <el-input
                v-model="ruleForm.password"
                placeholder="请输入登录密码"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="toLogin" :plain="true"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqLogin } from "../../api/index";
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        phone: "",
        password: "",
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
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "密码长度在 6 到 20 个字符",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  methods: {
    //点击进行登录
    async toLogin() {
      const { phone, password } = this.ruleForm;
      // const { data } = await reqLogin(phone, password);
      const res = await reqLogin(phone, password);
      if (res.data.code === 200) {
        //登陆成功进行跳转到首页

        this.$router.push("/");
        localStorage.setItem("user_token", res.data.token);
        localStorage.setItem("user_head", res.data.profile.avatarUrl);
        localStorage.setItem("user_id", res.data.profile.userId);
        localStorage.setItem("user_name", res.data.profile.nickname);
        history.go(0);
      } else {
        this.$message.error("账号或者密码输入错误");
      }
    },
  },
};
</script>
<style lang="less" scoped>
html,
body {
  width: 100%;
  height: 100%;
}
.wrapper {
  height: 100%;
  width: 100%;
  background-color: rgb(245, 245, 245);
  .inner {
    height: 540px;
    width: 1100px;
    margin: 0 auto;
    border-left: 1px solid rgb(211, 211, 211);
    border-right: 1px solid rgb(211, 211, 211);
    background-color: rgb(250, 250, 250);
    padding-top: 80px;
    .box {
      border-radius: 4px;
      box-shadow: 0 5px 16px rgba(0, 0, 0, 0.8);
      width: 700px;
      height: 320px;
      margin: 0 auto;
      .boxTitle {
        width: 100%;
        height: 40px;
        font-size: 14px;
        line-height: 40px;

        color: white;
        background-color: #2d2d2d;
        em {
          margin-left: 18px;
          font-weight: bold;
        }
        i {
          cursor: pointer;
          font-size: 16px;
          float: right;
          color: white;
          margin-right: 15px;
        }
      }
      .boxContent {
        width: 100%;
        box-sizing: border-box;
        padding-top: 60px;
        padding-left: 150px;
        padding-right: 150px;
        button {
          margin-top: 5px;
          width: 100%;
          background-color: rgb(46, 126, 203);
          &:hover {
            background-color: rgb(90, 160, 225);
          }
        }
      }
    }
  }
}
</style>
