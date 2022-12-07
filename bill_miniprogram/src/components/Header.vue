<template>
  <view class="top_header">
    <view :style="{ 'margin-top': statusBarHeight + 'px' }">
      <view class="back">
        <text class="">返回</text>
      </view>
      <view class="title">{{ title }}</view>
      <view class="right"></view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "标题标题标题标题标题",
    },
  },
  data() {
    return {
      statusBarHeight: 0,
    };
  },
  created() {
    this.statusBarHeight = getApp().globalData.statusBarHeight;
    console.log(this.statusBarHeight);
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.top_header {
  width: 100%;
  margin: auto;
  .back {
    color: #333;
  }
}
</style>
