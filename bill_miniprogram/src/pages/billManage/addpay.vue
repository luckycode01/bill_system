<template>
  <view class="content">
    <Header isBack :title="'添加账单'"></Header>
    <u-tabs
      :list="tabList"
      @change="handleTabChange"
      :itemStyle="tabItemStyle"
      :lineWidth="'80rpx'"
    >
    </u-tabs>
    <addForm :tabIndex="tabIndex"></addForm>
  </view>
</template>

<script>
import addForm from "./components/addForm.vue"
export default {
  components: { addForm },
  data() {
    return {
      tabList: [
        {
          name: "单项记录",
          value: "one",
        },
        {
          name: "批量记录",
          value: "batch",
        },
        {
          name: "租房记录",
          value: "house",
        },
      ],
      tabIndex: "one",
      tabItemStyle: {
        width: "33%",
        height: "44px",
      },
    };
  },
  // 需要在节点加载到页面后调用
  onReady() {},

  methods: {
    handleTabChange(val) {
      this.tabIndex = val.value;
    },
  },
};
</script>

<style lang="scss" scoped></style>
