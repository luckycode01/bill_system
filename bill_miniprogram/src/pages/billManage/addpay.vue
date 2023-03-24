<template>
  <view class="content">
    <Header isBack :title="'添加账单'"></Header>
    <u-tabs :list="tabList" @change="handleTabChange" :itemStyle="tabItemStyle" :lineWidth="'80rpx'">
    </u-tabs>
    <addForm :tabIndex="tabIndex"></addForm>
  </view>
</template>

<script>
import addForm from '@/pages/billManage/addForm'
export default {
  components: { addForm },
  data() {
    return {
      tabList: [
        {
          name: "单项记录",
        },
        {
          name: "批量记录",
        },
        {
          name: "租房记录",
        },
      ],
      tabIndex: 0,
      tabItemStyle: {
        width: "33%",
        height: "44px",
      },
    };
  },
  // 需要在节点加载到页面后调用
  onReady() { },

  methods: {
    handleTabChange(val) {
      this.tabIndex = val.index;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
