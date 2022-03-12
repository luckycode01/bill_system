<template>
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
</template>

<script>
export default {
  name: 'Header',
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
</style>

