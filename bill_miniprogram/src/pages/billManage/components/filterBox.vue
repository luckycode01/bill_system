<template>
  <view class="popup_main" :style="{paddingTop:headerHeight + 'px'}">
    <view>
      <el-form>
        <u-form-item label="日期" prop="dateTime" borderBottom ref="item1">
          <view class="form_item">
            <u-input v-model="addOneForm.dateTime" @click="hideOpenPicker('time')" placeholder="请选择时间" border="none" disabled disabledColor="#fff"></u-input>
            <view class="time_tag">本月</view>
            <view class="time_tag ml">本周</view>
          </view>
        </u-form-item>
      </el-form>
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
    <u-datetime-picker mode="date" :show="showDateTime" v-model="selectTime" :closeOnClickOverlay="true" @close="showDateTime = false" @cancel="showDateTime = false" @confirm="handleConfirmTime($event, item)">
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
  padding: 24rpx;
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
.form_item {
  display: flex;
  justify-content: space-between;
  .U-input {
    flex: 1;
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
    margin-left: 8rpx;
  }
}
</style>