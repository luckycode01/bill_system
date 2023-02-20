<template>
  <view
    ><me-waterfall>
      <me-waterfall-item wx:for="{{list}}" wx:key="{{index}}">
        <image src="{{item.src}}" style="height:{{item.height}}px;width:100%" />
      </me-waterfall-item>
    </me-waterfall>
  </view>
</template>

<script>
import meWaterfall from "me-waterfall";
export default {
  components: {
    meWaterfall,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style></style>
