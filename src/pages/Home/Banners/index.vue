<template>
  <!-- 轮播图 -->

  <div class="banners swiper-container">
    <div class="banner-warp swiper-wrapper">
      
      <div class="banner-itme swiper-slide" 
      v-for="(item,index) in bannersList" :id="index"
     
      >
        <a href="javascript:;">
          <img :src="item.picStr" alt />
        </a>
      </div>
    </div>
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
import { mapState } from "vuex";
export default {
  name: "Banners",
  data() {
    return {
     
    };
  },
  computed: {
    ...mapState({
      bannersList: (state) => state.home.bannersList,
    }),
  },
  mounted() {
    this.$store.dispatch("getBanner");
    
    console.log(this.bac);
    // 轮播配置
    setTimeout(() => {
      this.$nextTick(function () {
        var mySwiper = new Swiper(".swiper-container", {
          initialSide: 0,
          observer: true,
          observeParents: true,
          // direction: "vertical", // 垂直切换选项
          loop: true, // 循环模式选项
          autoplay: {
            delay: 2000, //1秒切换一次
          },
          // 如果需要分页器
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },

          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },

          // 如果需要滚动条
        });
      });
    }, 300);
  },
};
</script>

<style lang="less" scoped>
// 轮播图
.swiper-button-next,
.swiper-button-prev {
  background-color: #333;
  opacity: 0.2;
  color: white;
  width: 37px;
  height: 63px;

  &::after {
    font-size: 35px;
  }
}
.banners {
  width: 100%;
  height: 480px;
  overflow: hidden;
  position: relative;

  .banner-warp {
    width: 1100px;
    height: 480px;
    .lbt{
      width: 100%;
      height: 100%;
    }
    .banner-itme {
      
      width: 100%;
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
