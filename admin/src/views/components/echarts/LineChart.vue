<template>
  <div class="h100 chart_content" ref="chartRef"></div>
</template>
<script>
export default {
  data() {
    return {
      myChart: null,
      cTime: null,
    }
  },
  props: {
    config: {
      typeof: Object,
      default: () => ({}),
    },
    initData: {
      typeof: Object,
      default: () => ({
        name: ['n1', 'n2'],
        xData: [],
        value: []
      }),
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },
  beforeDestroy() {
    this.myChart.dispose()
    clearInterval(this.cTime)
  },
  components: {},
  methods: {
    handleData() {
      const data = this.initData;
      const res = {
        name: data.name,
        xData: data.xData,
        value: [],
      }
      const keys = Object.keys(data);
      keys.forEach(item => {
        if (item != 'name' && item != 'xData') {
          res.value.push(data[item]);
        }
      })
      return res
    },
    init() {
      const _this = this;
      const data = this.handleData();
      console.log(111, data);
      this.myChart = this.$echarts.init(this.$refs.chartRef)
      let seriesList = [];
      const colorList = this.config.colorList || ["#2B70D5", "#81b337", "#dbbe77", "#ee752f", "#69bbc4"];
      const areaColorList = ["rgba(0, 74, 148, 1)", "rgba(0, 101, 111, 1)", "rgba(100, 111, 52, 1)"];
      data.value.forEach((item, index) => {
        let seriesItem = {
          name: (data.name && data.name[index]) || "",
          type: "line",
          smooth: _this.config.smoothType == 'notSmooth' ? false : true, //是否平滑曲线显示
          showAllSymbol: true,
          symbol: "circle",
          symbolSize: _this.config.symbolSize || 4,
          lineStyle: {
            normal: {
              color: colorList[index] || "#dbbe77", // 线条颜色
              width: _this.config.lineWidth || 1,
            },
          },
          label: {
            show: Object.is(this.config.showLabel, undefined) ? true : false,
            position: "top",
            textStyle: {
              color: colorList[index] || "rgba(255, 255, 255,0.7)",
              fontSize: _this.config.fontSize ? _this.config.fontSize : 12
            },
            formatter: _this.config.ispercent ? "{c}%" : "{c}"
          },
          areaStyle: {
            //区域填充样式
            normal: {
              //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。
              color: new _this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: areaColorList[index] || "rgba(100, 111, 52, 1)"
              }, {
                offset: 1,
                color: "rgba(0,0,0, 0)"
              }], false),
              opacity: _this.config.isShadow || 0,
              shadowColor: areaColorList[index] || "rgba(53,142,215, 0.9)", //阴影颜色
              shadowBlur: 20 
            }
          },
          data: item
        }
        seriesList.push(seriesItem)
      })
      let option = {
        backgroundColor: "transparent",
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          showContent: true,
        },
        grid: {
          top: this.config.top || "5%",
          left: this.config.left || "5%",
          right: this.config.right || "5%",
          bottom: this.config.bottom || "5%",
        },
        color: colorList,
        legend: {
          show: this.config.showLegend || false,
          icon: 'circle',
          itemGap: 50,
          top: "2%",
          itemWidth: 6,
          itemHeight: 6,
          data: data.name,
          textStyle: {
            color: "#f9f9f9",
            borderColor: "#fff"
          },
        },
        xAxis: [
          {
            show: Object.is(this.config.showXAxis, undefined) ? true : false,
            type: "category",
            boundaryGap: true,
            axisLine: {
              //坐标轴轴线相关设置。数学上的x轴
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,1)"
              }
            },

            axisLabel: {
              //坐标轴刻度标签的相关设置
              textStyle: {
                color: "rgba(255,255,255,1)",
                margin: 15,
                fontSize: this.config.xFontSize || 15,
                fontWeight: 100,
                fontFamily: "PingFang SC",
              },
              interval: this.config.interval ? this.config.interval : 'auto',
              align: 'center',
              rotate: this.config.isRaotate ? this.config.isRaotate : 0,
            },
            axisTick: {
              show: true
            },
            data: data.xData
          }],
        yAxis: [
          {
            show: Object.is(this.config.showYAxis, undefined) ? true : false,
            type: "value",
            nameTextStyle: {
              color: '#fff',
              fontSize: 16,
              padding: [0, 70, 0, 0]
            },
            // splitNumber: 7,
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255, 255, 255, 1)",
                type: 'solid'
              }
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              margin: 20,
              textStyle: {
                color: "#333333",
                fontSize: 12
              },
              formatter: (params) => {
                return this.config.ispercent ? params + "%" : params;
              },
            },
            axisTick: {
              show: false
            }
          },
          {
            type: "value",
            show: false
          },
          {
            type: "value",
            show: false
          }
        ],
        series: [...seriesList]
      }

      this.myChart.setOption(option)
      window.addEventListener("resize", () => {
        this.myChart.resize()
      })
    }
  }
}
</script>

<style scoped>
</style>