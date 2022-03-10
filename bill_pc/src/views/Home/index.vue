<template>
  <div class="content">
    <div class="main">
      <div class="header">
        <div class="header-top">
          <div class="container">欢迎使用本！</div>
        </div>
        <div class="container" style="height:80px; line-height:76px; position:relative;">
          <div class="row">
            <div class="logo">
              <img src="../../assets/img/logo.jpg" alt="logo" title="logo">
            </div>
            <div class="nav-top" id="nav_top">
              <ul class="toolbar">
                <li><a href="javaScript:;" class="active">首页</a></li>
                <li><a href="javaScript:;">主营业务</a></li>
                <li><a href="javaScript:;">主要活动</a></li>
                <li><a href="javaScript:;">关于我们</a></li>
                <li><a href="javaScript:;">联系我们</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper">
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

      <!-- <div class="footer">
        <div class="go_top" id="go_top" style="display: none;"></div>
        <div class="footer-first font12 footer-flow">
          Copyright © 2022-03-10 版权所有
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
import Swiper from 'swiper'
export default {
  data() {
    return {
      bannerList: [
        {
          id: 1,
          imgUrl: require('../../assets/img/swiper_1_3.jpg')
        },
        {
          id: 2,
          imgUrl: require('../../assets/img/xiaomimix.jpg')
        },
        {
          id: 3,
          imgUrl: require('../../assets/img/3.jpg')
        },
      ]
    }
  },
  mounted() {
  },
  methods: {
  },
  watch: {
    bannerList: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          new Swiper(this.$refs.refName, {
            // direction: 'vertical', // 垂直切换选项 
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            // // 如果需要滚动条
            // scrollbar: {
            //   el: '.swiper-scrollbar',
            // },
          })
        });
      }
    }
  }
}
</script>

<style scoped lang="less">
.container {
  width: 85%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.content {
  width: 100%;
  .main {
    width: 100%;
    margin: auto;
    .header {
      width: 100%;
      margin: auto;
      .header-top {
        height: 30px;
        line-height: 30px;
        background: #e9e9e9;
      }
    }

    .row {
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .logo {
        width: 40px;
        height: 40px;
        img {
          width: 40px;
          height: 40px;
        }
      }
      .nav-top {
        ul {
          list-style: none;
          li {
            float: left;
            margin-right: 10px;
            a {
              display: inline-block;
              width: 95px;
              line-height: 40px;
              text-align: center;
              font-weight: bold;
              font-size: 15px;
              text-decoration: none;
            }
            .active {
              background: #00aeef;
              border-radius: 20px;
              color: #fff;
            }
          }
        }
      }
    }
    .swiper {
      box-sizing: border-box;
      width: 100%;
      height: 395px;
      float: left;
      .swiper-container {
        height: 100%;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>