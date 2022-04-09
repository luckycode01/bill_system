<template>
  <div>
    <Header :leftIcon="'arrow-left'" :title="'彩票模拟'"></Header>
    <div class="layout">
      <van-tabs v-model="activeName" @change="changeActiveTabs" color="#1989fa">
        <van-tab name="1" title="大乐透">
          <div class="title">已选列表</div>
          <div class="result_list" v-for="(item,index) in resultList" :key="index">
            <div class="list_item" v-for="(v,i) in item.frontArea" :key="i">{{v}}</div>
            <div class="list_item blue" v-for="(v,i) in item.backArea" :key="i">{{v}}</div>
          </div>
        </van-tab>
        <div style="width:355px;margin: auto;">
          <van-button @click="handleRandom" type="info" size="large">随机一注</van-button>
        </div>
        <div style="width:355px;margin:20px auto;padding-bottom: 20px;">
          <van-button @click="handleRandom" type="info" size="large">固定号码</van-button>
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
      resultList: [
        {
          frontArea: [1, 1, 2, 22, 23],
          backArea: [3, 4],
        }
      ]

    }
  },
  mounted() {
  },
  methods: {
    handleRandom() {
      this.resultList.push({
        frontArea: [1, 1, 2, 22, 23],
        backArea: [3, 4],
      })
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
  padding: 0px 0px 11px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  .list_item {
    width: 40px;
    height: 40px;
    background: red;
    border-radius: 50%;
    text-align: center;
    line-height: 40px;
    color: #ffffff;
    font-size: 18px;
  }
  .blue {
    background-color: #4725f1;
  }
}
</style>
