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
          <view class="nav_right">
            <view class="nav_pub nav_bill">账单</view>
            <view class="nav_pub nav_cards">打牌</view>
          </view>
        </view>
        <!--  -->
        <view class="menu">
          <text class="title">前端专区</text>
          <view class="menu_list"> </view>
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
  margin-top: 16rpx;
  .swiper {
  }
  .layout {
    width: 100%;
    padding: 32rpx;
    box-sizing: border-box;
    .nav {
      width: 100%;
      display: flex;
      justify-content: space-around;
      .nav_note {
        width: 320rpx;
        height: 300rpx;
        text-align: center;
        border: 1px solid #333;
      }
      .nav_right {
        width: 320rpx;
        height: 300rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .nav_pub {
          border: 1px solid #333;
          width: 100%;
          height: 130rpx;
          align-items: center;
          text-align: center;
        }
      }
    }
  }
}
</style>
