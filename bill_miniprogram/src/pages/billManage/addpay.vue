<template>
  <view class="content">
    <Header isBack :title="'添加账单'"></Header>
    <u-tabs :list="list1" @click="click"> </u-tabs>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      list1: [
        {
          name: "关注",
        },
        {
          name: "推荐",
        },
      ],
    };
  },
  // 需要在节点加载到页面后调用
  onReady() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
