<template>
  <view>
    <Header isBack :title="'图表统计'"></Header>
    <view class="echart_box">
      <EchartBox :initData="initData" :config="config"></EchartBox>
      <EchartBox :initData="initData" :config="config1"></EchartBox>
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
      initData: [
        { value: 10, name: "甲" },
        { value: 90, name: "乙" },
        { value: 35, name: "丙" },
        { value: 25, name: "丁" },
        { value: 50, name: "戊" },
        { value: 35, name: "已" },
        { value: 35, name: "庚" },
      ],
      config: {
        graphic: true,
      },
      config1: {
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
.echart_box {
  width: 100%;
  height: 300rpx;
}
</style>
