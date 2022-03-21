<template>
  <el-tooltip class="item" effect="dark" :content="title" placement="bottom">
    <el-button v-bind="$attrs" v-on="$listeners"></el-button>
  </el-tooltip>
</template>

<script>
export default {
  name: 'HintButton',
  props: ['title']
}
</script>

<style lang="scss" scoped>
a {
  margin-right: 10px;
}
</style>
