<template>
  <div>
    <Header :title="'账单明细'"></Header>
    <div class="layout">
      <van-tabs type="card">
        <van-tab title="年视图">年视图</van-tab>
        <van-tab title="月视图">月视图</van-tab>
        <van-tab title="日视图">日视图</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
}
</script>

<style lang="less" scoped>
</style>
