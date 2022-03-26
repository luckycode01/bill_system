<template>
  <div class="home">
    <Header :title="'首页'"></Header>
    <Main></Main>
  </div>
</template>

<script>
import Main from "./Main";
export default {
  components: {
    Main,
  },
  data() {
    return {

    };
  },
};
</script>
<style lang="less">
</style>