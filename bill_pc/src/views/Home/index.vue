<template>
  <div class="content">
    <div class="main">
      <Header :menuIndex="menuIndex"></Header>
      <div class="swiper clearbox">
        <div class="swiper-container" :ref="'refName'">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in bannerList " :key="item.id">
              <img :src="item.imgUrl" />
            </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>
          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      </div>
      <div class="product">
        <div class="pro_serve"><span>账单服务</span></div>
        <div class="container product_main">
          <div class="product_item">
            <img src="../../assets/img/logo.jpg" alt="">
            <span class="title">账单分析</span>
            <span class="desc">专业的分析师和科学的分析工具<br>帮助企业量</span>
          </div>
          <div class="product_item">
            <img src="../../assets/img/logo.jpg" alt="">
            <span class="title">账单分析</span>
            <span class="desc">我是账单分析</span>
          </div>
          <div class="product_item">
            <img src="../../assets/img/logo.jpg" alt="">
            <span class="title">账单分析</span>
            <span class="desc">我是账单分析</span>
          </div>
          <div class="product_item">
            <img src="../../assets/img/logo.jpg" alt="">
            <span class="title">账单分析</span>
            <span class="desc">我是账单分析</span>
          </div>
        </div>
      </div>
      <List :dataList="dataList"></List>
      <Back ref="backRef" v-if="isShowBack"></Back>
      <Footer></Footer>
    </div>
  </div>
</template>
<script>
import Swiper from 'swiper'
import List from '../../components/List/index.vue'
import Back from "./back.vue"
export default {
  components: {
    Back
  },
  data() {
    return {
      bannerList: [
        {
          id: 1,
          imgUrl: require("../../assets/img/swiper_1_3.jpg")
        },
        {
          id: 2,
          imgUrl: require("../../assets/img/xiaomimix.jpg")
        },
        {
          id: 3,
          imgUrl: require("../../assets/img/3.jpg")
        },
      ],
      dataList: [],
      isShowBack: false,
      menuIndex: 0,//默认菜单高亮
    };
  },
  created() {
    this.dataList = 2;

  },
  mounted() {
    window.addEventListener('scroll', this.onscroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.onscroll);
  },

  watch: {
    bannerList: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          new Swiper(this.$refs.refName, {
            // direction: 'vertical', // 垂直切换选项 
            loop: true,
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            // // 如果需要滚动条
            // scrollbar: {
            //   el: '.swiper-scrollbar',
            // },
          });
        });
      }
    }
  },
  components: { List, Back },
  methods: {
    onscroll() {
      // 滚动时当前位置距顶部的距离
      var topScroll = document.documentElement.scrollTop;
      console.log(this.isShowBack);
      if (topScroll > 100) {
        this.isShowBack = true;
        // this.$refs.backRef.style.display = 'block'
      } else {
        // 小于的时候让他恢复原状
        this.isShowBack = false;
        // this.$refs.backRef.style.display = 'none'
      }
    }
  },
}

</script>

<style scoped lang="less">
.content {
  width: 100%;
  .main {
    width: 100%;
    margin: auto;

    .swiper {
      box-sizing: border-box;
      width: 100%;
      height: 395px;
      .swiper-container {
        height: 100%;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    /deep/.swiper-pagination-bullet {
      width: 12px;
      height: 12px;
      display: inline-block;
      background: rgba(0, 0, 0, 0.4);
      border: 2px solid #fff;
      border-color: hsla(0, 0%, 100%, 0.3);
      border-radius: 10px;
      overflow: hidden;
      background: rgba(0, 0, 0, 0.4);
      opacity: 1;
    }
    /deep/ .swiper-pagination-bullet-active {
      background: hsla(0, 0%, 100%, 0.4);
      border-color: rgba(0, 0, 0, 0.4);
    }
    /deep/.swiper-button-next {
      right: 0;
    }
    /deep/.swiper-button-prev {
      left: 0;
    }
    /deep/.swiper-button-next::after,
    /deep/.swiper-button-prev::after {
      color: #767474;
      font-size: 28px;
    }
    /deep/.swiper-button-next:hover,
    /deep/ .swiper-button-prev:hover {
      background: #bfbdbd;
      opacity: 0.5;
    }
    .product {
      width: 100%;
      position: relative;
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
      }
    }
  }
}
</style>