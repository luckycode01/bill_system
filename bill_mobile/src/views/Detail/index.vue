<template>
  <div>
    <Header :title="'账单明细'"></Header>
    <div class="layout">
      <van-tabs type="card" animated color="#1989fa">
        <van-tab title="年视图"></van-tab>
        <van-tab title="月视图"></van-tab>
        <van-tab title="日视图"></van-tab>
      </van-tabs>
      <SelectDateList :startYear="2019" :endYear="2025"></SelectDateList>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data() {
    return {
      selYear: '',
      selMonth: '',
      selDay: '',
      isDisMonth: false,
      isDisDay: false,
      optionYear: '',
      optionMonth: '',
    }
  }
}
</script>

<style lang="less" scoped>
</style>
