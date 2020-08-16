<template>
  <!-- 轮播图 -->
    <div class="banners">
      <ul class="banner-warp swiper-wrapper" >
        <li class="banner-itme swiper-slide">
          <a href="javascript:;">
            <img src="../image/banner/banner1.jpg" alt="">
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <img src="../image/banner/banner2.jpg" alt="">
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <img src="../image/banner/banner3.jpg" alt="">
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <img src="../image/banner/banner4.jpg" alt="">
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <img src="../image/banner/banner5.jpg" alt="">
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <img src="../image/banner/banner6.jpg" alt="">
          </a>
        </li>
      </ul>
      <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    </div>
</template>

<script>
// import Swoper from 'swiper'
export default {
    name:'Banners',
    watch:{
      
    }
}
</script>

<style lang="less" scoped>

.banners{
        width: 100%;
        height: 480px;
        overflow: hidden;
        position: relative;
        .banner-warp{
            height: 480px;
            background-color: orange;
            .banner-itme{
                top: 0;
                left: 0;
                width: 1100px;
                height: 480px;
                
                overflow: hidden;
                a{
                    z-index: 9;
                    top: 50%;
                    left: 50%;
                    width: 1100px;
                    height: 480px;
                    position: absolute;
                    margin-top: -240px;
                    margin-left: -550px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
</style>
