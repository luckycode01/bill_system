<template>
  <view class="content">
    <Header :title="'账单管理'"></Header>
    <waterFall :initDataList="dataList"></waterFall>
  </view>
</template>

<script>
import waterFall from "../../components/waterfall.vue";
export default {
  components: {
    waterFall,
  },
  data() {
    return {
      dataList: [
        {
          id: 1,
          title: "消费一笔",
          detail: "每天记录消费情况",
          name: "user",
          avator: require("../../static/images/bill/logo.jpg"),
          src: require("../../static/images/bill/jl.png"),
        },
        {
          id: 2,
          title: "消费一览",
          detail: "数据分析管理，对数据分析使用图表展示消费数据",
          name: "user",
          avator: require("../../static/images/bill/logo.jpg"),
          src: require("../../static/images/bill/tubiao.png"),
        },
        {
          id: 3,
          title: "账单明细",
          detail: "查看支出以及收入详细信息",
          name: "user",
          avator: require("../../static/images/bill/logo.jpg"),
          src: require(".../../static/images/bill/mingxi.png"),
        },
        {
          id: 4,
          title: "收入记录",
          detail: "记录收入情况,工资收入、副业收入",
          name: "user",
          avator: require("../../static/images/bill/logo.jpg"),
          src: require("../../static/images/bill/shouru.png"),
        },
        {
          id: 5,
          title: "分类管理",
          detail: "消费分类管理移出或添加分类",
          name: "user",
          avator: require("../../static/images/bill/logo.jpg"),
          src: require("../../static/images/bill/category.png"),
        },
        {
          id: 5,
          title: "分类管理",
          detail: "消费分类管理移出或添加分类",
          name: "user",
          avator: require("../../static/images/bill/logo.jpg"),
          src: require("../../static/images/bill/category.png"),
        },
        {
          id: 5,
          title: "分类管理",
          detail: "消费分类管理移出或添加分类",
          name: "user",
          avator: require("../../static/images/bill/logo.jpg"),
          src: require("../../static/images/bill/category.png"),
        },
        {
          id: 5,
          title: "分类管理",
          detail: "消费分类管理移出或添加分类",
          name: "user",
          avator: require("../../static/images/bill/logo.jpg"),
          src: require("../../static/images/bill/category.png"),
        },
      ],
    };
  },
  // 需要在节点加载到页面后调用
  onReady() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  position: absolute;
  top: 0rpx;
  bottom: 0px;
  padding-top: 4px;
  background-color: #eee;
  box-sizing: border-box;
  .bill_list {
    width: 100%;
    margin: auto;
    position: relative;
    .bill_item {
      // width: 348rpx;
      box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
      border-radius: 4px;
      image {
        width: 100%;
      }
      .bill_info {
        width: 100%;
        .title {
          text-align: center;
          font-family: PingFangSC-Regular;
          text-align: center;
          box-sizing: border-box;
          padding: 18rpx 40rpx 0;
          font-size: 36rpx;
          line-height: 36rpx;
          font-weight: bold;
          color: #2b4167;
        }
      }
    }
  }
}
</style>
