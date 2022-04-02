<template>
  <div class="layout">
    <div class="top">
      <div @click="handleClick">主要活动一</div>
      <div @click="handleClick">主要活动二</div>
      <div @click="handleClick">主要活动三</div>
    </div>
    <div class="content">
      <vue-waterfall-easy ref="waterfall" @click="clickFn" :mobileGap="13" :imgsArr="imgsArr">
        <template v-slot="props">
          <div class="water-title">{{ props.value.title }}</div>
          <div class="water-title-info">{{ props.value.detail }}</div>
          <div class="water-detail">
            <div class="userInfo">
              <img :src="props.value.avator" alt="" />
              <div class="name">{{ props.value.name }}</div>
            </div>
            <div class="area">
              <van-icon name="eye-o" size="18" />
              <div class="textNum">{{props.value.currentTime}}</div>
            </div>
          </div>
        </template>
      </vue-waterfall-easy>
    </div>
  </div>
</template>

<script>
import vueWaterfallEasy from "vue-waterfall-easy";
export default {
  name: "Main",
  components: {
    vueWaterfallEasy,
  },
  data() {
    return {
      imgsArr: [
        {
          id: 1,
          title: "消费一笔",
          detail: "每天记录消费情况",
          name: "user",
          avator: require("../../assets/img/logo.jpg"),
          src: require("../../assets/img/jl.png"),
        },
        {
          id: 2,
          title: "消费一览",
          detail: "数据分析管理，对数据分析使用图表展示消费数据",
          name: "user",
          avator: require("../../assets/img/logo.jpg"),
          src: require("../../assets/img/tubiao.png"),
        },
        {
          id: 3,
          title: "账单明细",
          detail: "查看支出以及收入详细信息",
          name: "user",
          avator: require("../../assets/img/logo.jpg"),
          src: require("../../assets/img/mingxi.png"),
        },
        {
          id: 4,
          title: "收入记录",
          detail: "记录收入情况,工资收入、副业收入",
          name: "user",
          avator: require("../../assets/img/logo.jpg"),
          src: require("../../assets/img/shouru.png"),
        },
        {
          id: 5,
          title: "分类管理",
          detail: "消费分类管理移出或添加分类",
          name: "user",
          avator: require("../../assets/img/logo.jpg"),
          src: require("../../assets/img/category.png"),
        },
      ],
    };
  },
  created() {
    this.getTime();
  },
  methods: {
    getTime() {
      let dateTime = new Date();
      let month = dateTime.getMonth() + 1;
      let day = dateTime.getDate();
      this.imgsArr.forEach(item => {
        this.$set(item, "currentTime", `${month}-${day}`)
      });
    },
    handleClick() {
      this.$toast.loading({
        message: '开发中...',
        forbidClick: true,
      });
    },
    clickFn(event, { value }) {
      if (value.id == 1) {
        this.$router.push('/homelink/addpay')
      }
      if (value.id == 2) {
        this.$router.push('/plot')
      }
      if (value.id == 3) {
        this.$router.push('/homelink/outandindetail')
      }
      if (value.id == 4) {
        this.$router.push('/homelink/addin')
      }
      if (value.id == 5) {
        this.$router.push('/homelink/category')
      }

    }
  }
};
</script>

<style lang="less" scoped>
.layout {
  width: 375px;
  background: #eeeeee;
  // padding: 2px 10px;
  margin: auto;
  box-sizing: border-box;
}
.top {
  width: 370px;
  height: 50px;
  background: #eeeeee;
  display: flex;
  margin: auto;
  margin-top: 47px;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  div {
    width: 31%;
    height: 45px;
    line-height: 45px;
    background-color: #b9f0e1;
  }
}
.content {
  width: 375px;
  position: absolute;
  top: 94px;
  bottom: 0px;
  padding-top: 4px;
  background-color: #eee;
  box-sizing: border-box;
  .vue-waterfall-easy-container {
    background-color: #eeeeee;
    height: 740px;
    overflow: hidden;
    margin: 0 auto;
    .vue-waterfall-easy-scroll {
      height: 100%;
      overflow-x: hidden;
      overflow-y: scroll;
    }
  }
  .water-title {
    width: 100%;
    background-color: #fff;
    padding: 9px 20px 0;
    font-family: PingFangSC-Regular;
    text-align: center;
    box-sizing: border-box;
    font-size: 18px;
    line-height: 30px;
    font-weight: bold;
    color: #2b4167;
  }
  .water-title-info {
    width: 100%;
    background-color: #fff;
    padding: 9px 20px 0;
    font-family: PingFangSC-Regular;
    text-align: left;
    box-sizing: border-box;
    font-size: 14px;
    line-height: 18px;
    color: #333333;
  }
  .water-detail {
    width: 100%;
    font-size: 0.24rem;
    padding: 9px 20px 0.24rem;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    box-sizing: border-box;
    .userInfo {
      display: flex;
      justify-content: right;
      img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 1px solid #d9d9d9;
      }
      .name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 11px;
        color: #7f7f7f;
        height: 24px;
        line-height: 24px;
        margin-left: 4px;
      }
    }
    .area {
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      img {
        width: 16px;
        height: 16px;
      }
      .textNum {
        font-size: 12px;
        color: #7f7f7f;
        max-width: 45px;
        text-align: right;
        height: 16px;
        line-height: 16px;
        margin-left: 1px;
      }
    }
  }
}
</style>