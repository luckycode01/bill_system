<template>
  <div class="h100">
    <div class=" h100" ref="line_main"></div>
  </div>
</template>

<script>
export default {
  name: '',
  props: ['initData', 'config'],
  data() {
    return {
      colorList: [],
      timer: null,
      myChart: null,
    }
  },
  watch: {

  },
  created() {
    this.colorList = this.config && this.config.colorList || ['#44C8D5', '#4B77F8', '#99D17D', '#695BEB', '#3C88F6', '#70D087', '#1DC0B7']
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    })
  },
  beforeDestroy() {
    this.myChart.dispose();
    clearInterval(this.timer);
  },
  methods: {
    // 数据处理
    init() {
      this.myChart = this.$echarts.init(this.$refs['line_main']);
      let name = this.initData.name;
      let legend = Object.keys(this.initData).slice(1);
      let seriesArr = []
      legend.forEach((item, index) => {
        let series = {
          name: item,
          type: 'line',
          areaStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: this.colorList[index]
              },
              {
                offset: 1,
                color: this.colorList[this.colorList.length - 1 - index],
              }
            ]),
            opacity: this.config.opacity || 0,
          },
          stack: this.config.stack ? 'Totla' : '',
          itemStyle: {
            color: this.colorList[index],
          },
          data: this.initData[item],
        }
        seriesArr.push(series)

      })
      let option = {
        backgroundColor: "rgba(255,255,255,0.05)",
        title: {
          show: false,
          text: 'Stacked'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: legend,
          textStyle: {
            color: '#333333',
          }
        },
        grid: {
          left: this.config.left || '2%',
          right: this.config.right || '8%',
          bottom: this.config.bottom || '5%',
          top: this.config.top || '15%',
          containLabel: true
        },
        toolbox: {
          // feature: {
          //   saveAsImage: {}
          // }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: name
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show: false,
            textStyle: {
              color: 'rgba(0,0,0,0.6)',
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: 'rgba(0,0,0,0.4)',
            }
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: true,
          },
        },
        series: [...seriesArr]
      };
      option && this.myChart.setOption(option);
      window.addEventListener("resize", () => {
        if (this.myChart) {
          this.myChart.resize()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
