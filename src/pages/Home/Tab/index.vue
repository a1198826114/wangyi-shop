<template>
  <!-- 轮播图下的几个分类页面 -->
  <div class="tab">
    <div class="tab-warp">
      <ul>
        <li>
          <a href>
            <img class="tab-img" src="../image/tab/tab1.jpg" alt />
            <span>热爆精品</span>
          </a>
          <em class="line"></em>
        </li>
        <li @click="toIp">
          <a href="javascript:;">
            <img src="../image/tab/tab2.jpg" alt />
            <span>IP周边</span>
          </a>
           <em class="line"></em>
        </li>
        <li>
          <a href>
            <img src="../image/tab/tab3.jpg" alt />
            <span>数码影音</span>
          </a>
           <em class="line"></em>
        </li>
        <li>
          <a href>
            <div class="yunbei"></div>
            <div class="right">
              <div class="txt">云贝商城</div>
              <em class="count">0</em>
              <em class="jifen">云贝</em>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tab",
  data(){
    return{
      keyword:'IP周边'
    }
  },
  methods:{
    toIp(){
      this.$router.push(`/ip?cid=1008002&title=${this.keyword}`)
    
        
   
    }
  }
};

</script>

<style lang="less" scoped>
// 轮播图下的几个分类页面
.tab {
  width: 100%;
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
  .tab-warp {
    width: 1100px;
    margin: 0 auto;
    ul {
      width: 100%;
      text-align: center;
      height: 80px;

      li {
        float: left;
        width: 275px;
        height: 80px;
        a {
          float: left;
          width: 250px;
          padding: 0 10px;
          height: 80px;
          text-align: center;

          img {
            display: inline-block;
            width: 48px;
            height: 48px;
            vertical-align: top;
            padding-top: 16px;
          }
          span {
            display: inline-block;
            max-width: 190px;
            height: 80px;
            padding-left: 12px;
            line-height: 80px;
            font-size: 14px;
            font-weight: bold;
          }
          .yunbei {
            background-image: url(../image/jifen.png);
            display: inline-block;
            width: 48px;
            height: 48px;
            margin-top: 15px;
          }
          .right {
            display: inline-block;
            height: 80px;
            padding-left: 8px;
            vertical-align: top;
            .txt {
              padding-top: 20px;
              font-size: 14px;
              font-weight: bold;
              color: #333333;
            }
            .count {
              display: inline-block;

              font-size: 14px;
              color: #d33a31;
            }
            .jifen {
              display: inline-block;
              padding: 2px 0 0 4px;
              font-size: 12px;
              color: #d33a31;
            }
          }
        }
        .line {
          display: inline-block;
          height: 48px;
          width: 1px;
          margin: 16px 0 16px 0;
          background-color: #000000;
          filter: alpha(opacity=10);
          -moz-opacity: 0.1;
          opacity: 0.1;
        }
      }
    }
  }
}
</style>
