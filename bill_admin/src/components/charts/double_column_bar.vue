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
          trigger: 'axis'
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
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: '#333333',
              },
            },
          }
        ],
        series: [
          {
            name: 'Rainfall',
            type: 'bar',
            data: value1,
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
            // markPoint: {
            //   data: [
            //     { name: 'Max', value: 182.2, xAxis: 7, yAxis: 183 },
            //     { name: 'Min', value: 2.3, xAxis: 11, yAxis: 3 }
            //   ]
            // },
            // markLine: {
            //   data: [{ type: 'average', name: 'Avg' }]
            // }
          }
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
