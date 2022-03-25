<template>
  <div>
    <div class="centerBox">
      <div class="header">
        <!-- <div class="avatar"><img :src="userInfo.headImg" /></div> -->
        <div class="userInfo">
          <span class="name">admin</span>
          <span class="userType">普通用户</span>
        </div>
      </div>
      <div class="myMoney">我的资产</div>
      <ul class="moneyNav">
        <li class="moneyItem">
          <span class="num">￥0</span>
          <span class="text">余额</span>
        </li>
        <li class="moneyItem">
          <span class="num">0</span>
          <span class="text">红包</span>
        </li>
        <li class="moneyItem">
          <span class="num">0</span>
          <span class="text">优惠券</span>
        </li>
        <li class="moneyItem">
          <span class="num">￥0</span>
          <span class="text">津贴</span>
        </li>
        <li class="moneyItem">
          <span class="num">0</span>
          <span class="text">礼品卡</span>
        </li>
      </ul>
      <div class="null"></div>
      <van-grid class="btnList" :column-num="3">
        <van-grid-item class="btnItem" icon="description" text="我的订单" />
        <van-grid-item class="btnItem" icon="user-circle-o" text="账号管理" />
        <van-grid-item class="btnItem" icon="friends-o" text="我的手机号" />
        <van-grid-item class="btnItem" icon="calendar-o" text="周六一起拼" />
        <van-grid-item class="btnItem" icon="refund-o" text="售后服务" />
        <van-grid-item class="btnItem" icon="gift-card-o" text="邀请返利" />
        <van-grid-item class="btnItem" icon="bag-o" text="优先购" />
        <van-grid-item class="btnItem" icon="gold-coin-o" text="积分中心" />
        <van-grid-item class="btnItem" icon="manager-o" text="会员俱乐部" />
        <van-grid-item class="btnItem" icon="wap-home-o" text="地址管理" />
        <van-grid-item class="btnItem" icon="certificate" text="支付安全" />
        <van-grid-item class="btnItem" icon="user-o" text="办法组与客服" />
        <van-grid-item class="btnItem" icon="records" text="意见反馈" />
        <van-grid-item class="btnItem" icon="discount" text="我的竞拍" />
      </van-grid>
      <div class="loginOut" @click="loginOut">退出登录</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
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
  height: 840px;
  box-sizing: border-box;
  .header {
    position: relative;
    width: 100%;
    height: 135px;
    display: flex;
    padding: 0 20px;
    align-items: center;
    background-image: url("~@/assets/img/bg.png");
    background-size: cover;
    // .avatar {
    //   width: 70px;
    //   height: 70px;
    //   margin-right: 20px;
    //   border-radius: 50%;
    //   // background-image: url("~@/pages/Center/images/avatar.png");
    //   background-size: cover;
    //   img {
    //     width: 70px;
    //     height: 70px;
    //     border-radius: 50%;
    //   }
    // }
    .userInfo {
      font-size: 18px;
      display: flex;
      color: #fff;
      flex-direction: column;
      .userType {
        font-size: 14px;
        margin-top: 10px;
      }
    }
  }
  .myMoney {
    width: 100%;
    height: 50px;
    margin: 0 15px;
    font-size: 14px;
    line-height: 50px;
    border-bottom: 1px solid #dfdfdf;
  }
  .moneyNav {
    width: 100%;
    height: 80px;
    display: flex;
    // background: violet;
    justify-content: space-around;
    align-items: center;
    .moneyItem {
      display: flex;
      flex-direction: column;
      text-align: center;
      .num {
        font-size: 16px;
        font-weight: bolder;
      }
      .text {
        font-size: 13px;
        margin-top: 10px;
      }
    }
  }
  .null {
    content: "";
    width: 100%;
    height: 10px;
    background: #f4f4f4;
    display: block;
  }
  .btnList {
    .btnItem {
      border-bottom: 1px solid #e3e3e3;
      border-right: 1px solid #e3e3e3;
    }
  }
  .loginOut {
    height: 50px;
    width: 100%;
    text-align: center;
    line-height: 50px;
    font-size: 15px;
    &::before {
      content: "";
      display: block;
      background: #eeeeee;
      height: 20px;
    }
    &::after {
      content: "";
      display: block;
      background: #eeeeee;
      height: 10px;
    }
  }
}
</style>
