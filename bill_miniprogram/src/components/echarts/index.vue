<template>
  <view class="echart_main">
    <view class="header">
      <text class="title">XXXX-XX-XXXXXX-XX-XX标题</text>
      <view class="tab_change" v-if="config.isChange">
        <view class="tab_item" @click="handelClickTab('pie')" :class="tabActive == 'pie' ? 'active' : ''">标签1</view>
        <view class="tab_item" @click="handelClickTab('line')" :class="tabActive == 'line' ? 'active' : ''">标签2</view>
        <view class="tab_item" @click="handelClickTab('bar')" :class="tabActive == 'bar' ? 'active' : ''">标签3</view>
      </view>
    </view>
    <u-line></u-line>
    <view class="echart">
      <Pie v-if="Pie" :initData="initData" :config="config"></Pie>
      <Line v-if="Line" :initData="initData" :config="config"></Line>
      <Bar v-if="Bar" :initData="initData" :config="config"></Bar>
    </view>
  </view>
</template>

<script>
import Pie from "@/components/echarts/pie.vue";
import Line from "@/components/echarts/line.vue";
import Bar from "@/components/echarts/bar.vue";
export default {
  components: {
    Pie,
    Line,
    Bar
  },
  props: ["initData", "config"],
  data() {
    return {
      tabActive: 'pie',
    };
  },
  computed: {
    Pie() {
      return this.config.type.toLocaleLowerCase() == "pie";
    },
    Line() {
      return this.config.type.toLocaleLowerCase() == "line";
    },
    Bar() {
      return this.config.type.toLocaleLowerCase() == "bar";
    },
  },
  watch: {
    config: {
      immediate: true,
      handler(newVal, oldVal) {
        console.log(newVal, oldVal);
        this.tabActive = newVal.type.toLocaleLowerCase();
      }
    }
  },
  methods: {
    handelClickTab(tabIndex) {
      this.tabActive = tabIndex;
      this.$emit('handleChangeEchart', this.config.configName, tabIndex);
    },
  },
};
</script>

<style lang="scss" scoped>
.echart_main {
  width: 100%;
  height: 100%;
  box-shadow: 0 16px 40px 0 rgba(138, 149, 158, 0.2);
  margin: 12rpx auto;
  background: #ffffff;
  .echart {
    height: 400rpx;
  }
  .header {
    display: flex;
    font-size: 28rpx;
    .title {
      padding: 16rpx;
      color: #909399;
      flex: 1;
    }
    .tab_change {
      display: flex;
      align-items: center;
      font-size: 22rpx;
      padding: 0 4rpx 0 0;
      .tab_item {
        border: 1px solid #3c9cff;
        border-right: none;
        padding: 6rpx 12rpx;
        &.active {
          background: #3c9cff;
          color: #ffffff;
        }
      }
      .tab_item:first-child {
        border-radius: 4rpx 0 0 4rpx;
      }
      .tab_item:nth-child(3) {
        border-radius: 0 4rpx 4rpx 0;
        border-right: 1px solid #3c9cff;
      }
    }
  }
  .u-grid-item {
    padding: 10rpx 0 20rpx 0rpx;
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
}
</style>
