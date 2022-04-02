<template>
  <div id="app">
    <router-view />
    <van-tabbar v-if="!$route.meta.tabbar" v-model="active" @change="tabChange">
      <van-tabbar-item name="0" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item name="1" icon="more-o">详细</van-tabbar-item>
      <van-tabbar-item name="2" icon="chart-trending-o">图表</van-tabbar-item>
      <van-tabbar-item name="3" icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: this.$route.meta.index || '0',
    };
  },
  created() {

  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        this.active = this.$route.meta.index || '0';
      }
    }
  },
  methods: {
    tabChange(active) {

      sessionStorage.setItem('tabActive', active);
      switch (active) {
        case '0': this.$router.push({ name: 'home' }); break;
        case '1': this.$router.push({ name: 'detail' }); break;
        case '2': this.$router.push({ name: 'plot' }); break;
        case '3': this.$router.push({ name: 'usercenter' }); break;
      }
    }
  },
};
</script>
<style lang="less">
.van-tabbar {
  border-top: 1px solid #d9d9d9;
}
.layout {
  margin-top: 50px;
  box-sizing: border-box;
}
</style>
