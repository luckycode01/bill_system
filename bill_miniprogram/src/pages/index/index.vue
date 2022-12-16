<template>
  <view>
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

<style lang="scss" scoped>
v-deep .u-swiper-indicator__wrapper__dot--active {
  width: 5px;
}
.container {
  margin-top: 8px;
  .swiper {
    // height: 80px;
  }
}
</style>
