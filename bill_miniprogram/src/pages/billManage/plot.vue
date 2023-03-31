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
    <view class="echart_box">
      <EchartBox :initData="payData" :config="payConfig"></EchartBox>
      <EchartBox :initData="payData" :config="houseConfig"></EchartBox>
      <EchartBox :initData="payData" :config="livingConfig"></EchartBox>
    </view>
  </view>
</template>
<script>
import EchartBox from "@/components/echarts/index";
export default {
  components: {
    EchartBox,
  },
  data() {
    return {
      payData: {
        name: [
          "甲甲甲甲",
          "乙乙乙",
          "丙丙丙丙",
          "丁丁丁丁",
          "戊戊戊",
          "已已",
          "庚庚庚庚",
          "戊戊戊",
          "戊戊戊",
          "戊戊戊",
          "戊戊戊",
          "戊戊戊",
        ],
        value: [10, 90, 23, 34, 38, 23, 50, 36,8, 23, 50, 36],
      },
      payConfig: {
        type: "Pie",
        title: "日期标题",
        isChange: true,
        graphic: true,
      },
      houseConfig: {
        type: "Line",
        title: "日期标题",
        isChange: true,
        graphic: true,
      },
      livingConfig: {
        type: "Bar",
        isChange: true,
        title: "日期标题",
        graphic: true,
      },
    };
  },
  components: {},
  onLoad() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.plot_mail {
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
