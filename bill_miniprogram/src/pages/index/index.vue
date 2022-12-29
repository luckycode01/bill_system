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
            <view class="menu_item" v-for="(item, index) in 4" :key="index">
              <u-image
                src="https://cdn.uviewui.com/uview/album/1.jpg"
                :lazyLoad="true"
                width="140rpx"
                height="140rpx"
                :radius="'18rpx'"
              ></u-image>
              <text>web前端</text>
            </view>
          </view>
        </view>
        <view class="menu">
          <text class="title">好书推荐</text>
          <view class="menu_swiper">
            <view class="my_swiper">
              <view
                ref="swiperRef"
                class="swiper_item"
                v-for="(item, index) in 9"
                :key="index"
              >
                <u-image
                  src="https://cdn.uviewui.com/uview/album/1.jpg"
                  :lazyLoad="true"
                  width="210rpx"
                  height="280rpx"
                  :radius="'18rpx'"
                ></u-image>
              </view>
            </view>
            <view class="swiper_btn pre_btn" @click="handelPre">
              <text></text>
            </view>
            <view class="swiper_btn next_btn" @click="handleNext">
              <text></text>
            </view>
          </view>
        </view>
        <view class="menu">
          <text class="title">后端专区</text>
          <view class="menu_list">
            <view class="menu_item" v-for="(item, index) in 4" :key="index">
              <u-image
                src="https://cdn.uviewui.com/uview/album/1.jpg"
                :lazyLoad="true"
                width="140rpx"
                height="140rpx"
                :radius="'18rpx'"
              ></u-image>
              <text>Java后端</text>
            </view>
          </view>
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
  methods: {
    handelPre() {
      console.log(this);
      // let swiperDom = document.getElementsByClassName(".swiper_item");
      // let swiperSize = {
      //   w: swiperDom,
      // };

      // console.log(swiperDom);
      console.log(111);
    },
    handleNext() {
      console.log(222);
    },
    // 轮播
    initSwiper() {},
  },
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
    padding: 8rpx 32rpx 24rpx;
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
        height: 120rpx;
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
        margin-top: 32rpx;
        display: flex;
        justify-content: space-between;
        .menu_item {
          border-radius: 18rpx;
          text {
            margin: 24rpx auto 0;
            display: block;
          }
        }
      }
      .menu_swiper {
        position: relative;
        margin-top: 24rpx;
        .swiper_item {
          border-radius: 18rpx;
        }
        .swiper_btn {
          position: absolute;
          width: 80rpx;
          height: 80rpx;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.4);
          border-radius: 50%;
        }
        .pre_btn {
          left: -24rpx;
        }
        .next_btn {
          right: -24rpx;
        }
        .pre_btn text,
        .next_btn text {
          position: relative;
        }
        .pre_btn::after,
        .next_btn::after {
          content: "";
          width: 30rpx;
          height: 30rpx;
          position: absolute;
          border-top: 4rpx solid rgb(255, 255, 255, 0.9);
          border-left: 4rpx solid rgb(255, 255, 255, 0.9);
        }
        .pre_btn::after {
          left: 36%;
          top: 30%;
          transform: rotate(-45deg);
        }
        .next_btn::after {
          right: 36%;
          top: 30%;
          transform: rotate(135deg);
        }
      }
    }
  }
}
.my_swiper {
  display: flex;
  overflow: hidden;
  .swiper_item {
    margin-right: 24rpx;
  }
}
</style>
