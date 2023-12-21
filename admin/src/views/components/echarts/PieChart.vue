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
        name: ['n1', 'n2', 'n3'],
        value: [20, 15, 18],
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
    init() {
      const _this = this;
      const data = this.initData.name.map((item, index) => { return { name: item, value: this.initData.value[index] } })
      console.log(111, data);
      this.myChart = this.$echarts.init(this.$refs.chartRef)
      const colorList = this.config.colorList || ["#165DFF", "#00B2FF", "#8C4EDA", "#80E2FF"];
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}:({d}%)',
        },
        legend: {
          show: Object.is(this.config.showLegend, undefined) ? true : false,
          top: 'center',
          orient: 'vertical',
          right: '10%',
          itemWidth: 16,
          itemHeight: 16,
          icon: 'circle',
          itemGap: 20,
          textStyle: {
            color: '#fff',
            fontSize: 18,
            padding: [0, 0, 0, 10],
          },
          data: _this.initData.name,
        },
        grid: {
          containLabel: true,
        },
        series: [
          {
            type: 'pie',
            radius: _this.config.radius || ['40%', '60%'],
            center: _this.config.center || ['40%', '50%'],
            color: colorList,
            label: {
              position: 'outside',
              show: Object.is(this.config.showLabel, undefined) ? true : false,
              color: '#fff',
              textBorderColor: 'inherit',
              textBorderWidth: 1,
              fontSize: 16,
              formatter: function (params) {
                if (params.name !== '') {
                  return params.percent + '%';
                }
              },
            },
            labelLine: {
              show: Object.is(this.config.showLabelLine, undefined) ? true : false,
              length2: 10,
              length: 10,
            },
            data: data,
          },
        ],
      }
      this.myChart.setOption(option)
      window.addEventListener("resize", () => {
        this.myChart.resize()
      })
    }
  }
}
</script>

<style scoped></style>