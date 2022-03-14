<template>
  <div>
    <Header :menuIndex="menuIndex"></Header>
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
      menuIndex: -1,
    }
  },
  created() {
    this.dataList = 7;
  }
}
</script>

<style lang="less" scoped>
</style>
