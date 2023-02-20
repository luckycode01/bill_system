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
          height="140"
        ></u-swiper>
      </view>
      <view class="layout">
        <view class="nav">
          <view class="nav_note">
            <image
              src="../../static/images/note2.gif"
              style="width: 100%; height: 100%"
              mode="scaleToFill"
          /></view>
          <view class="nav_bill">
            <image
              src="../../static/images/bill.gif"
              style="width: 100%; height: 100%"
              mode="scaleToFill"
            />
          </view>
          <view class="nav_cards">
            <image
              @click="handleToscore"
              src="../../static/images/yule.png"
              style="width: 100%; height: 100%"
              mode="scaleToFill"
            />
          </view>
        </view>
        <!--  -->
        <view class="menu">
          <view class="title">
            <text class="left">前端必看</text>
            <text class="right">查看更多 >></text>
          </view>
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
          <view class="title">
            <text class="left">每日精选</text>
            <!-- <text class="right">查看更多 >></text> -->
          </view>
          <view class="menu_swiper">
            <u-scroll-list>
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
                <view class="info">
                  <text>javascript</text>
                </view>
              </view>
            </u-scroll-list>
          </view>
        </view>
        <view class="menu">
          <view class="title">
            <text class="left">后端专区</text>
            <text class="right">查看更多 >></text>
          </view>
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
export default {
  components: {},
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
    handleToscore() {
      uni.navigateTo({ url: "/pages/score/score" });
    },
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
      height: 420rpx;
      // display: flex;
      // justify-content: space-between;
      > view {
        width: 330rpx;
        height: 200rpx;
        box-shadow: 4px 4px #f7f7f7;
        text-align: center;
        border-radius: 16rpx;
        margin-bottom: 24rpx;
        float: right;
        image {
          border-radius: 16rpx;
        }
      }
      .nav_note {
        width: 330rpx;
        height: 420rpx;
        float: left;
      }
    }
    .menu {
      margin-top: 64rpx;
      .title {
        font-size: 36rpx;
        font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif,
          "Ping Fang";
        font-weight: 400;
        position: relative;
        padding: 0 0 0 32rpx;
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
        .right {
          float: right;
          font-size: 14px;
          color: #b3afaf;
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
        margin-top: 32rpx;
        .swiper_item {
          margin-right: 24rpx;
          display: flex;
          text-align: center;
          flex-direction: column;
          .info {
            margin-top: 12px;
          }
        }
      }
    }
  }
}
.my_swiper {
  display: flex;
  overflow: hidden;
}
</style>
