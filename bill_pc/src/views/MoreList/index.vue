<template>
  <div>
    <Header></Header>
    <List :dataList="dataList"></List>
    <Footer></Footer>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      dataList: [],
    }
  },
  created() {
    this.dataList = 7;
  }
}
</script>

<style lang="less" scoped>
</style>
