<template>
  <div class="fixed">
    <van-nav-bar :title="title">
      <template #right v-if="$route.meta.icon">
        <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" @click="toUserInfo" size="26" />
      </template>
      <template #left v-if="$route.meta.left">
        <img v-if="!leftIcon" src="@/assets/img/logo.png" style="height: 0.92rem; width: 1.62rem" alt="" />
        <van-icon @click="$router.go(-1)" :name="leftIcon" color="#333333" size="26" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ["title", "leftIcon"],
  data() {
    return {
      userInfo: JSON.parse(sessionStorage.getItem('userInfo')) || {},
    }
  },
  methods: {
    toUserInfo() {
      let userInfo = JSON.parse(sessionStorage.getItem('userInfo')) || {};
      if (userInfo.userId) {
        this.$router.push('/usercenter');
      } else {
        this.$router.push('/login')
      }
    }
  },
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  border-bottom: 1px solid #d9d9d9;
}
.fixed {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
}
</style>
