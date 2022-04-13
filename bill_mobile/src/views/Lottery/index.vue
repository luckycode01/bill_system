<template>
  <div>
    <Header :leftIcon="'arrow-left'" :title="'彩票模拟'"></Header>
    <div class="layout">
      <van-tabs v-model="activeName" @change="changeActiveTabs" color="#1989fa">
        <van-tab name="1" title="大乐透">
          <div class="title">中奖号码</div>
          <div class="win">
            <div class="isWin">1</div>
          </div>
          <div class="title">已选列表</div>
          <div class="result_list" v-for="(item,index) in resultList" :key="index">
            <div class="isWin">{{index}}</div>
            <div class="list_item" v-for="(v,i) in item.frontArea" :key="i+'key'">{{v}}</div>
            <div class="list_item blue" v-for="(v,i) in item.backArea" :key="i+'key1'">{{v}}</div>
          </div>
          <div style="width:355px;margin: auto;display:flex;  justify-content: space-around;">
            <van-button @click="handleRandom" type="info" style="width:45%" size="large">随机一注</van-button>
            <van-button @click="handleRandom" type="info" style="width:45%" size="large">固定号码</van-button>
          </div>
        </van-tab>

        <van-tab name="2" title="双色球">
          <div>双色球</div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Lottery',
  data() {
    return {
      activeName: '1',
      resultList: []

    }
  },
  mounted() {
  },
  methods: {
    handleRandom() {
      var redBall = [];
      var greenBall = [];
      var flag;
      while (redBall.length < 5) {
        let flag = true;
        let creatRed = Math.floor(Math.random() * 33) + 1;
        for (var i = 0; i < redBall.length; i++) {
          if (creatRed == redBall[i]) {
            flag = false;
          }
        }
        if (flag) {
          redBall[redBall.length] = creatRed;
        }
      }
      while (greenBall.length < 2) {
        let flag = true;
        let creatGreen = Math.floor(Math.random() * 12) + 1;
        for (var i = 0; i < greenBall.length; i++) {
          if (creatGreen == greenBall[i]) {
            flag = false;
          }
        }
        if (flag) {
          greenBall[greenBall.length] = creatGreen;
        }
      }
      this.resultList.push({
        frontArea: redBall,
        backArea: greenBall,

      })

    },
    changeActiveTabs() {

    }
  },
};
</script>

<style lang="less" scoped>
.title {
  width: 355px;
  height: 26px;
  margin: 10px auto;
  font-size: 18px;
  color: #606060;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.result_list {
  width: 355px;
  margin: 10px auto;
  padding: 10px 0;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  align-items: center;
  background: e1dede;
  .list_item {
    width: 30px;
    height: 30px;
    background: red;
    border-radius: 50%;
    background: radial-gradient(circle at 70% 30%, #ff8585, #ff0000);
    text-align: center;
    line-height: 30px;
    color: #ffffff;
    font-size: 16px;
  }
  .blue {
    background: radial-gradient(circle at 70% 30%, #8d85e6, #0400ff);
  }
}
.isWin {
  width: 15px;
  height: 15px;
  border: 1px solid #ee0000;
  color: #ee0000;
  border-radius: 50%;
  line-height: 15px;
  display: flex;
  justify-content: center;
}
.win {
  display: flex;
  width: 355px;
  margin: auto;
  div {
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
</style>
