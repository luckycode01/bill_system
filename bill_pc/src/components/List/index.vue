<template>
  <div class="product">
    <div class="pro_serve"><span>项目列表</span></div>
    <div class="container product_main">
      <div class="product_item" v-for="(item,index) in dataList" :key="index">
        <img src="../../assets/img/logo.jpg" alt="">
        <span class="title">项目一</span>
        <span class="desc">我是账单分析</span>
        <span class="address">项目地址：<a href="javascript:;">https://github.com/****</a></span>
      </div>
      <!-- <div class="product_item">
        <img src="../../assets/img/logo.jpg" alt="">
        <span class="title">项目二</span>
        <span class="desc">我是账单分析</span>
        <span class="address">项目地址：<a href="">https://github.com/****</a></span>
      </div> -->
      <div class="product_item" @click="showMore" v-if="$route.meta.index == 1">
        <div class="more">
          <span>查看更多</span>
          <span class="more_icon"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: ['dataList'],
  data() {
    return {

    }
  },
  methods: {
    showMore() {
      this.$router.push("/morelist");
    }
  },
}
</script>

<style lang="less" scoped>
.product {
  width: 100%;
  position: relative;
  margin-bottom: 30px;
  .pro_serve {
    width: 100%;
    height: 80px;
    text-align: center;
    line-height: 80px;
    font-weight: 400;
    color: #03639d;
    font-size: 22px;
    span {
      position: relative;
    }
    span::before,
    span::after {
      content: "";
      width: 100px;
      height: 1px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: #03639d;
    }
    span::before {
      left: -120px;
    }
    span::after {
      right: -120px;
    }
  }
  .product_main {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .product_item {
      width: 30%;
      height: 227px;
      border: #d9d9d9 1px solid;
      text-align: center;
      padding: 25px;
      margin-bottom: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      cursor: pointer;
      &:hover {
        z-index: 2;
        box-shadow: 0 15px 30px rgb(0 0 0 / 10%);
        transform: translate3d(0, -2px, 0);
        transition: all 0.2s linear;
      }
      img {
        width: 80px;
        height: 80px;
      }
      .title {
        font-size: 18px;
        height: 30px;
        line-height: 30px;
        font-weight: bold;
        color: #2b4167;
      }
      .address {
        a {
          color: #00aeef;
        }
      }
      .more {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        color: #03639d;
        cursor: pointer;
        .more_icon {
          position: relative;
          margin-left: 5px;
          width: 30px;
          height: 30px;
          border: 2px solid #03639d;
          border-radius: 50%;
        }
        .more_icon::before,
        .more_icon::after {
          content: "";
          width: 10px;
          height: 10px;
          position: absolute;
          transform: translateY(-50%);
          border-top: 2px solid #03639d;
          border-right: 2px solid #03639d;
          top: 50%;
          transform: translateY(-50%) rotate(45deg);
        }
        .more_icon::before {
          left: 10%;
        }
        .more_icon::after {
          right: 20%;
        }
      }
    }
    &::after {
      content: "";
      width: 30%;
    }
  }
}
</style>
