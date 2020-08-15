<template>
  <!-- 头部 -->
  <div class="header">
    <div class="header-item">
      <router-link to="/" >
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
        <div class="selects">
          <div class="login">登录</div>
          <i class="iconfont">&#xe600;</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang="less" scoped>
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
      height: 36px;
      margin: 15px 0 0 37px;

      .selects {
        width: 62px;
        height: 36px;
        position: relative;
        .login {
          width: 36px;
          height: 36px;
          line-height: 36px;
          text-align: center;
          font-size: 14px;
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
