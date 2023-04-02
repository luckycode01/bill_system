<template>
  <view class="plot_mail">
    <Header isBack :title="'图表统计'"></Header>
    <view class="plot_header">
      <text class="title">XXXX-XX-XXXXXX-XX-XX标题</text>
      <u-line></u-line>
      <u-grid :border="false" v-if="1">
        <u-grid-item>
          <div class="money"><span>￥</span>0000</div>
          <div class="desc">总支出</div>
        </u-grid-item>
        <u-grid-item>
          <div class="money"><span>￥</span>0000</div>
          <div class="desc">总收入</div>
        </u-grid-item>
        <u-grid-item>
          <div class="money"><span>￥</span>0000</div>
          <div class="desc">结余</div>
        </u-grid-item>
      </u-grid>
    </view>
    <view v-show="!showPopup" class="echart_box">
      <EchartBox :initData="payData" :config="payConfig" @handleChangeEchart="handleChangeEchart"></EchartBox>
      <EchartBox :initData="payData" :config="houseConfig" @handleChangeEchart="handleChangeEchart"></EchartBox>
      <EchartBox :initData="payData" :config="livingConfig" @handleChangeEchart="handleChangeEchart"></EchartBox>
    </view>
    <!-- 悬浮框 -->
    <view class="filter" :style="{top:moveObj.positionY+'px'}" @click="handleFilterClick" @touchstart="handleTouchStart" @touchmove="handleTouchMove"
      @touchend="handleTouchEnd">
    </view>
    <u-popup :show="showPopup" mode="right" :customStyle="{width:'600rpx'}" @close="handleClosePopup">
      <filterBox ref="filterBoxRef"></filterBox>
    </u-popup>
  </view>
</template>
<script>
import EchartBox from "@/components/echarts/index.vue";
import filterBox from "./components/filterBox.vue"
export default {
  components: {
    EchartBox,
    filterBox,
  },
  data() {
    return {
      payData: {
        name: [
          "甲11",
          "乙22",
          "丙33",
          "丁44",
          "戊55",
          "已66",
          "庚77",
          "戊88",
          "戊99",
          "戊10",
          "戊1111",
        ],
        value: [10, 90, 23, 34, 38, 23, 50, 36, 8, 23, 50, 6],
      },
      payConfig: {
        type: "Pie",
        title: "日期标题",
        configName: 'payConfig',
        isChange: true,
        limitNumber: 5,
        graphic: true,
      },
      houseConfig: {
        type: "Line",
        title: "日期标题",
        configName: 'houseConfig',
        isChange: true,
        limitNumber: 5,
        graphic: true,
      },
      livingConfig: {
        type: "line",
        limitNumber: 5,
        isChange: true,
        configName: 'livingConfig',
        title: "日期标题",
        graphic: true,
      },
      showPopup: false,
      clientHeight: 0,
      moveObj: {
        positionY: 300,
        touch: true,
        tranformY: 0,
      }
    };
  },
  components: {},
  onLoad() {
    // 获取设备高度
    let _this = this
    uni.getSystemInfo({
      success: function (res) {
        _this.clientHeight = res.windowHeight;
      }
    });
  },
  methods: {
    handleFilterClick() {
      this.showPopup = true;
    },
    handleChangeEchart(target, val) {
      this.$set(this[target], 'type', val)
    },
    handleTouchStart(e) {
      this.moveObj.touch = true;
      this.moveObj.tranformY = e.touches[0].pageY - this.moveObj.positionY;
    },
    handleTouchMove(e) {
      if (!this.moveObj.touch) return;
      var new_posY = e.touches[0].pageY - this.moveObj.tranformY;
      if (new_posY < 118) {
        new_posY = 100;
      }
      if (new_posY > this.clientHeight - 100) {
        new_posY = this.clientHeight - 100;
      }
      this.moveObj.positionY = new_posY;
    },
    handleTouchEnd(e) {
      if (!this.moveObj.touch) return;
      this.moveObj.touch = false;
      this.moveObj.tranformY = 0;
    },
    handleClosePopup() {
      this.showPopup = false
    },
  },
};
</script>
<style lang="scss" scoped>
.plot_mail {
  position: relative;
  .filter {
    position: fixed;
    width: 80rpx;
    height: 60rpx;
    background: #57aaff;
    right: 0;
    border-radius: 60rpx 0 0 60rpx;
  }
  .plot_header {
    padding: 0 24rpx;
    margin: 0 auto 16rpx auto;
    box-shadow: 0 16px 40px 0 rgba(138, 149, 158, 0.2);
    background: #ffffff;
    .title {
      display: block;
      padding: 16rpx;
      font-size: 28rpx;
      color: #909399;
      flex: 1;
    }
  }
  .echart_box {
    padding: 0 24rpx 24px;
  }
}
::v-deep .u-grid-item {
  padding: 20rpx 0 20rpx 0rpx;
  .money,
  .desc {
    font-size: 16px;
    line-height: 25px;
    > span {
      color: #ff0000;
    }
  }
  .desc {
    color: #909399;
    font-size: 14px;
    font-weight: 400;
  }
}
</style>
