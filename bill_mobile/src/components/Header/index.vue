<template>
  <div class="fixed">
    <van-nav-bar :title="title">
      <template #right v-if="$route.meta.icon">
        <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" size="26" />
      </template>
      <template #left v-if="$route.meta.left">
        <img src="@/assets/img/logo.png" style="height: 0.92rem; width: 1.62rem" alt="" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ["title"]
}
</script>

<style lang="less" scoped>
.van-tabbar {
  border-top: 1px solid #d9d9d9;
}
.fixed {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
}
</style>
