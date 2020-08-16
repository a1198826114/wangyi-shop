<template>
  <!-- 专辑购买详情 -->
  <div class="album-shop-conent">
    <img
      src="https://p1.music.126.net/n8objKMAfyw-cotbj9CmQw==/109951163676240009.jpg?param=440y440"
      alt
    />

    <div class="info">
      <div class="album-name">L.O.V.E</div>
      <div class="singerOrAlbum">
        <a class="singer">陈奕迅</a>/
        <a class="album">eason and the duo band</a>
      </div>
      <div class="price">
        ￥
        <span>100</span>
      </div>
      <div class="number">
        <span>数量</span>
        <div class="addOrReduce">
          <i class="add"></i>
          <input value="1" />
          <i class="reduce"></i>
        </div>
        <div class="Sold">
          <span>已售出：</span>
          <span>23243432张</span>
        </div>
      </div>
      <div class="btn">
        <button>立即支持</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AlbumShop'
}
</script>
<style lang="less" scoped>
//   专辑购买详情
.album-shop-conent {
  width: 100%;
  height: 440px;
  margin: 20px 0 50px 0;
  display: flex;
  justify-content: space-between;
  img {
    width: 440px;
    height: 440px;
    vertical-align: top;
  }
  .info {
    width: 580px;
    .album-name {
      line-height: 34px;
      color: #333;
      font-size: 24px;
    }
    .singerOrAlbum {
      margin-top: 12px;
      display: flex;
      align-items: center;
      color: #0c73c2;
      a {
        height: 24px;
        font-size: 18px;
        color: inherit;

        &:hover {
          text-decoration: underline;
        }
      }
      .singer {
        margin-right: 5px;
      }
      .album {
        margin-left: 5px;
      }
    }
    .price {
      margin-top: 12px;
      height: 40px;
      line-height: 40px;
      font-size: 30px;
      color: #d33a31;
    }
    .number {
      margin-top: 17px;
      height: 32px;
      line-height: 32px;
      display: flex;
      align-items: center;
      & > span {
        width: 28px;
        height: 30px;
        color: #999999;
        margin-right: 30px;
        font-size: 14px;
      }
      .addOrReduce {
        display: flex;
        border: 1px solid #e5e5e5;
        .reduce {
          background: url(../image/icon.png) no-repeat 0 9999px;
          background-position: -35px -533px;
        }
        .add {
          background: url(../image/icon.png) no-repeat 0 9999px;
          background-position: 3px -533px;
        }
        i {
          height: 30px;
          width: 34px;
        }
        input {
          border: none;
          outline: none;
          width: 59px;
          height: 30px;
          text-align: center;
          border-left: 1px solid #e5e5e5;
          border-right: 1px solid #e5e5e5;
        }
      }
      .Sold {
        margin-left: 30px;
        height: 30px;
        line-height: 30px;
        color: #666666;
        font-size: 12px;
      }
    }
    .btn {
      button {
        width: 160px;
        height: 50px;
        line-height: 50px;
        margin-top: 30px;
        border: none;
        background: #d33a31;
        color: #fff;
        font-size: 18px;
        text-align: center;
      }
    }
  }
}
</style>