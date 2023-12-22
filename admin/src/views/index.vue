<template>
  <div class="container">
    <el-row :gutter="16">
      <el-col :span="6" v-for="(item, index) in topList" :key="item.title">
        <div class="top-card flex" :class="'color' + (index + 1)">
          <div class="left flex-column space-between">
            <span>{{ item.title }}</span>
            <span class="num">{{ item.value }}</span>
          </div>
          <div class="right">
            <LineChart v-if="item.cName == 'LineChart'" :initData="initData1" :config="echartConfig"></LineChart>
            <BarChart v-if="item.cName == 'BarChart'" :initData="initData2" :config="echartConfig2"></BarChart>
            <PieChart v-if="item.cName == 'PieChart'" :initData="initData3" :config="echartConfig3"></PieChart>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="echart-box">
          <LineChart v-if="threeYearsOutData.xData.length" :initData="threeYearsOutData" :config="threeYearsOutConfig"></LineChart>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="echart-box">
          <LineChart v-if="threeYearsOutData.xData.length" :initData="threeYearsInData" :config="threeYearsInConfig"></LineChart>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="echart-box">
          <BarChart v-if="currentMonthData.value.length" :initData="currentMonthData" :config="currentMonthConfig"></BarChart>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LineChart from "./components/echarts/LineChart";
import BarChart from "./components/echarts/BarChart";
import PieChart from "./components/echarts/PieChart";
import { getTimeData } from "@/utils/index"
export default {
  name: "Index",
  components: {
    LineChart,
    BarChart,
    PieChart,
  },
  data() {
    return {
      topList: [
        {
          title: "本月支出额",
          value: "4532",
          cName: "LineChart",
        },
        {
          title: "本月收入",
          value: "6666",
          cName: "BarChart",
        },
        {
          title: "访问总人数",
          value: "9999",
          cName: "LineChart",
        },
        {
          title: "分享总量",
          value: "8888",
          cName: "PieChart",
        },
      ],
      initData1: {
        name: [],
        xData: [],
        value: [],
      },
      initData2: {
        name: [],
        xData: [],
      },
      initData3: {
        name: [],
        value: [],
      },
      echartConfig: {
        symbolSize: 0.5,
        top: "10%",
        bottom: "10%",
        lineWidth: 2,
        showLabel: false,
        showXAxis: false,
        showYAxis: false,
        showTooltip: false,
      },
      echartConfig2: {
        left: "10%",
        showLabel: false,
        showXAxis: false,
        showYAxis: false,
        showTooltip: "",
      },
      echartConfig3: {
        showLabelLine: false,
        showLabel: false,
        showLegend: false,
        radius: ['60%', '90%'],
      },
      currentMonthData: {
        name: [],
        xData: [],
        value: [],
      },
      currentMonthConfig: {
        title: '本月数据',
        isRaotate: 45,
        top: '20%',
        bottom: '20%',
        showTitle: true,
        barWidth: 15,
      },
      threeYearsOutData: {
        name: [],
        xData: [],
        value1: [],
        value2: [],
        value3: [],
      },
      threeYearsOutConfig: {
        title: '近三年数据对比',
        showTitle: true,
        bottom: '15%',
        left: '10%',
        top: '20%',
      },
      threeYearsInData: {
        name: [],
        xData: [],
        value1: [],
        value2: [],
        value3: [],
      },
      threeYearsInConfig: {
        title: '近三年数据对比',
        showTitle: true,
        bottom: '15%',
        left: '10%',
        top: '20%',
      }
    };
  },
  created() {
    this.getInitData1();
  },
  methods: {
    getInitData1() {
      this.initData1.name = ["n1"];
      for (let i = 0; i < 50; i++) {
        this.initData1.xData.push(i + 1);
        this.initData1.value.push((Math.random() * 10).toFixed(2));
      }

      // ------------
      this.initData2.name = ["n1", "n2"];
      const value1 = [],
        value2 = [];
      for (let i = 0; i < 20; i++) {
        this.initData2.xData.push(i + 1);
        value1.push((Math.random() * 10).toFixed(2));
        value2.push((Math.random() * 10).toFixed(2));
      }
      this.initData2.value1 = value1;
      this.initData2.value2 = value2;

      // --------------
      for (let i = 0; i < 4; i++) {
        this.initData3.name.push('n' + (i + 1));
        this.initData3.value.push((Math.random() * 10).toFixed(2));
      }

      // ------------
      const { year, month, day } = getTimeData();
      this.currentMonthData.name = [`${year}近一月数据`]
      for (let i = 1; i <= day; i++) {
        this.currentMonthData.xData.push(`${month}-${i}`);
        this.currentMonthData.value.push((Math.random() * 10).toFixed(2));
      }

      // ---------------
      for (let i = 1; i <= 12; i++) {
        this.threeYearsOutData.xData.push(`${i}月`);
        this.threeYearsOutData.value1.push((Math.random() * 10).toFixed(2));
        this.threeYearsOutData.value2.push((Math.random() * 10).toFixed(2));
        this.threeYearsOutData.value3.push((Math.random() * 10).toFixed(2));

        this.threeYearsInData.xData.push(`${i}月`);
        this.threeYearsInData.value1.push((Math.random() * 10).toFixed(2));
        this.threeYearsInData.value2.push((Math.random() * 10).toFixed(2));
        this.threeYearsInData.value3.push((Math.random() * 10).toFixed(2));
      }
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  .top-card {
    width: 100%;
    height: 110px;
    padding: 16px;
    border-radius: 6px;
    background: linear-gradient(to right, #caeef9, #f1f9fe);
    &.color2 {
      background: linear-gradient(to right, #d9f8cf, #f1f9fe);
    }

    &.color3 {
      background: linear-gradient(to right, #ededff, #f1f9fe);
    }

    &.color4 {
      background: linear-gradient(to right, #c0e6f1, #f1f9fe);
    }

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
  .el-row {
    margin-bottom: 32px;
  }
  .echart-box {
    height: 270px;
    color: rgb(136, 136, 136);
  }
}
</style>
