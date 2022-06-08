<template>
  <div>
    <Header :title="'个人中心'"></Header>
    <div class="centerBox">
      <div class="header">
        <div class="avatar"><img src="../../assets/img/logo.jpg" alt="" /></div>
        <div class="userInfo">
          <span class="name">游客</span>
          <span class="number">账号：13411113333</span>
        </div>
      </div>
      <div class="mine">
        <div class="item" @click="$router.push('/usercenter/me')">我的资料</div>
      </div>
      <div class="file">
        <div class="item">资产管理</div>
        <div class="item">预购清单</div>
        <div class="item">项二</div>
        <div class="item">修改密码</div>
        <div class="item">关于我们</div>
      </div>
      <div class="loginOut" @click="loginOut">
        <div>退出登录</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "UserCenter",
  data() {
    return {

    };
  },
  mounted() {

  },
  methods: {
    // 退出登录
    async loginOut() {
      try {
        await this.$store.dispatch("userLoginOut");
        // alert('登陆成功')
        this.$toast.success("退出登录成功");
        this.$router.push("/home");
        // this.$forceUpdate();
        this.$bus.$emit("setActive", 0);
      } catch (error) {
        this.$toast.fail("退出登陆失败");
      }
    },

  },
  computed: {

  },
};
</script>

<style lang="less" scoped>
@grid-item-icon-size: 20px;
.centerBox {
  margin-top: 46px;
  box-sizing: border-box;
  .header {
    position: relative;
    width: 100%;
    height: 145px;
    display: flex;
    align-items: center;
    padding: 14px;
    box-sizing: border-box;
    background: #ffffff;
    .avatar {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      margin-right: 15px;
      img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }
    }
    .userInfo {
      font-size: 20px;
      display: flex;
      color: #333333;
      flex-direction: column;
      font-weight: 500;
      .name {
        height: 40px;
      }
      .number {
        color: #a8a8a8;
        font-size: 13px;
        font-weight: 400;
      }
    }
  }
  .myMoney {
    width: 375px;
    height: 75px;
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #eeeeee;
    div {
      width: 145px;
      height: 56px;
      text-align: center;
      line-height: 56px;
      background: #ffffff;
    }
  }
  .mine {
    width: 100%;
    background: #eeeeee;
    padding: 10px 0;
    .item {
      width: 100%;
      height: 46px;
      line-height: 46px;
      padding: 0 20px;
      background: #ffffff;
      box-sizing: border-box;
      position: relative;
    }
  }
  .file {
    width: 100%;
    background: #eeeeee;
    .item {
      width: 100%;
      height: 46px;
      line-height: 46px;
      padding: 0 20px;
      background: #ffffff;
      box-sizing: border-box;
      position: relative;
      border: 1px solid #eeeeee;
      &:last-child {
        border: none;
      }
      &::after {
        content: "";
        position: absolute;
        width: 8px;
        height: 8px;
        border-top: 1px solid #7a7a7a;
        border-right: 1px solid #7a7a7a;
        top: 50%;
        right: 20px;
        transform: translateY(-50%) rotate(45deg);
      }
    }
  }
  .loginOut {
    width: 100%;
    text-align: center;
    line-height: 50px;
    font-size: 15px;
    position: relative;
    background: #eeeeee;
    padding: 10px 0;
    > div {
      width: 100%;
      height: 46px;
      line-height: 46px;
      padding: 0 20px;
      background: #ffffff;
      box-sizing: border-box;
      position: relative;
    }
  }
}
</style>
