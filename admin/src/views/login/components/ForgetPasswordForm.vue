<template>
  <div class="forget">
    <el-form ref="forgetFormRef" :model="forgetForm" :rules="forgetRules">
      <el-form-item prop="mobile">
        <el-input v-model="forgetForm.mobile" type="text" auto-complete="off" placeholder="手机号">
          <svg-icon slot="prefix" icon-class="phone" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="smsCode">
        <el-row type="flex" justify="space-between" style="align-items: center; overflow: hidden">
          <el-input v-model="loginForm.smsCode" prefix="ios-lock" size="large" clearable placeholder="请输入手机验证码" class="input-verify" autocomplete="off">
            <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
          </el-input>
          <el-button v-if="!countdown" class="get-msg" type="primary" @click="getSmsCode" :disabled="!loginForm.mobile">获取验证码</el-button>
          <el-button v-else class="get-msg" type="primary" :loading="countdown>0">{{countdown + ' s'}}</el-button>
        </el-row>
      </el-form-item>
      <el-form-item prop="code">
        <el-row type="flex" justify="space-between" style="align-items: center; overflow: hidden">
          <el-input v-model="loginForm.code" auto-complete="off" placeholder="图形验证码" size="large" @keyup.enter.native="handleLogin">
            <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
          </el-input>
          <div style="position: relative; font-size: 12px">
            <img v-loading="codeUrl" :src="codeUrl" @click="getCode()" alt="加载验证码失败" style="width: 110px; cursor: pointer; display: block" />
          </div>
        </el-row>
      </el-form-item>
      <el-checkbox style="margin:0px 0px 25px 0px;opacity: 0;"></el-checkbox>
      <el-form-item style="width:100%;">
        <el-button :loading="loading" class="login-btn" size="mini" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { getCodeImg, sendMsg } from "@/api/login";
import { encrypt, decrypt } from '@/utils/jsencrypt'

export default {
  name: "Login",
  data() {
    const mobileValidate = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入手机号'));
      }
      if (!(/^1[3456789][0-9]{9}$/.test(value))) {
        return callback(new Error('手机号码格式错误'));
      }
      return callback();
    };
    return {
      codeUrl: "",
      forgetForm: {
        mobile: "13400001111",
        smsCode: "",
        code: "",
        uuid: '',
      },
      forgetRules: {
        mobile: [
          { required: true, trigger: "blur", message: "请输入您的手机号" },
          { validator: mobileValidate, trigger: 'blur' }
        ],
        smsCode: [
          { required: true, trigger: "blur", message: "请输入手机验证码" }
        ],
        code: [{ required: true, trigger: "blur", message: "请输入验证码" }]
      },
      loading: false,
      // 注册开关
      register: false,
      redirect: undefined,
      countdown: 0
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    this.getCode();
  },
  methods: {
    //发送短信
    getSmsCode() {
      if (!(/^1[3456789][0-9]{9}$/.test(this.loginForm.mobile))) {
        return this.$message.error("手机号码格式错误");
      }
      const params = { mobile: this.loginForm.mobile };
      sendMsg(params).then(res => {
        if (res.code == 200) {
          this.$message.success(res.res.meta.msg);
          this.countdown = 60;
          this.timer = setInterval(() => {
            this.countdown--;
            if (this.countdown <= 0) {
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000)
        } else {
          this.$message.error(res.meta.msg)
        }
      })

    },
    getCode() {
      // getCodeImg().then(res => {
      //   this.codeUrl = "data:image/gif;base64," + res.img;
      //   this.loginForm.uuid = res.uuid;
      // });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
        
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-divider__text {
  color: #707070;
}
.login {
  height: 100%;
}
.form-name {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.el-form {
  width: 400px;
  ::v-deep .el-input {
    height: 40px;
    input {
      height: 40px;
    }
  }
  .login-btn {
    font-size: 16px;
    height: 40px;
    background: #0960bd;
  }
  .get-msg {
    width: 110px;
    color: #fff;
    text-align: center;
    height: 40px;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
  }
  .input-icon {
    font-size: 16px;
    margin-left: 2px;
  }
  .forget {
    float: right;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 38px;
}
::v-deep .el-input__prefix {
  line-height: 50px;
  .svg-icon {
    vertical-align: inherit;
  }
}
// ::v-deep
</style>
