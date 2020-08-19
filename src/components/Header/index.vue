<template>
  <!-- 头部 -->
  <div class="hearderContent line">
    <div class="header">
      <div class="header-item">
        <router-link to="/">
          <div class="icon-home"></div>
        </router-link>
        <div class="search">
          <div class="input-wrap">
            <form action>
              <input type="text" placeholder="降躁" />
            </form>
          </div>
        </div>
        <div class="shopCart">
          <a href="javascript:;" class="icon-cart">
            <img src="./image/购物车.png" alt />
          </a>
          <!-- <router-link to="/home" class="icon-cart">
          <img src="./image/购物车.png" alt="">
          </router-link>-->
        </div>
        <div class="login-warp">
          <ul class="show" v-show="userToken">
            <li @click="toMyOrder">
              <em class="login-first"></em>
              <a>我的订单</a>
            </li>
            <li @click="toMyAdress">
              <em class="login-second"></em>
              <a href>我的收货地址</a>
            </li>
            <li @click="toHome">
              <em class="login-fourth"></em>
              <a href>网易商城首页</a>
            </li>
            <li @click="reomoveToken">
              <em class="login-third"></em>
              <a href>退出</a>
            </li>
          </ul>
          <div class="selects">
            <div class="login" @click="toLogin" v-if="!userToken">登录</div>
            <img :src="userHead" v-else />
            <i class="iconfont">&#xe600;</i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      isFlage: false, // 控制是否显示下划线
      userToken: "", //判断显示头像还是登录
      userHead: "", //用户的头像地址
    };
  },

  mounted() {
    if (localStorage.getItem("user_token")) {
      this.userToken = localStorage.getItem("user_token");
      this.userHead = localStorage.getItem("user_head");
    }
  },
  methods: {
    //点击跳转到登录界面
    toLogin() {
      this.$router.push("/login");
    },
    //点击进行注销
    reomoveToken() {
      localStorage.removeItem("user_token");
      localStorage.removeItem("user_head");

      localStorage.removeItem("user_name");
      // const userArray = JSON.parse(localStorage.getItem("user-info"));
      // const newUserArray = userArray.filter((item) => {
      //   // alert(item.id, localStorage.getItem("user_id"));
      //   return !(item.id === localStorage.getItem("user_id"));
      // });
      // localStorage.setItem("user-info", JSON.stringify(newUserArray));
      localStorage.removeItem("user_id");
      localStorage.removeItem("user-info");
      this.userToken = "";
      this.userHead = "";
      this.$router.push("/");
    },
    //点击进入我的地址
    toMyAdress() {
      this.$router.push("/store/adress");
    },
    //点击跳转我的订单
    toMyOrder() {
      this.$router.push("/store/order");
    },
    toHome() {
      this.$router.push("/");
    },
  },
  watch: {
    $route(val) {
      if (val.path === "/") {
        this.isFlage = false;
      } else {
        // 不是首页显示下划线
        this.isFlage = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.hearderContent {
  width: 100%;
  &.line {
    border-bottom: 2px solid #ededed;
  }
}
.header {
  width: 1100px;
  margin: 0 auto;
  height: 70px;

  // background-color: hotpink;
  .header-item {
    float: left;
    .icon-home {
      float: left;
      width: 290px;
      height: 70px;
      background-image: url(./image/modules.png);
      background-position: 0 -48px;
    }
    .search {
      float: left;
      margin-left: 334px;
      width: 300px;
      height: 70px;
      .input-wrap {
        width: 300px;
        height: 69px;
        padding-top: 1px;
        form {
          width: 100%;
          height: 38px;
          margin-top: 15px;
          background-position: 0px -0px;
          background-image: url(./image/modules.png);
          white-space: normal;
          input {
            border: 0;
            outline: none;
            width: 80%;
            margin: 10px 0 0 34px;
            border: 0;
            background: transparent;
          }
        }
      }
    }
    .shopCart {
      float: left;
      width: 36px;
      height: 36px;
      margin: 17px 0 0 41px;
      position: relative;
      a {
        display: inline-block;
        width: 36px;
        height: 36px;
        img {
          width: 36px;
          height: 36px;
        }
      }
    }
    .login-warp {
      float: left;
      width: 62px;
      height: 55px;
      margin: 15px 0 0 37px;
      position: relative;
      &:hover .show {
        display: block;
      }
      .show {
        box-shadow: rgb(85, 85, 85) 0px 4px 7px 0px;
        display: none;
        width: 160px;
        height: 160px;
        z-index: 999;
        background-color: white;
        top: 55px;
        left: -50px;
        position: absolute;
        li {
          padding-left: 24px;
          box-sizing: border-box;
          cursor: pointer;
          &:hover {
            background-color: rgb(240, 240, 240);
          }
          a {
            text-decoration: none;
          }
          em {
            width: 18px;
            height: 18px;
            vertical-align: middle;
            margin-right: 8px;
            display: inline-block;
          }
          .login-first {
            background-image: url("https://s2.music.126.net/store/web/img/myorder.png?ad2de2866759683d8a5d00580b0d9c2b");
          }
          .login-second {
            background-image: url("https://s2.music.126.net/store/web/img/sprite/logins.png?fd034fc9c661e08128d4f3f31e8423b9");
          }
          .login-third {
            border-top: 1px solid;
            background-image: url("https://s2.music.126.net/store/web/img/sprite/logins.png?fd034fc9c661e08128d4f3f31e8423b9");
            background-position: -56px 0px;
          }
          .login-fourth {
            background-image: url("https://s2.music.126.net/store/web/img/sprite/logins.png?fd034fc9c661e08128d4f3f31e8423b9");
            background-position: -28px 0px;
          }
          font-size: 12px;
          width: 100%;
          height: 40px;
          line-height: 40px;
        }
      }
      .selects {
        width: 62px;
        height: 36px;
        position: relative;
        .login {
          cursor: pointer;
          width: 36px;
          height: 36px;
          line-height: 36px;
          text-align: center;
          font-size: 14px;
        }
        img {
          cursor: pointer;
          display: block;
          width: 36px;
          height: 36px;
          border-radius: 50%;
        }
        i {
          position: absolute;
          left: 0;
          top: 0;
          top: 12px;
          left: 50px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
