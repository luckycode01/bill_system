<template>
  <view class="content">
    <Header isBack :title="'添加收入'"></Header>
    <u-tabs :list="tabList" @change="handleTabChange" :itemStyle="tabItemStyle" :lineWidth="'80rpx'">
    </u-tabs>
    <addForm :tabIndex="tabIndex"></addForm>
  </view>
</template>

<script>
import addForm from './components/addForm'
export default {
  components: { addForm },
  data() {
    return {
      tabList: [
        {
          name: "工资收入",
          value:'salary'
        },
        {
          name: "其他收入",
          value:'other'
        },
      ],
      tabIndex: 'salary',
      tabItemStyle: {
        width: "50%",
        height: "44px",
      },
    };
  },
  // 需要在节点加载到页面后调用
  onReady() { },

  methods: {
    handleTabChange(val) {
      this.tabIndex = val.value;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
