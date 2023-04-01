<template>
  <view class="echart">
    <uni-ec-canvas v-if="ec.option" class="uni-ec-canvas" id="line-chart" canvas-id="multi-charts-line" :ec="ec"></uni-ec-canvas>
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
      oIndex: 0,
    };
  },
  components: { uniEcCanvas },
  onLoad() { },
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
    // 滚动数据（重新setOptions）
    scrollData(option) {
      if (!this.initData) return;
      let initName = this.initData.name
      let initVal = this.initData.value;
      let xData, yData;
      // this.oIndex = this.config.limitNumber;
      this.timer = setInterval(() => {
        this.oIndex = (this.oIndex + 1) % initName.length;
        xData = this.splitData(initName);
        yData = this.splitData(initVal);
        option.yAxis.data = xData;
        option.series[0].data = yData;
        this.$set(this.ec, "option", option);
      }, 3000);
    },
    splitData(data) {
      if (this.oIndex < this.config.limitNumber) {
        return data.slice(this.oIndex, this.config.limitNumber + this.oIndex);
      }
      if (this.oIndex > (data.length - this.config.limitNumber)) {
        this.oIndex = 0;
      }
      return data.slice(this.oIndex, this.config.limitNumber + this.oIndex);

      // // 每次向后滚动一个，最后一个从头开始。
      // if (this.oIndex) {
      //   option1.dataZoom[0].endValue = 4;
      //   option1.dataZoom[0].startValue = 0;
      // }
      // else {
      //   option1.dataZoom[0].endValue = option1.dataZoom[0].endValue + 1;
      //   option1.dataZoom[0].startValue = option1.dataZoom[0].startValue + 1;
      // }
    },
    getdata(res) {
      let data = this.initData;
      var name = data.name;
      var value = data.value;
      var valueMax = []; //背景按最大值
      for (let i = 0; i < value.length; i++) {
        valueMax.push(value[0]);
      }
      let option = {
        backgroundColor: "rgba(255,255,255,0.05)",
        grid: {
          left: this.config.left || "5%",
          right: this.config.right || "5%",
          bottom: this.config.bottom || "8%",
          top: this.config.top || "8%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(0,0,0,0.6)",
          axisPointer: {
            type: "none",
          },
          textStyle: {
            fontSize: "13",
            color: "#ffffff",
          },
          formatter: function (params) {
            return params[0].name + " : " + params[0].value;
          },
        },
        xAxis: {
          show: true,
          splitLine: {
            show: true,
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
            show: true,
          },
        },
        yAxis: {
          type: "category",
          data: name,
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
              fontSize: "11",
            },
            margin: 10,
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
        series: [
          {
            type: "bar",
            barWidth: 10,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#5ef3ff",
                    },
                    {
                      offset: 1,
                      color: "#06a4f4",
                    },
                  ],
                  false
                ),
              },
            },
            label: {
              normal: {
                show: true,
                fontSize: 13,
                fontWeight: "400",
                color: "#38d1fb",
                position: "right",
              },
            },
            data: value,
          },
        ],
      };

      //是否开启滚动
      if (this.config.limitNumber) {
        name = this.splitData(name);
        value = this.splitData(value);
        option.yAxis.data = name;
        option.series[0].data = value;
        this.scrollData(option);
      }
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
