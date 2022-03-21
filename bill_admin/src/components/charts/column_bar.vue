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
    handleData() {
      let data = this.initData;
      // 降序
      data.sort((a, b) => {
        return b.value - a.value
      })
      let dataArr = {
        name: [],
        value: [],
      }
      data.forEach(item => {
        dataArr.name.push(item.name);
        dataArr.value.push(item.value);
      })
      return dataArr;
    },
    init() {
      this.myChart = this.$echarts.init(this.$refs['bar_column_main']);
      let data = this.handleData();

      var name = data.name;
      var value = data.value;
      var valueMax = [];//背景按最大值
      for (let i = 0; i < value.length; i++) {
        valueMax.push(value[0])
      }
      let option = {
        backgroundColor: "rgba(255,255,255,0.05)",
        grid: {
          left: this.config.left || '5%',
          right: this.config.right || '5%',
          bottom: this.config.bottom || '5%',
          top: this.config.top || '15%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0,0,0,0.7)',
          axisPointer: {
            type: 'none'
          },
          textStyle: {
            fontSize: '16',
            color: '#ffffff'
          },
          formatter: function (params) {
            return params[0].name + ' : ' + params[0].value
          }
        },
        xAxis: {
          data: name,
          axisLine: {
            lineStyle: {
              color: '#3d5269'
            }
          },
          axisLabel: {
            color: '#333333',
            fontSize: 14
          }
        },
        yAxis: {
          name: "单位:次",
          nameTextStyle: {
            color: '#333333',
            fontSize: 16
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#3d5269'
            }
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
            }
          },
          interval: 20,

        },
        series: [
          {
            type: 'bar',
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
              }
            },
            label: {
              normal: {
                show: true,
                fontSize: 15,
                fontWeight: '400',
                color: '#333333',
                position: 'top',
              }
            },
            data: value,
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
