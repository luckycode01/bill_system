<template>
  <view>
    <uni-ec-canvas
      class="uni-ec-canvas"
      id="uni-ec-canvas"
      ref="uni-ec-canvas"
      canvas-id="uni-ec-canvas"
      :ec="ec"
      @inited="inited"
    ></uni-ec-canvas>
  </view>
</template>
<script>
import uniEcCanvas from "@/components/uni-ec-canvas/uni-ec-canvas.vue";
export default {
  components: {
    uniEcCanvas,
  },
  props: {
    initData: {
      type: Object,
      default: {
        name: [1, 2, 3, 4, 5, 6],
        value: [6, 5, 4, 3, 2, 1],
      },
    },
    config: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      $echart: null,
      ec: {
        option: {},
      },
    };
  },
  watch: {},
  created() {
     this.handleOption();
  },
  mounted() {},
  updated() {
   
  },
  beforeDestroy() {},
  methods: {
    inited(curChart) {
      console.log(curChart);
      this.$echart = curChart;
    },
    handleOption() {
      let data = this.initData;
      let option = {
        backgroundColor: "rgba(255,255,255,0.05)",
        title: {
          text: "title",
          show: false,
          textStyle: {
            color: "#333333",
            fontSize: 16,
          },
          padding: 0,
          top: 1,
          left: "center",
        },
        tooltip: {
          show: true,
          trigger: "item",
          position: "top",
          backgroundColor: "rgba(0,0,0,0.7)",
          textStyle: {
            fontSize: "16",
            color: "#ffffff",
          },
          formatter: "{a} {b} : {c} ({d}%)",
        },
        legend: {
          show: false,
          type: "scroll",
          orient: "vertical",
          // orient: 'horizontal',
          icon: this.config.icon || "circle",
          itemWidth: this.config.itemWidth || 14, //小圆点宽度
          itemHeight: 14, // 小圆点高度
          right: this.config.legendRight || "15%",
          // align: 'left',
          top: "middle",
          textStyle: {
            color: "#333333",
          },
          height: 300,
        },
        series: [
          {
            name: "",
            type: "pie",
            center: this.config.center || ["50%", "50%"],
            radius: this.config.radius || [0, "60%"],
            itemStyle: {
              color: (params) => {
                return colorArr[params.dataIndex];
              },
            },
            label: {
              show: true, //false不显示饼图上的标签
              position: "outside", //inside（在饼图上显示）,outside(默认就会出现引导线) center
              color: "#333333",
              rich: {
                text1: {
                  fontSize: "13",
                  lineHeight: "20",
                  color: "#41A7DC",
                },
              },
              formatter: (params) => {
                return `{text1|${params.name} : }${params.value}\n${params.percent}%`;
              },
            },
            emphasis: {
              //启用鼠标放上去放大效果
              scale: true,
              scaleSize: 5,
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            labelLine: {
              show: true, //显示引导线
              length: 10, //连接饼图第1段线条的长度 length length2 不写自适应
              length2: 10, //链接饼图第2段线条长度
              smooth: false, //是否光滑连接线
            },
            data: data,
          },
        ],
      };
      this.$set(this.ec, "option", option);
    },
  },
};
</script>

<style scoped>
.uni-ec-canvas {
  width: 100%;
  height: 500rpx;
  display: block;
}
</style>
