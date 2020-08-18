<template>
  <div class="sy">
     <Header />
     <router-view></router-view>
     <Foot />
  </div>

</template>

<script>
import Header from './components/Header'
import Foot from './components/Foot'
export default {
  name: "App",
  components: {
    Header,
    Foot
  },
};
</script>

<style lang="less" scoped>
.sy{
  overflow: hidden;
}
</style>
