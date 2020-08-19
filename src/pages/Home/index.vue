<template>
  <div class="dd">
      <Banners />
      <Tab />
      <Contain />
  </div>
</template>

<script>
import Banners from './Banners'
import Tab from './Tab'
import Contain from './Contain'

export default {
    name:'Home',
    components:{
        Banners,
        Tab,
        Contain
    },
   
}
</script>

<style lang="less" scoped>
.dd{
    overflow: hidden;
}
</style>
