<template>
  <div class="layout">
    <div class="top">
      <div>主要活动一</div>
      <div>主要活动二</div>
      <div>主要活动三</div>
    </div>
    <div class="content">
      <vue-waterfall-easy ref="waterfall" :mobileGap="10" :imgsArr="imgsArr">
        <template v-slot="props">
          <div class="water-title">{{props.value.title}}</div>
          <div class="water-detail">
            <div class="userInfo">
              <img src="" alt="" />
              <div class="name">瀑布流</div>
            </div>
            <div class="area">
              <img src="" alt="" />
              <div class="textNum">100</div>
            </div>
          </div>
        </template>
      </vue-waterfall-easy>
    </div>
  </div>
</template>

<script>
import vueWaterfallEasy from "vue-waterfall-easy";
export default {
  name: "Main",
  components: {
    vueWaterfallEasy,
  },
  data() {
    return {
      imgsArr: [
        {
          title: "测试数据",
          src: require("../../assets/img/logo.png"),
        },
        {
          title: "测试数据",
          src: require("../../assets/img/logo.png"),
        },
        {
          title: "测试数据",
          src: require("../../assets/img/logo.png"),
        },

      ],
    }
  }
};
</script>

<style lang="less" scoped>
.layout {
  width: 375px;
  background: #eeeeee;
  // padding: 2px 10px;
  margin: auto;
  box-sizing: border-box;
}
.top {
  width: 365px;
  height: 50px;
  background: #eeeeee;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  div {
    width: 31%;
    height: 45px;
    line-height: 45px;
    background-color: red;
  }
}
.content {
  width: 100%;
  position: absolute;
  top: 96px;
  bottom: 0px;
  padding-top: 10px;
  background-color: #eee;
  box-sizing: border-box;
  .vue-waterfall-easy-container {
    background-color: #eeeeee;
    height: 800px;
    overflow: hidden;
    margin: 0 auto;
    .vue-waterfall-easy-scroll {
      height: 100%;
      overflow-x: hidden;
      overflow-y: scroll;
    }
  }
  .water-title {
    width: 177.5px;
    background-color: #fff;
    padding: 9px 8px 0;
    color: #333;
    font-size: 14px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-family: PingFangSC-Regular;
    text-align: center;
    box-sizing: border-box;
  }
  .water-detail {
    font-size: 0.24rem;
    padding: 0.17rem 0.16rem 0.24rem;
    display: flex;
    justify-content: space-between;
    width: 177.5px;
    background-color: #fff;
    box-sizing: border-box;
    .userInfo {
      display: flex;
      justify-content: right;
      img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 1px solid #d9d9d9;
      }
      .name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 11px;
        color: #7f7f7f;
        height: 24px;
        line-height: 24px;
        margin-left: 4px;
      }
    }
    .area {
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      img {
        width: 16px;
        height: 16px;
      }
      .textNum {
        font-size: 12px;
        color: #7f7f7f;
        max-width: 45px;
        text-align: right;
        height: 16px;
        line-height: 16px;
        margin-left: 1px;
      }
    }
  }
}
</style>
