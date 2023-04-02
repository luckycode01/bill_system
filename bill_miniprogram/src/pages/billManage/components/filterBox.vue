<template>
  <view class="popup_main" :style="{paddingTop:headerHeight + 'px'}">

  </view>
</template>
<script>
export default {
  data() {
    return {
      showPopup: false,
    }
  },
  computed: {
    headerHeight() {
      return 12 + (getApp().globalData.menuBtn.height || 0) + (getApp().globalData.menuBtn.top || 0);
    },
  },
  created() {
  },
  methods: {
    init() {
      console.log('init');
    }
  },
}
</script>
<style lang="scss" scoped>
.popup_main {
  width: 100%;
  padding: 24rpx;
}
</style>