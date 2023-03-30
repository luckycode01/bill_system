<template>
  <view class="echart_main">
    <Pie :initData="initData" :config="config"></Pie>
  </view>
</template>

<script>
import Pie from "@/components/echarts/pie.vue";
export default {
  components: {
    Pie,
  },
  props: ["initData", "config"],
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.echart_main {
  width: 100%;
  height: 100%;
}
</style>
