<template>
  <div class="container">
    <el-row :gutter="16">
      <el-col :span="6" v-for="item in 1" :key="item">
        <div class="top-card flex">
          <div class="left flex-column space-between">
            <span>访问人数</span>
            <span class="num">9999</span>
          </div>
          <div class="right">
            <!-- <LineChart :initData="initData1" :config="echartConfig"></LineChart> -->
            <BarChart :initData="initData2" :config="echartConfig2"></BarChart>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LineChart from "./components/echarts/LineChart.vue";
import BarChart from "./components/echarts/BarChart.vue";
export default {
  name: "Index",
  components: {
    LineChart,
    BarChart
  },
  data() {
    return {
      initData1: {
        name: [],
        xData: [],
        value: [],
      },
      initData2: {
        name: [],
        xData: [],
      },
      echartConfig: {
        symbolSize: 0.5,
        top: '10%',
        bottom: '10%',
        lineWidth: 2,
        showLabel: false,
        showXAxis: false,
        showYAxis: false,
      },
      echartConfig2: {
        left: '10%',
        showLabel: false,
        showXAxis: false,
        showYAxis: false,
        showTooltip: '',
      }
    };
  },
  created() {
    this.getInitData1();
  },
  methods: {
    getInitData1() {
      this.initData1.name = ['n1'];
      for (let i = 0; i < 50; i++) {
        this.initData1.xData.push(i + 1);
        this.initData1.value.push((Math.random() * 10).toFixed(2))
      }
      // ------------
      this.initData2.name = ['n1', 'n2'];
      const value1 = [], value2 = [];
      for (let i = 0; i < 20; i++) {
        this.initData2.xData.push(i + 1);
        value1.push((Math.random() * 10).toFixed(2))
        value2.push((Math.random() * 10).toFixed(2))
      }
      this.initData2.value1 = value1;
      this.initData2.value2 = value2;
      // --------------
    }
  },
};
</script>

<style scoped lang="scss">
.container {
  .top-card {
    width: 100%;
    height: 100px;
    padding: 16px;
    background: linear-gradient(to right, #b4e9f9, #f1f9fe);
    .left {
      width: 80px;
      font-size: 13px;
      span {
        margin-bottom: 12px;
      }
      .num {
        font-size: 16px;
        font-weight: 500;
      }
    }
    .right {
      flex: 1;
    }
  }
}
</style>
