<template>
  <div id="app" v-cloak>
    <section class="login_bg">
      <div class="left">
        <img src="../../assets/img/bj.jpg" alt="">
      </div>
      <div class="login_title">
        <h1>Welcome to login</h1>
      </div>
      <div class="loginPane">
        <div class="back_home">返回首页</div>
        <div class="loginTitle">登录</div>
        <div class="loginInputBox">
          <!-- 表单区 -->
          <el-form :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form" ref="loginFormRef">
            <!-- 用户名 -->
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" placeholder="用户名/邮箱" prefix-icon="iconfont icon-renwu">
              </el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
              <el-input type="password" v-model="loginForm.password" placeholder="用户密码" prefix-icon="iconfont icon-suo">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox label="记住密码" name="type" checked="checked"></el-checkbox>
            </el-form-item>
            <!-- 按钮 -->
            <el-form-item class="btns">
              <el-button type="primary" @click="login">登录</el-button>
              <el-button type="info" @click="resetLoginForm">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </section>
    <canvas id="theCanvas"></canvas>
  </div>

</template>

<script>
import canvan from '../../utils/canva'
export default {
  data() {
    return {
      // 登录表单数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456',
      },
      // 表单验证规则
      loginFormRules: {
        // 用户名验证
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '用户名应在3-10个字符之间', trigger: 'blur' }
        ],
        // 密码验证
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码长度在 6 到 15 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  mounted() {
    canvan();
  },
  methods: {
    // 重置登录表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      /*valid表示验证是否成功  */
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        const res = await reqLogin(this.loginForm)
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        this.$message.success('welcome login')
        // 将登录成功的token保存到sessionstorage
        window.sessionStorage.setItem('token', res.data.token);
        // 编程式导航跳转
        this.$router.push('/home');
      });
    },

  }
}
</script>

<style lang="less" scoped  >
[v-cloak] {
  display: none;
}

.login_bg {
  width: 100%;
  height: calc(50vh);
  // background-color: #4a8cef;
  position: relative;
}

.login_title {
  width: 550px;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
}

.login_title h1 {
  font-size: 28px;
  color: #fff;
  font-weight: 500;
  text-align: center;
  letter-spacing: 1px;
  text-shadow: 0 3px 3px #0b60de;
}

.loginPane {
  width: 550px;
  height: 400px;
  background-color: rgba(219, 209, 209, 0.659);
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transition: ease all 0.5s;
  box-shadow: 0 5px 10px #4a8cef59;
  z-index: 111;
  transform: translateX(-50%);
}

.loginInputBox {
  width: 70%;
  margin: 0 auto;
}

.loginTitle {
  display: block;
  width: 100%;
  height: 65px;
  line-height: 65px;
  font-size: 28px;
  color: #fff;
  font-weight: 500;
  text-align: center;
  letter-spacing: 1px;
  text-shadow: 0 3px 3px #0b60de;
  // margin-left: auto;
  // margin-right: auto;
  margin-top: 23px;
  margin-bottom: 30px;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
canvas {
  width: 100%;
  height: 100%;
  z-index: 0;
}
.left {
  width: 100%;
  height: 200%;
  position: absolute;
  // top: 50%;
  // left: 100px;
  img {
    width: 100%;
    height: 100%;
    opacity: 0.9;
  }
}
</style>
