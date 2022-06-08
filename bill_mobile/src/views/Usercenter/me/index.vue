<template>
  <div>
    <Header :title="'我的资料'" :leftIcon="'arrow-left'"></Header>
    <div class="centerBox">
      <div class="box avator">
        <span>头像</span>
        <img @click="toUploade" src="../../../assets/img/logo.jpg" alt="">
      </div>
      <div class="box account">
        <span>账号</span>
        <span>123-111111</span>
      </div>
      <div class="box name">
        <span>名字</span>
        <span>name</span>
      </div>
      <div class="box sex">
        <span>性别</span>
        <span>男</span>
      </div>
      <div class="box phone">
        <span>电话</span>
        <span>13411112222</span>
      </div>
      <div class="box address">
        <span>地区</span>
        <span>广东-深圳</span>
      </div>
    </div>
    <van-dialog v-model="showUploade" title="修改头像" show-cancel-button>
      <van-uploader v-model="fileList" :after-read="afterRead" />
    </van-dialog>
  </div>
</template>

<script>

export default {
  name: "UserCenter",
  data() {
    return {
      showUploade: true,
      filelist: [
        { url: 'https://img01.yzcdn.cn/vant/leaf.jpg' }
      ]
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
    toUploade() {
      // 上传头像

    }

  },
  computed: {

  },
};
</script>

<style lang="less" scoped>
.centerBox {
  box-sizing: border-box;
  width: 355px;
  margin: 47px auto 0;
  .box {
    height: 45px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 25px 0 15px;
    border-bottom: 1px solid #cecece;
    &::after {
      content: "";
      position: absolute;
      right: 10px;
      top: 50%;
      transform: rotate(45deg) translateY(-50%);
      width: 8px;
      height: 8px;
      border-top: 2px solid #8d8c8c;
      border-right: 2px solid #8d8c8c;
    }
  }
  .avator {
    height: 60px;
    img {
      width: 50px;
      height: 50px;
    }
  }
}
/deep/ .van-dialog__content {
  display: flex;
}
/deep/ .van-uploader {
  margin: auto;
}
</style>
