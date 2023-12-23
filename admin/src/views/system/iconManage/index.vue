<template>
  <div class="container">
    <IconSelect :isSearch="false" width="25px"></IconSelect>
  </div>
</template>

<script>
import IconSelect from "@/components/IconSelect";
export default {
  name: "Index",
  components: {
    IconSelect,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.container {
  ::v-deep .icon-item-wrapper {
    margin-bottom: 8px;
    .icon-item {
      span {
        margin-left: 8px;
      }
    }
  }
}
</style>
