<template>
  <view class="">
    <Header :title="'首页'"></Header>
    <view class="container">
      <view class="swiper">
        <u-swiper
          :list="list3"
          previousMargin="30"
          nextMargin="30"
          circular
          :autoplay="true"
          :indicator="true"
          :indicatorMode="'dot'"
          radius="5"
          bgColor="#ffffff"
          height="108"
        ></u-swiper>
      </view>
      <view class="layout">
        <view class="nav">
          <view class="nav_note">我的笔记</view>
          <view class="nav_bill">账单</view>
          <view class="nav_cards">打牌</view>
        </view>
        <!--  -->
        <view class="menu">
          <text class="title">前端专区</text>
          <view class="menu_list">
            <view>
              <u-image src="../../static/images/1.jpg"></u-image>
            </view>
            <view></view>
            <view></view>
            <view></view>
          </view>
        </view>
        <view class="menu">
          <text class="title">好书推荐</text>
          <view class="menu_list"> </view>
        </view>
        <view class="menu">
          <text class="title">后端专区</text>
          <view class="menu_list"> </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Header from "../../components/Header";
export default {
  components: {
    Header,
  },
  data() {
    return {
      list3: [
        "https://cdn.uviewui.com/uview/swiper/swiper3.png",
        "https://cdn.uviewui.com/uview/swiper/swiper2.png",
        "https://cdn.uviewui.com/uview/swiper/swiper1.png",
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
v-deep .u-swiper-indicator__wrapper__dot--active {
  width: 5rpx;
}
.container {
  padding: 24rpx 0;
  background: #f9f8f8;
  .swiper {
  }
  .layout {
    width: 100%;
    padding: 8rpx 32rpx;
    margin: 32rpx 0 0;
    box-sizing: border-box;
    border-radius: 32rpx 32rpx 0 0;
    background: #ffffff;
    .nav {
      width: 100%;
      display: flex;
      justify-content: space-between;
      > view {
        width: 30%;
        height: 100rpx;
        border: 1px solid #333;
        text-align: center;
        border-radius: 16rpx;
      }
    }
    .menu {
      margin-top: 48rpx;
      .title {
        font-size: 36rpx;
        font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif,
          "Ping Fang";
        font-weight: 600;
        position: relative;
        padding: 0 32rpx;
        &::after {
          content: "";
          height: 36rpx;
          width: 16rpx;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          background: #56aaff;
          border-radius: 4rpx;
        }
      }

      .menu_list {
        height: 100px;
        display: flex;
        justify-content: space-between;
        > view {
          width: 140rpx;
          height: 140rpx;
          border-radius: 18rpx;
          border: 1px solid #333;
          .u-image {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
