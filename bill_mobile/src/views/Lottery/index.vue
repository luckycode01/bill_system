<template>
  <div>
    <Header :leftIcon="'arrow-left'" :title="'彩票模拟'"></Header>
    <div class="layout">
      <van-tabs v-model="activeName" @change="changeActiveTabs" color="#1989fa">
        <van-tab name="1" title="大乐透" style="margin-bottom:50px">
          <div id="fixed" class="clearbox">
            <div class="title">
              <span>{{number}}期</span>
              中奖号码
              <span>{{winList.front}}</span> +
              <span>{{winList.after}}</span>
            </div>
            <div class="win">
              <div class="isWin" v-for="item in winArr" :key="item+'key'">{{item}}</div>
            </div>
          </div>
          <div class="title " id="title" style="margin-top: 85px;">已选列表</div>
          <div class="content">
            <div class="result_list" v-for="(item,index) in resultList" :key="index">
              <div class="isWin">{{index+1}}</div>
              <div class="list_item" v-for="(v,i) in item.frontArea" :key="i+'key'">{{v}}</div>
              <div class="list_item blue" v-for="(v,i) in item.backArea" :key="i+'key1'">{{v}}</div>
            </div>
          </div>

        </van-tab>
        <div class="clickBtn">
          <van-button @click="handleRandom(1)" type="info" style="width:45%" size="large">随机一注</van-button>
          <van-button @click="handleRandom(2)" type="info" style="width:45%" size="large">固定号码</van-button>
        </div>

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
      resultList: [],
      number: '',
      winList: {
        front: null,
        after: null
      },
      winArr: [],
    }
  },
  mounted() {
    document.onscroll = function (e) {
      let fiexd = document.getElementById('fixed');
      fiexd.style.position = 'fixed';
      fiexd.style.top = "46px";
      // 到顶部距离
      let boundingTop = document.getElementById('title').getBoundingClientRect().top;
      if (boundingTop > 80) {
        fiexd.style.position = 'absolute';
        fiexd.style.top = boundingTop - 129 + "px";
      }
    };
    this.getWinList();

  },
  created() {

  },
  methods: {


    handleRandom(val) {
      if (val == 1) {
        // 生成红球和篮球
        let redBall = this.createBall(5, 33);
        let greenBall = this.createBall(2, 12);
        this.resultList.push({
          frontArea: redBall,
          backArea: greenBall
        });
        // 判断是否中奖 5+2，5+1 5+0，4+2，4+1，3+2，4+0，3+1，2+2 ，3+0，1+2，2+1，0+2；
        let res = this.isWin();
        if (res && !this.winArr.find(item => item == res))
          this.winArr.push(res)
      } else {
        this.$toast.success({
          message: '开发中',
          forbidClick: true,
        });
      }
    },
    // 中奖字典
    isWin() {
      let winList = { ...this.winList }
      let winIndex = null;
      this.resultList.forEach((item, index) => {
        let frontcount = 0, aftercount = 0;
        // 前区遍历
        item.frontArea.forEach((v, i) => {
          let res = winList.front.split(' ').find((m, n) => v == m)
          if (res) frontcount++;
        })
        // 后区遍历
        item.backArea.forEach((v, i) => {
          let res = winList.after.split(' ').find((m, n) => v == m)
          if (res) aftercount++;
        })
        let isWinRes = this.winDictionaries(frontcount, aftercount);
        if (isWinRes) {
          winIndex = index + 1;
        }
      })
      return winIndex;
    },
    winDictionaries(m, n) {
      let flag = false;
      let temp = String(m) + n
      switch (temp) {
        case "52": flag = 1; break;
        case "51": flag = 2; break;
        case "50": flag = 3; break;
        case "42": flag = 4; break;
        case "41": flag = 5; break;
        case "32": flag = 6; break;
        case "40": flag = 7; break;
        case "31":
        case "22": flag = 8; break;
        case "30":
        case "12":
        case "21":
        case "02": flag = 9; break;
        default: flag = false; break;
      }
      return flag;

    },
    // 随机生成球
    createBall(n, r) {
      var ball = [];
      let flag;
      while (ball.length < n) {
        let flag = true;
        let creatRed = Math.floor(Math.random() * r) + 1;
        for (var i = 0; i < ball.length; i++) {
          if (creatRed == ball[i]) {
            flag = false;
          }
        }
        if (flag) {
          ball[ball.length] = creatRed;
        }
      }
      return ball.sort((a, b) => a - b)
    },
    async getWinList() {
      let res = await this.$API.ticai.reqGetWinNumList();
      let list = res.value.list[0].lotteryDrawResult.split(' ')
      this.number = res.value.list[0].lotteryDrawNum;
      this.winList.front = list.slice(0, 5).join(' ');
      this.winList.after = list.slice(5, 7).join(' ');
    },
    changeActiveTabs() {

    }
  },
};
</script>

<style lang="less" scoped>
#fixed {
  position: absolute;
  height: 75px;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  background: #ffffff;
}
.title {
  width: 355px;
  height: 26px;
  margin: 10px auto 10px;
  font-size: 18px;
  color: #606060;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  > span:nth-child(2) {
    color: red;
  }
  > span:last-child {
    color: blue;
  }
}
.content {
  padding-bottom: 60px;
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
.clickBtn {
  width: 355px;
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-around;
  background: #ffffff;
}
</style>
