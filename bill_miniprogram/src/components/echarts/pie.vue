<template>
  <view class="echart">
    <uni-ec-canvas
      v-if="ec.option"
      class="uni-ec-canvas"
      id="line-chart"
      canvas-id="multi-charts-line"
      :ec="ec"
    ></uni-ec-canvas>
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
    };
  },
  components: { uniEcCanvas },
  onLoad() {},
  created() {
    this.colorList = (this.config && this.config.colorList) || [
      "#D5F2F4",
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
      "#97DFE6",
    ];
  },
  mounted() {
    this.getdata();
  },
  methods: {
    // 数据处理
    handleData() {
      let data = [];
      this.initData.name &&
        this.initData.name.forEach((item, index) => {
          data.push({
            name: item,
            value: this.initData.value[index],
          });
        });
      // 降序
      data.sort((a, b) => {
        return b.value - a.value;
      });
      return data;
    },
    getdata(res) {
      let data = this.handleData();
      let colorArr = [];
      let length = this.colorList.length;
      for (let i = 0; i < Math.ceil(length / 2); i++) {
        //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
        //数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
        let colorItem = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: this.colorList[i] },
          { offset: 1, color: this.colorList[length - i - 1] },
        ]);
        colorArr.push(colorItem);
      }
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
          position: "bottom",
          backgroundColor: "rgba(0,0,0,0.7)",
          textStyle: {
            fontSize: "16",
            color: "#ffffff",
          },
          formatter: "{a} {b} : {c} ({d}%)",
        },
        color: this.config.graphic ? colorArr : this.colorList,
        legend: {
          show: false,
          type: "scroll",
          orient: "horizontal" || "vertical",
          icon: this.config.icon || "circle",
          itemWidth: this.config.itemWidth || 14, //小圆点宽度
          itemHeight: 14, // 小圆点高度
          left: "2%",
          right: this.config.legendRight || "5%",
          top: "bottom",
          textStyle: {
            color: "#333333",
          },
          height: 300,
        },
        series: [
          {
            name: "",
            type: "pie",
            center: this.config.center || ["50%", "48%"],
            radius: this.config.radius || [0, "50%"],
            itemStyle: {
              color: (params) => {
                console.log(params);
                return colorArr[0];
              },
            },
            label: {
              show: true, //false不显示饼图上的标签
              position: "outside", //inside（在饼图上显示）,outside(默认就会出现引导线) center
              color: "#909399",
              fontSize: 12,
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
.echart {
  width: 100%;
  height: 100%;
}
</style>
