<template>
  <div id="app">
    <router-view />
    <van-tabbar v-model="active">
      <van-tabbar-item icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="more-o">详细</van-tabbar-item>
      <van-tabbar-item icon="chart-trending-o">图表</van-tabbar-item>
      <van-tabbar-item icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
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
