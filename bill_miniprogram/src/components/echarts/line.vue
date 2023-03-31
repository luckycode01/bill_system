<template>
  <view class="echart">
    <uni-ec-canvas
      v-if="ec.option"
      class="uni-ec-canvas"
      id="line-chart"
      canvas-id="multi-charts-line"
      :ec="ec"
    ></uni-ec-canvas>
  </view>
</template>
<script>
import uniEcCanvas from "@/components/uni-ec-canvas/uni-ec-canvas.vue";
import * as echarts from "@/components/uni-ec-canvas/echarts";
export default {
  props: ["initData", "config"],
  data() {
    return {
      colorList: [],
      ec: {},
    };
  },
  components: { uniEcCanvas },
  onLoad() {},
  created() {
    this.colorList = (this.config && this.config.colorList) || [
      "#3C9CFF",
      "#FEEBB4",
      "#FFF2ED",
      "#FFDBDB",
      "#EDE8FF",
      "#ECE7FF",
      "#D0E3FF",
      "#BAD6FF",
      "#D2C7FF",
      "#D0C5FE",
      "#FDA3A3",
      "#FECBA0",
      "#FEE498",
      "#D5F2F4",
    ];
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata(res) {
      let name = this.initData.name;
      let legend = Object.keys(this.initData).slice(1);
      let seriesArr = [];
      legend.forEach((item, index) => {
        let series = {
          name: item,
          type: "line",
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: this.colorList[index],
              },
              {
                offset: 1,
                color: this.colorList[this.colorList.length - 1 - index],
              },
            ]),
            opacity: this.config.opacity || 0,
          },
          stack: this.config.stack ? "Totla" : "",
          itemStyle: {
            color: this.colorList[index],
          },
          label: {
            normal: {
              show: true,
              fontSize: 13,
              fontWeight: "400",
              color: "#3c9cff",
              position: "top",
            },
          },
          data: this.initData[item],
        };
        seriesArr.push(series);
      });
      let colorArr = [];
      let length = this.colorList.length;
      for (let i = 0; i < Math.ceil(length / 2); i++) {
        //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
        //数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
        let colorItem = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: this.colorList[i] },
          { offset: 1, color: this.colorList[length - i - 1] },
        ]);
        colorArr.push(colorItem);
      }
      let option = {
        backgroundColor: "rgba(255,255,255,0.05)",
        title: {
          show: false,
          text: "Stacked",
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(0,0,0,0.7)",
          textStyle: {
            fontSize: "14",
            color: "#ffffff",
          },
        },
        legend: {
          show: false,
          data: legend,
          textStyle: {
            color: "#c5c6ca",
          },
        },
        grid: {
          left: this.config.left || "5%",
          right: this.config.right || "8%",
          bottom: this.config.bottom || "8%",
          top: this.config.top || "15%",
          containLabel: true,
        },
        toolbox: {
          // feature: {
          //   saveAsImage: {}
          // }
        },
        xAxis: {
          data: name,
          show: true,
          splitLine: {
            show: false,
            lineStyle: {
              color: "#eef1f5",
            },
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#868686",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            fontSize: "11",
            show: true,
            interval: 0,
            rotate: 45,
          },
        },
        yAxis: {
          type: "value",
          triggerEvent: true, // 坐标是否响应鼠标事件，默认false
          axisLine: {
            show: true,
            lineStyle: {
              color: "#eef1f5",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#868686",
              fontSize: "13",
            },
            margin: 20,
            show: true,
            formatter: (params) => {
              let len = params.length;
              let newLen = this.config.axisLen || 100;
              if (len > newLen) {
                return params.slice(0, newLen) + "...";
              } else {
                return params;
              }
            },
            interval: 0,
          },
        },
        series: [...seriesArr],
      };
      this.$set(this.ec, "option", option);
    },
  },
};
</script>
<style scoped>
.echart {
  width: 100%;
  height: 100%;
}
</style>
