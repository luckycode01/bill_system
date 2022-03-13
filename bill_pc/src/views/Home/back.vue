<template>
  <div class="back" @mouseenter="mouseoverBack(false)" @mouseleave="mouseoverBack(true)">
    <div class="text" v-show="!isBack"><a href="#"><span class="desc">回到顶部</span></a></div>
    <div class="icon" v-show="isBack"><a href="#"><i class="iconfont ">&#xe62b;</i></a></div>
    <div class="icon" v-show="!isBack"><a href="#"><i class="iconfont ">&#xe62c;</i></a></div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      isBack: true,

    }
  },
  methods: {
    mouseoverBack(val) {
      this.isBack = val
    }
  },

}

</script>

<style lang="less" scoped>
.back {
  width: 30px;
  height: 30px;
  position: fixed;
  right: 10px;
  bottom: 135px;
  display: flex;
  align-items: center;
  .iconfont {
    // position: relative;
    margin: 0 auto 8px;
    width: 30px;
    height: 30px;
    font-size: 25px;
  }
  .text {
    width: 80px;
    height: 30px;
    line-height: 30px;
    margin-right: 10px;
    background: #e4e4e4;
    position: absolute;
    right: 30px;
    border-radius: 5px;

    &::after {
      content: " ";
      width: 13px;
      height: 13px;
      position: absolute;
      right: 0px;
      top: 50%;
      background: #e4e4e4;
      transform: rotate(45deg) translateY(-50%);
    }
  }
  .desc {
    width: 80px;
    display: block;
    text-align: center;
    color: #ff6721;
  }
  .icon {
    width: 35px;
    height: 35px;
    background: #e4e4e4;
    a {
      width: 35px;
      height: 35px;
      display: block;
      text-align: center;
      line-height: 35px;
      opacity: 0.5;
    }
  }
  a:hover {
    text-decoration: none;
  }
}
</style>
