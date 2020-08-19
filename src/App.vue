<template>
<<<<<<< HEAD
  <div id="app"></div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
=======
  <div>
    <Header />
    <router-view></router-view>
    <Foot />
  </div>
</template>

<script>
import Header from "./components/Header";
import Foot from "./components/Foot";
export default {
  name: "App",
  components: {
    Header,
    Foot,
>>>>>>> 项目完工
  },
};
</script>

<<<<<<< HEAD
<style>
</style>
=======
<style lang="less" scoped></style>
>>>>>>> 项目完工
