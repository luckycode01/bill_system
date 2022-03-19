<template>
  <div class="h100">
    <div class=" h100" ref="bing_main"></div>
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
    this.colorList = this.config && this.config.colorList || ["#D5F2F4", "#FEEBB4", "#FFF2ED", "#FFDBDB", "#EDE8FF", "#ECE7FF", "#D0E3FF", "#BAD6FF", "#D2C7FF", "#D0C5FE", "#FDA3A3", "#FECBA0", "#FEE498", "#97DFE6"];
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
      return data
    },
    init() {
      this.myChart = this.$echarts.init(this.$refs['bing_main']);
      let data = this.handleData();
      let colorArr = [];
      let length = this.colorList.length;
      for (let i = 0; i < Math.ceil(length / 2); i++) {
        //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
        //数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
        let colorItem = new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: this.colorList[i] },
          { offset: 1, color: this.colorList[length - i - 1] }
        ])
        colorArr.push(colorItem);
      }
      let option = {
        backgroundColor: "rgba(255,255,255,0.05)",
        title: {
          text: 'title',
          show: false,
          textStyle: {
            color: '#333333',
            fontSize: 16,
          },
          padding: 0,
          top: 1,
          left: 'center',
        },
        tooltip: {
          show: true,
          trigger: 'item',
          position: 'top',
          backgroundColor: 'rgba(0,0,0,0.7)',
          textStyle: {
            fontSize: '16',
            color: '#333333'
          },
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          type: "scroll",
          orient: 'vertical',
          // orient: 'horizontal',
          icon: this.config.icon || 'circle',
          itemWidth: this.config.itemWidth || 14, //小圆点宽度
          itemHeight: 14, // 小圆点高度
          right: this.config.legendRight || '15%',
          // align: 'left',
          top: 'middle',
          textStyle: {
            color: '#333333'
          },
          height: 300
        },
        series: [
          {
            name: '',
            type: 'pie',
            center: this.config.center || ["45%", "50%"],
            radius: this.config.radius || [0, "60%"],
            itemStyle: {
              color: params => {
                return colorArr[params.dataIndex]
              },
            },
            label: {
              show: true, //false不显示饼图上的标签
              position: 'outside', //inside（在饼图上显示）,outside(默认就会出现引导线) center
              color: '#333333',
              rich: {
                text1: {
                  fontSize: '13',
                  lineHeight: '20',
                  color: "#41A7DC"
                }
              },
              formatter: params => {
                return `{text1|${params.name} : }${params.value}\n${params.percent}%`
              },
            },
            emphasis: {
              //启用鼠标放上去放大效果
              scale: true,
              scaleSize: 5,
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
            labelLine: {
              show: true, //显示引导线
              length: 10, //连接饼图第1段线条的长度 length length2 不写自适应
              length2: 10, //链接饼图第2段线条长度
              smooth: false, //是否光滑连接线
            },
            data: data,
          }
        ]
      };
      option && this.myChart.setOption(option);
      var index = -1; //播放所在下标,使得tootip每隔三秒自动显示
      this.timer = setInterval(() => {
        this.myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: index
        });
        this.myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: index + 1
        });
        this.myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: index + 1
        });
        index++;
        if (index >= option.series[0].data.length) {
          index = -1;
        }
      }, 1500)
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
