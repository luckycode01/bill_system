<template>
  <view class="content">
    <Header :title="'账单管理'"></Header>
    <waterFall :initDataList="dataList" @click="handleClick">
      <template slot-scope="{ props }">
        <view class="water-title">{{ props.title }}</view>
        <view class="water-title-info">{{ props.detail }}</view>
        <view class="water-detail">
          <view class="userInfo">
            <image :src="props.avator" alt="" />
            <view class="name">{{ props.name }}</view>
          </view>
        </view>
      </template>
    </waterFall>
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
          name: "useruseruseruseruseruser",
          avator: require("../../static/images/bill/logo.jpg"),
          src: require("../../static/images/bill/jl.png"),
          path: "/pages/billManage/addpay",
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
      ],
    };
  },
  // 需要在节点加载到页面后调用
  onReady() {},

  methods: {
    handleClick(e, row) {
      uni.navigateTo({
        url: row.path,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  padding-top: 4px;
  .water-title {
    width: 100%;
    background-color: #fff;
    padding: 8rpx 20rpx 0;
    font-family: PingFangSC-Regular;
    text-align: center;
    box-sizing: border-box;
    font-size: 36rpx;
    line-height: 60rpx;
    font-weight: bold;
    color: #2b4167;
  }
  .water-title-info {
    width: 100%;
    background-color: #fff;
    padding: 8rpx 20rpx 0;
    font-family: PingFangSC-Regular;
    text-align: left;
    box-sizing: border-box;
    font-size: 28rpx;
    line-height: 28px;
    color: #333333;
  }
  .water-detail {
    width: 100%;
    font-size: 24rpx;
    padding: 8rpx 20rpx 16rpx;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    box-sizing: border-box;
    .userInfo {
      display: flex;
      justify-content: right;
      image {
        width: 48rpx;
        height: 48rpx;
        border-radius: 50%;
        border: 1px solid #d9d9d9;
      }
      .name {
        max-width: 66%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 22rpx;
        color: #7f7f7f;
        height: 48rpx;
        line-height: 48rpx;
        margin-left: 8rpx;
      }
    }
    .area {
      width: 100rpx;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      image {
        width: 32rpx;
        height: 32rpx;
      }
      .textNum {
        font-size: 24rpx;
        color: #7f7f7f;
        max-width: 90rpx;
        text-align: right;
        height: 32rpx;
        line-height: 32rpx;
        margin-left: 1px;
      }
    }
  }
}
</style>
