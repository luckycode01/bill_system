<template>
  <div>
    <Header :title="'统计图表'"></Header>
    <div class="layout pad">
      <div class="top">
        <van-dropdown-menu active-color="#1989fa">
          <van-dropdown-item v-model="selYear" :options="optionYear" />
          <van-dropdown-item :disabled="isDisMonth" v-model="selMonth" :options="optionMonth" />
        </van-dropdown-menu>
        <van-radio-group v-model="yearOrMonth" @change="changeYearOrMonth" direction="horizontal">
          <van-radio name="year">年</van-radio>
          <van-radio name="month">月</van-radio>
        </van-radio-group>
      </div>

      <van-panel :title="isDisMonth?'本年资产情况': '本月资产状况'">
        <van-grid :gutter="20" square :column-num="3">
          <van-grid-item v-for="value in 3" :key="value" icon="photo-o" text="文字">

          </van-grid-item>
        </van-grid>
      </van-panel>
      <van-panel :title="isDisMonth?'本年消费': '本月消费'">

      </van-panel>
      <van-panel :title="isDisMonth?'本年收入': '本月收入'">

      </van-panel>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      yearOrMonth: 'month',
      isDisMonth: false,//是否禁用月份选择
      selYear: 0,
      selMonth: '0',
      optionYear: '',
      optionMonth: '',
    };
  },
  created() {
    this.getDate();
  },
  methods: {
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`;
      } else if (type === 'month') {
        return `${val}月`;
      }
      return val;
    },
    // 获取日期
    getDate(dateData) {
      let date = '';
      if (dateData)
        date = new Date(dateData);
      else
        date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth();
      this.selYear = this.optionYear.find(item => parseInt(item.text) == year).value;
      this.selMonth = month;
    },
    selectDateConfirm(dateData) {
      this.getDate(dateData)
      this.showSelectDate = false;
    },
    // 改变年月时
    changeYearOrMonth(val) {
      if (val == 'month') {
        this.isDisMonth = false;
      } else {
        this.isDisMonth = true
      }
    }
  },
};
</script>

<style lang="less" scoped>
.pad {
  padding: 6px 0;
}
.top {
  display: flex;
  .van-dropdown-menu {
    flex: 1;
  }
  .van-radio-group {
    width: 115px;
    margin-left: 10px;
  }
}
.van-panel {
  margin-top: 10px;
}
.van-grid {
  margin-top: 8px;
}
.van-cell-group::after {
  border: none;
}
</style>
