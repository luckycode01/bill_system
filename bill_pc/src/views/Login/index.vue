<template>
  <div id="app" v-cloak>
    <section class="login_bg">
      <div class="left">
        <img src="../../assets/img/bj.jpg" alt="">
      </div>
      <div class="login_title">
        <h1>Welcome to login</h1>
      </div>
      <div class="loginPane" v-show="loginPane">
        <div class="back_home" @click="$router.push('/home')"><i class="iconfont icon">&#xe62e;</i> 返回首页</div>
        <div class="loginTitle">登录</div>
        <div class="loginInputBox">
          <!-- 表单区 -->
          <el-form :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form" ref="loginFormRef">
            <!-- 用户名 -->
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" placeholder="请输入用户名/邮箱" prefix-icon="el-icon-user-solid">
              </el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
              <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" prefix-icon="el-icon-lock">
              </el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-input style="width:220px;" v-model="loginForm.code" placeholder="请输入图形验证码" prefix-icon="el-icon-lock">
              </el-input>
              <img class="codeImg" src="../../assets/img/3.jpg" alt="">
            </el-form-item>
            <el-form-item style="position: relative;">
              <el-checkbox label="记住密码" name="type" checked="checked"></el-checkbox>
              <div class="register" @click="toRegister">没有账号，立即注册</div>
            </el-form-item>
            <!-- 按钮 -->
            <el-form-item class="btns">
              <el-button type="primary" @click="login">登录</el-button>
              <el-button type="info" @click="resetLoginForm">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 注册 -->
      <div class="loginPane" v-show="!loginPane" style="height:500px">
        <div class="back_home" @click="$router.push('/home')"><i class="iconfont icon">&#xe62e;</i> 返回首页</div>
        <div class="loginTitle">注册</div>
        <div class="loginInputBox">
          <!-- 表单区 -->
          <el-form :model="registerForm" :rules="registerFormRules" label-width="0px" class="login_form" ref="registerFormRef">
            <!-- 用户名 -->
            <el-form-item prop="username">
              <el-input v-model="registerForm.username" placeholder="请输入用户名/邮箱" prefix-icon="el-icon-user-solid">
              </el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
              <el-input type="password" v-model="registerForm.password" placeholder="请输入密码" prefix-icon="el-icon-lock">
              </el-input>
            </el-form-item>
            <el-form-item prop="password_checked">
              <el-input type="password" v-model="registerForm.password_checked" placeholder="请再次输入密码" prefix-icon="el-icon-lock">
              </el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-input style="width:220px;" v-model="registerForm.code" placeholder="请输入图形验证码" prefix-icon="el-icon-lock">
              </el-input>
              <img class="codeImg" src="../../assets/img/3.jpg" alt="">
            </el-form-item>
            <el-form-item style="position: relative;">
              <el-checkbox v-model="isAgree" label="" name="type" :disabled="disabledAgree" :checked="isAgree"></el-checkbox>
              <span @click="agreement" class="agreement">同意服务条款</span>
              <div class="register" @click="toLogin">已有账号，直接登录</div>
            </el-form-item>
            <!-- 按钮 -->
            <el-form-item class="btns">
              <el-button type="primary" @click="register">立即注册</el-button>
              <el-button type="info" @click="resetRegisterForm">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </section>
    <canvas id="theCanvas"></canvas>
    <el-dialog title="服务条款" :visible.sync="agreementDialog" :before-close="closeDialog" width="50%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="agreementOk" :disabled="isTime"><span>( {{time}} s ) </span>同意服务条款</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import canvan from '../../utils/canva'
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      // 登录表单数据绑定对象
      loginForm: {
        username: '',
        password: '',
        code: ''
      },
      registerForm: {
        username: '',
        password: '',
        password_checked: '',
        code: ''
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
      },
      registerFormRules: {
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
        password_checked: [
          { validator: validatePass2, trigger: 'blur' }
        ],

      },
      // 登录注册企鹅换
      loginPane: false,
      isAgree: false,
      disabledAgree: true, //是否禁用复选框
      agreementDialog: false, //服务条款对话框
      time: 3,//倒计时
      isTime: true,//对话框按钮是否可点击
      timer: null,
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
    // 重置注册表单
    resetRegisterForm() {
      this.$refs.registerFormRef.resetFields();
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
    // 注册
    register() { },
    toRegister() {
      // this.$refs.loginFormRef.resetFields();
      this.loginPane = false;
      this.$refs.registerFormRef.resetFields();
    },
    toLogin() {
      // this.$refs.registerFormRef.resetFields();
      this.loginPane = true;
      this.$refs.loginFormRef.resetFields();
    },
    // 打开协议对话框
    agreement() {
      this.agreementDialog = true;
      this.timer = setInterval(() => {
        this.time--;
        if (this.time == 0) {
          clearInterval(this.timer)
          this.timer = null;
          this.isTime = false;
        }
      }, 1000);

    },
    closeDialog(done) {
      // 关闭对话框前
      clearInterval(this.timer)
      this.timer = null;
      this.isTime = false;
      this.time = 3;

      done();
    },
    // 确认协议
    agreementOk() {
      this.agreementDialog = false;
      this.disabledAgree = false;
      clearInterval(this.timer)
      this.timer = null;
      this.isTime = true;
      this.time = 3;
      this.isAgree = true;
    }
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
  height: 450px;
  background-color: rgba(219, 209, 209, 0.659);
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transition: ease all 0.2s;
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
.back_home {
  position: absolute;
  top: 23px;
  height: 65px;
  left: 45px;
  line-height: 65px;
  font-size: 20px;
  cursor: pointer;

  .icon {
    font-weight: 500;
  }
  &:hover {
    color: #0b60de;
  }
  &:hover .icon {
    color: #0b60de;
  }
}
.codeImg {
  width: 100px;
  height: 40px;
  position: absolute;
  /* font-size: 14px; */
  /* display: inline-block; */
  margin-left: 65px;
}
.register {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: #333333;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    color: #409eff;
  }
}
.agreement {
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    color: #409eff;
  }
}
</style>
