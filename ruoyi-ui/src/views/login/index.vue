<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-main">
        <div class="login-hidden">
          <div class="logo anticon">
            <img src="@/assets/logo/avatar.jpg" />
            <div class="">
              Lucky 服务平台
            </div>
          </div>
          <div class="login-auto">
            <img :alt="title" src="@/assets/images/svg/login-box-bg.svg" class="w-1/2 -mt-16 -enter-x" />
            <div class="title">
              <span> {{title }}</span>
            </div>
            <div class="desc">
              输入您的个人详细信息开始使用！
            </div>
          </div>
        </div>
        <div class="login-form">
          <div class="form-main">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="密码登录" name="password">
                <LoginForm />
              </el-tab-pane>
              <el-tab-pane label="验证码登录" name="code">
                
              </el-tab-pane>
            </el-tabs>
            <ForgetPasswordForm />
            <RegisterForm />
            <MobileForm />
            <QrCodeForm />
            <el-divider>其他登录方式</el-divider>
            <div class="othen-login flex space-around">
              <img src="@/assets/images/png/weixin.png" alt="">
              <img src="@/assets/images/png/qq.png" alt="">
              <img src="@/assets/images/png/github.png" alt="">
              <img src="@/assets/images/png/google.png" alt="">
              <img src="@/assets/images/png/Twitter.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "./components/LoginForm";
export default {
  components: { LoginForm },
  data() {
    return {
      activeName:'password',
      title: process.env.VUE_APP_TITLE,
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  box-sizing: border-box;
}
::v-deep .el-tabs__nav-wrap::after{
  display: none;
}
.login {
  &-container {
    width: 100%;
    height: 100%;
    padding: 0 16px;
    overflow: hidden;
    position: relative;
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin-left: -48%;
      background: url("~@/assets/images/svg/login-bg.svg") no-repeat 100%;
      background-size: auto 100%;
      content: "";
    }
  }
  &-box {
    max-width: 1200px;
    height: 100%;
    padding: 30px 40px 0;
    margin: auto;
    .login-main {
      height: 100%;
      position: relative;
      display: flex;
      .othen-login {
        img {
          width: 28px;
          height: 28px;
          cursor: pointer;
        }
      }
      ::v-deep .el-tabs__content{
        min-width: 400px;
        min-height: 272px;
      }
      ::v-deep .el-tabs__item{
        font-size: 20px;
        font-weight: 700;
      }
    }
    .login-hidden {
      width: 50%;
      margin-right: 1rem;
      padding-left: 16px;
      display: flex;
      .anticon {
        text-align: center;
        text-transform: none;
        margin-left: 8px;
        font-size: 24px;
        color: #fff;
        font-weight: 700;
        transition: all 0.5s;
        line-height: normal;
        cursor: pointer;
      }
      .logo {
        display: flex;
        width: 50%;
        height: 80px;
        position: absolute;
        top: 8px;
        align-items: center;
        img {
          width: 48px;
          height: 48px;
          margin-right: 8px;
        }
      }
      .login-auto {
        margin: auto;
        color: #fff;
        img {
          width: 50%;
          height: auto;
          margin-top: -4rem;
        }
        .title {
          font-size: 1.875rem;
          line-height: 2.25rem;
          margin-top: 2.5rem;
          font-weight: 500;
          span {
            margin-top: 1rem;
          }
        }
        .desc {
          font-size: 14px;
          margin-top: 1.25rem;
          font-weight: 400;
        }
      }
    }
    .login-form {
      width: 50%;
      height: 100%;
      display: flex;
      .form-main {
        padding: 1rem;
        margin: auto auto auto 4rem;
      }
    }
  }
}
</style>