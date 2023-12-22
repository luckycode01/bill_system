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
        value: [],
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
      this.myChart = this.$echarts.init(this.$refs.chartRef)
      let seriesList = [];
      const colorList = this.config.colorList || ["#18c5e7", "#00CD66", "#03d9f5", "#ee752f", "#69bbc4"];
      const colorList1 = this.config.colorList1 || ["#9fe6f4", "#54FF9F", "#3ae7fc", "#ee752f", "#69bbc4"];
      data.value.forEach((item, index) => {
        let seriesItem = {
          name: (data.name && data.name[index]) || "",
          type: "bar",
          label: {
            show: Object.is(this.config.showLabel, undefined) ? true : false,
            position: "top",
            textStyle: {
              color: colorList[index] || "rgba(136 ,136 ,136 ,1)",
              fontSize: 12
            },
            formatter: "{c}"
          },
          barWidth: this.config.barWidth || 'auto',
          itemStyle: {

            normal: {
              color: (params) => {
                return new _this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: colorList[index] // 0% 处的颜色
                }, {
                  offset: 1,
                  color: colorList1[index] // 100% 处的颜色
                }], false)
              },
            }
          },
          data: item
        }
        seriesList.push(seriesItem)
      })
      let option = {
        title: {
          show: this.config.showTitle ? true : false,
          text: this.config.title,
        },
        backgroundColor: "transparent",
        tooltip: {
          show: Object.is(this.config.showTooltip, undefined) ? true : false,
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
          itemWidth: 8,
          itemHeight: 8,
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
                color: "rgba(136 ,136 ,136 ,0.3)",
              }
            },

            axisLabel: {
              //坐标轴刻度标签的相关设置
              textStyle: {
                color: "rgba(136 ,136 ,136 ,1)",
                fontWeight: 400,
              },
              margin: 20,
              align: 'center',
              rotate: this.config.isRaotate ? this.config.isRaotate : 0,
            },
            axisTick: {
              show: true,
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
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(136 ,136 ,136 ,0.15)",
                type: 'solid'
              }
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "rgba(136 ,136 ,136 ,0.6)",
                type: "solid",
              },
            },
            axisLabel: {
              margin: 20,
              textStyle: {
                color: "rgba(136 ,136 ,136 ,1)",
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