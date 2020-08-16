<template>
  <!-- 轮播图 -->

  <div class="banners swiper-container">
    <div class="banner-warp swiper-wrapper">
      <li class="banner-itme swiper-slide">
        <a href="javascript:;">
          <img src="../image/banner/banner1.jpg" alt />
        </a>
      </li>
      <div class="banner-itme swiper-slide">
        <a href="javascript:;">
          <img src="../image/banner/banner2.jpg" alt />
        </a>
      </div>
      <li class="banner-itme swiper-slide">
        <a href="javascript:;">
          <img src="../image/banner/banner3.jpg" alt />
        </a>
      </li>
      <li class="banner-itme swiper-slide">
        <a href="javascript:;">
          <img src="../image/banner/banner4.jpg" alt />
        </a>
      </li>
      <li class="banner-itme swiper-slide">
        <a href="javascript:;">
          <img src="../image/banner/banner5.jpg" alt />
        </a>
      </li>
      <li class="banner-itme swiper-slide">
        <a href="javascript:;">
          <img src="../image/banner/banner6.jpg" alt />
        </a>
      </li>
    </div>
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";

export default {
  name:'Banners',
  data(){
    return{
    
    }
  },
 mounted() {
    // 轮播配置
    var mySwiper = new Swiper(".swiper-container", {
      // direction: "vertical", // 垂直切换选项
      loop: true, // 循环模式选项

      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination",
      },

      // 如果需要前进后退按钮
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      // 如果需要滚动条
    });

  },
  
};
</script>

<style lang="less" scoped>
// 轮播图
.banners {
  width: 100%;
  height: 480px;
  overflow: hidden;
  position: relative;
  .banner-warp {
    height: 480px;
  
    .banner-itme {
      top: 0;
      left: 0;
      width: 1100px;
      height: 480px;

      overflow: hidden;
      a {
        z-index: 9;
        top: 50%;
        left: 50%;
        width: 1100px;
        height: 480px;
        position: absolute;
        margin-top: -240px;
        margin-left: -550px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
