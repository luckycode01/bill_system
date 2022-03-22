<template>
  <div class="home">
    <van-nav-bar title="首页">
      <template #right>
        <van-icon name="user-o" size="22" />
      </template>
      <template #left>
        <img src="../assets/img/logo.png" style="height:46px;width:81px" alt="">
      </template>
    </van-nav-bar>

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
