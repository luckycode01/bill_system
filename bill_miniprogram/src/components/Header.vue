<template>
  <view
    class="top_header"
    :style="{ height: menuBtnHeight + menuBtnTop + 'px' }"
  >
    <view
      class="header_content"
      :style="{
        height: menuBtnHeight + 'px',
        'padding-top': menuBtnTop + 'px',
      }"
    >
      <view
        :class="isBack ? 'back' : ''"
        :style="{ width: menuBtnWidth + 10 + 'px' }"
      >
        <text class=""></text>
      </view>
      <view class="title">{{ title }}</view>
      <view class="right" :style="{ width: menuBtnWidth + 15 + 'px' }"></view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    isBack: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "标题",
    },
  },
  data() {
    return {
      statusBarHeight: 0, //状态栏的高度
      menuBtnTop: 0, //胶囊位置
      menuBtnWidth: 0,
      menuBtnHeight: 0,
    };
  },
  created() {
    this.statusBarHeight = getApp().globalData.statusBarHeight;
    this.menuBtnWidth = getApp().globalData.menuBtn.width || 0;
    this.menuBtnHeight = getApp().globalData.menuBtn.height || 0;
    this.menuBtnTop = getApp().globalData.menuBtn.top || 0;
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.top_header {
  width: 100%;
  margin: auto;
  .header_content {
    display: flex;
    align-items: center;
    background: #56aaff;
    padding-bottom: 8px;
  }

  .title {
    flex: 1;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
  }
  .back {
    padding-left: 44rpx;
    box-sizing: border-box;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      width: 24rpx;
      height: 24rpx;
      top: 50%;
      border-left: 4rpx solid #fff;
      border-top: 4rpx solid #fff;
      transform: translateY(-50%) rotate(-45deg);
    }
  }
}
</style>
