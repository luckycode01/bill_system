<template>
  <div class="header">
    <div class="header-top">
      <div class="container">欢迎使用本系统！</div>
    </div>
    <div class="container header_content" style="">
      <div class="row">
        <div class="logo" @click="$router.push('/home')">
          <img src="../../assets/img/logo.jpg" alt="logo" title="logo">
          logo
        </div>
        <div class="nav-top" id="nav_top">
          <ul class="toolbar">
            <li><a href="javaScript:;" @click="selectMenu(0)" :class="isActive == 0? 'active':''">首页</a></li>
            <li @mouseenter="moveEnter(1)" @mouseleave="moveLeave(1)">
              <a href="javaScript:;" @click="selectMenu(1)" :class="isActive == 1? 'active':''">快捷入口</a>
              <transition name="animation">
                <div class="menu_more sanjiao" v-show="isShowMenuMore">
                  <div class="item">入口一</div>
                  <div class="item">入口二</div>
                  <div class="item">入口三</div>
                </div>
              </transition>
            </li>
            <li><a href="javaScript:;" @click="selectMenu(2)" :class="isActive == 2? 'active':''">主要活动</a></li>
            <li><a href="javaScript:;" @click="selectMenu(3)" :class="isActive == 3? 'active':''">关于我们</a></li>
            <li @mouseenter="moveEnter(4)" @mouseleave="moveLeave(4)">
              <a href="javaScript:;" @click="selectMenu(4)" :class="isActive == 4? 'active':''">移动端</a>
              <transition name="animation">
                <div class="qr_code sanjiao " v-show="isShowQrcode">
                  <img src="../../assets/img/lucky.png" alt="">
                  <span>扫我打开移动端</span>
                </div>
              </transition>
            </li>
          </ul>
        </div>
      </div>
      <div class="login" @click="toLogin">
        <i>per</i>
        登录/注册
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ['menuIndex'],
  data() {
    return {
      isActive: 0,
      isShowMenuMore: false,
      isShowQrcode: false,
    }
  },
  created() {
    this.isActive = this.menuIndex;
  },
  methods: {
    selectMenu(index) {
      this.isActive = index;
      switch (index) {
        case 0:
          this.$router.push('/home'); break;
        case 1: this.$router.push('/home'); break;
        case 2: this.$router.push('/mainactivite'); break;
        case 3: this.$router.push('/about'); break;
        case 4: this.$router.push('/home'); break;
      }
    },
    moveEnter(index) {
      if (index == 1)
        this.isShowMenuMore = true;
      else if (index == 4)
        this.isShowQrcode = true;
    },
    moveLeave(index) {
      if (index == 1)
        this.isShowMenuMore = false;
      else if (index == 4)
        this.isShowQrcode = false;
    },
    toLogin() {
      this.$router.push('/login')
    }
  },
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  margin: auto;
  border-bottom: 1px solid #e0e0e0;
  .header-top {
    height: 30px;
    line-height: 30px;
    background: #e9e9e9;
  }
  .header_content {
    height: 80px;
    // line-height: 76px;
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
      cursor: pointer;

      img {
        width: 40px;
        height: 40px;
      }
    }
    .nav-top {
      ul {
        list-style: none;
        & > li {
          float: left;
          margin-right: 10px;
          a {
            display: inline-block;
            width: 100px;
            line-height: 40px;
            text-align: center;
            font-weight: bold;
            font-size: 15px;
            text-decoration: none;
          }
          &:hover {
            background: #00aeef;
            border-radius: 20px;
          }
          &:hover a {
            color: #ffffff;
          }
          .active {
            background: #00aeef;
            border-radius: 20px;
            color: #ffffff;
          }
          .menu_more {
            width: 120px;
            background: #ffffff;
            position: absolute;
            // margin-top: 3px;
            z-index: 10;
            box-shadow: 0 1px 5px #aaa;
            box-sizing: border-box;
            .item {
              padding-left: 10px;
              width: 100%;
              height: 35px;
              line-height: 35px;
              font-size: 14px;
              border-bottom: 1px solid rgba(216, 215, 215, 0.6);

              cursor: pointer;
              &:hover {
                background: rgba(216, 215, 215, 0.6);
              }
            }
          }
          .sanjiao::before {
            content: "";
            width: 10px;
            height: 10px;
            position: absolute;
            background: #ffffff;
            left: 40%;
            top: -5px;
            transform: rotate(45deg);
          }
          .qr_code {
            width: 100px;
            height: 150px;
            background: #ffffff;
            position: absolute;
            // margin-top: 3px;
            z-index: 10;
            box-shadow: 0 1px 5px #aaa;
            box-sizing: border-box;
            img {
              width: 95px;
              height: 95px;
              margin: 10px auto;
            }
            span {
              width: 100%;
              font-size: 13px;
            }
          }
        }
      }
    }
  }
  .login {
    width: 100px;
    line-height: 76px;
    text-align: right;
  }
}
.animation-enter-active,
.animation-leave-active {
  transition: all 0.5s;
}
.animation-enter,
.animation-leave-to {
  opacity: 0;
}
</style>

