<template>
  <div>
    <Header :title="'账单明细'"></Header>
    <div class="layout">
      <van-tabs type="card" v-model="selectView" @change="changeView" animated color="#1989fa">
        <van-tab title="年视图"></van-tab>
        <van-tab title="月视图"></van-tab>
        <van-tab title="日视图"></van-tab>
      </van-tabs>
      <SelectDateList :startYear="2019" :endYear="2025" :isDisMonth="isDisMonth" :isDisDay="isDisDay" :isShowDay="true"></SelectDateList>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data() {
    return {
      selectView: 1,
      selYear: '',
      selMonth: '',
      selDay: '',
      isDisMonth: false,
      isDisDay: false,
      optionYear: '',
      optionMonth: '',
    }
  },
  created() {
    this.changeView();
  },
  methods: {
    changeView() {
      if (this.selectView == 0) {
        // 年
        this.isDisMonth = true;
        this.isDisDay = true;
      } else if (this.selectView == 1) {
        // 月
        this.isDisMonth = false;
        this.isDisDay = true;
      } else {
        this.isDisMonth = false;
        this.isDisDay = false;
      }
    }
  },
}
</script>

<style lang="less" scoped>
</style>
