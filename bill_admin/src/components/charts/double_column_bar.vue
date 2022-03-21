<template>
  <div class="h100">
    <div class=" h100" ref="bar_column_main"></div>
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
    this.colorList = this.config && this.config.colorList || [];
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
      this.myChart = this.$echarts.init(this.$refs['bar_column_main']);
      let name = this.initData.name || [];
      let value1 = this.initData.value1 || [];
      let value2 = this.initData.value2 || [];
      let option = {
        backgroundColor: "rgba(255,255,255,0.05)",
        title: {
          show: false,
          text: 'title',
          subtext: 'Fake Data'
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0,0,0,0.7)',
          textStyle: {
            fontSize: '16',
            color: '#ffffff'
          },
        },
        legend: {
          data: this.initData.legend || [],
          right: "5%",
          itemWidth: 20,
          itemHeight: 10,
        },
        grid: {
          top: "20%",
          bottom: "15%",
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: false, readOnly: false },
            magicType: { show: false, type: ['line', 'bar'] },
            restore: { show: false },
            saveAsImage: { show: false }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            axisLine: {
              show: true,
            },
            splitLine: {
              show: false,
              lineStyle: {
                type: 'dashed'
              },
            },
            axisLabel: {
              color: '#333333',
            },
            data: name,
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              show: true,
            },
            axisLabel: {
              color: 'rgba(0,0,0,0.6)',
              fontSize: 13,
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: 'rgba(0,0,0,0.3)',
              },
            },
          }
        ],
        series: [
          {
            name: 'Rainfall',
            type: 'bar',
            data: value1,
            barWidth: 20,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#5ef3ff'
                }, {
                  offset: 1,
                  color: '#06a4f4'
                }], false)
              },

            },
            label: {
              normal: {
                show: true,
                fontSize: 15,
                fontWeight: '400',
                color: 'rgba(0,0,0,0.6)',
                position: 'top',
              }
            },
            // markPoint: {
            //   data: [
            //     { type: 'max', name: 'Max' },
            //     { type: 'min', name: 'Min' }
            //   ]
            // },
            // markLine: {
            //   data: [{ type: 'average', name: 'Avg' }]
            // }
          },

          {
            name: 'Evaporation',
            type: 'bar',
            data: value2,
            barWidth: 20,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: "#D5F2F4"
                }, {
                  offset: 1,
                  color: "#97DFE6"
                }], false)
              },

            },
            label: {
              normal: {
                show: true,
                fontSize: 15,
                fontWeight: '400',
                color: 'rgba(0,0,0,0.6)',
                position: 'top',
              }
            },
            // markPoint: {
            //   data: [
            //     { type: 'max', name: 'Max' },
            //     { type: 'min', name: 'Min' }
            //   ]
            // },
            // markLine: {
            //   data: [{ type: 'average', name: 'Avg' }]
            // }
          },
        ]
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
