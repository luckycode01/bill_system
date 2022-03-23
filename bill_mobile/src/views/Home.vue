<template>
  <div class="home">
    <van-nav-bar title="首页">
      <template #right>
        <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" size="26" />
      </template>
      <template #left>
        <img src="../assets/img/logo.png" style="height:0.92rem;width:1.62rem" alt="">
      </template>
    </van-nav-bar>
    <Main></Main>
  </div>
</template>

<script>
import Main from "./Main"
export default {
  components: {
    Main
  },
  data() {
    return {
      active: 0,
    };
  },
};
</script>
<style lang="less">
.van-tabbar {
  border-top: 1px solid #d9d9d9;
}
</style>
