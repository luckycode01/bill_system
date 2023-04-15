<template>
  <view class="popup_main" :style="{paddingTop:headerHeight + 'px'}">
    <view class="search">
      <view class="search_item">
        <view class="title">
          <text class="lable">起止时间</text>
          <view class="time_tag">本月</view>
          <view class="time_tag ml">本周</view>
        </view>
        <u-row>
          <u-col :span="5">
            <u-input v-model="filterForm.dateTime" @focus="hideOpenPicker('time')" placeholder="2022-00-00" border="none"></u-input>
          </u-col>
          <u-col :span="1">
            <text style="color:#d1d3d9">-</text>
          </u-col>
          <u-col :span="5">
            <u-input v-model="filterForm.dateTime" @focus="hideOpenPicker('time')" placeholder="结束时间" border="none"></u-input>
          </u-col>
        </u-row>
      </view>
      <view class="search_item">
        <view class="title">
          <text class="lable">选择分类</text>
          <view class="time_tag">全选</view>
        </view>
        <view class="cate_list">
          <u-tag text="标签" type="success" plain plainFill></u-tag>
        </view>
      </view>
    </view>
    <view class="footer">
      <u-row>
        <u-col :span="5">
          <u-button type="info" :plain="true" text="重置"></u-button>
        </u-col>
        <u-col :span="5" :offset="1">
          <u-button type="primary" text="确定"></u-button>
        </u-col>
      </u-row>
    </view>
    <u-datetime-picker mode="date" :show="showDateTime" v-model="selectTime" :closeOnClickOverlay="true" @close="showDateTime = false"
      @cancel="showDateTime = false" @confirm="handleConfirmTime($event, item)">
      aa
    </u-datetime-picker>
  </view>
</template>
<script>
export default {
  data() {
    return {
      showPopup: false,
      showDateTime: false,
      filterForm: {
        dateTime: '',
      },
      filterFormRules: {},
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
    },
    handleClose() {
      this.showDateTime = false;
    },
    hideOpenPicker(tag) {
      console.log(tag);
      if (tag == "time") {
        this.showDateTime = true;
      } else if (tag == "cate") {
        this.showCategory = true;
      }
      uni.hideKeyboard();
    },
  },
}
</script>
<style lang="scss" scoped>
.popup_main {
  height: 100vh;
  width: 100%;
  padding: 36rpx;
  position: relative;
  box-sizing: border-box;
  .footer {
    width: 600rpx;
    position: fixed;
    bottom: 0px;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
}
.search_item {
  border-bottom: 1px solid #d1d3d9;
  .title {
    margin: 24rpx 48rpx 24rpx 0;
    display: flex;
    align-items: center;
    .lable {
      margin: 0 24rpx 0 0;
    }
    .time_tag {
      width: 88rpx;
      text-align: center;
      border: 1px solid #56aaff;
      border-radius: 40rpx;
      font-size: 24rpx;
      height: 40rpx;
    }
    .ml {
      margin-left: 24rpx;
    }
  }
  .cate_list {
  }
}
</style>