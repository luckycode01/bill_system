<template>
  <div class="content">
    <div class="main">
      <div class="header">
        <div class="header-top">
          <div class="container">欢迎使用本系统！</div>
        </div>
        <div class="container header_content" style="">
          <div class="row">
            <div class="logo">
              <img src="../../assets/img/logo.jpg" alt="logo" title="logo">
              logo
            </div>
            <div class="nav-top" id="nav_top">
              <ul class="toolbar">
                <li><a href="javaScript:;" class="active">首页</a></li>
                <li><a href="javaScript:;">快捷入口</a></li>
                <li><a href="javaScript:;">主要活动</a></li>
                <li><a href="javaScript:;">关于我们</a></li>
                <li><a href="javaScript:;">移动端</a></li>
              </ul>
            </div>
          </div>
          <div class="login">
            <i>per</i>
            登录/注册
          </div>
        </div>
      </div>
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
      <div class="product">
        <div class="pro_serve"><span>我的项目</span></div>
        <div class="container product_main">
          <div class="product_item">
            <img src="../../assets/img/logo.jpg" alt="">
            <span class="title">项目一</span>
            <span class="desc">我是账单分析</span>
            <span class="address">项目地址：<a href="">https://github.com/****</a></span>
          </div>
          <div class="product_item">
            <img src="../../assets/img/logo.jpg" alt="">
            <span class="title">项目二</span>
            <span class="desc">我是账单分析</span>
            <span class="address">项目地址：<a href="">https://github.com/****</a></span>
          </div>
          <div class="product_item">
            <div class="more">
              <span>查看更多</span>
              <span class="more_icon"></span>
            </div>
          </div>
        </div>
      </div>

      <div class="fn_bg">
        <ul class="f_nav clearfix">
          <li>
            <a href="javascript:;">
              <img src="" alt="" />
              <span>联系我们</span>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <img src="" alt="" />
              <span>在线客服</span>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <img src="" alt="" />
              <span>关注我们</span>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <img src="" alt="" />
              <span>一键分享</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="bq">Copyright © 2022 永不言弃</div>
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
      .header_content {
        height: 80px;
        line-height: 76px;
        position: relative;
        display: flex;
      }

      .row {
        height: 80px;
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: space-between;
        .logo {
          width: 100px;
          height: 80px;
          display: flex;
          align-items: center;

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
      .login {
        width: 100px;
        text-align: right;
      }
    }

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
            background: #00aeef;
            color: #ffffff !important;
          }
          &:hover span,
          &:hover span a {
            color: #fff;
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
    .fn_bg {
      width: 100%;
      background: #232323;
      padding-top: 25px;
    }
    .fn_bg .f_nav {
      width: 1170px;
      margin: 0px auto;
      text-align: center;
    }
    .fn_bg .f_nav li {
      display: inline-block;
      *display: inline;
      zoom: 1;
      height: 45px;
      line-height: 45px;
      margin: 0 28px 25px;
    }
    .fn_bg .f_nav li img {
      width: 45px;
      height: 45px;
      vertical-align: top;
    }
    .fn_bg .f_nav li span {
      display: inline-block;
      *display: inline;
      zoom: 1;
      height: 45px;
      line-height: 45px;
      vertical-align: top;
      font-size: 14px;
      color: #bebebe;
      font-weight: bold;
      margin-left: 10px;
    }
    .fn_bg .f_nav li a:hover span {
      color: #fff;
    }
    .bq {
      width: 100%;
      background: #131313;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 12px;
      color: #bebebe;
    }
    .bq a {
      color: #bebebe;
    }
  }
}
</style>