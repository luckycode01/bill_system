<template>
  <view>
    <Header :title="'首页'"></Header>
    <u-button text="月落"></u-button>
    <view class="container">
      <view class="swiper">
        <u-swiper
          :list="list3"
          previousMargin="30"
          nextMargin="30"
          circular
          :autoplay="false"
          radius="5"
          bgColor="#ffffff"
        ></u-swiper>
      </view>
      <view class="layout"> </view>
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

<style></style>
