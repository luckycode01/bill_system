<template>
  <div>
    <Header :title="'统计图表'"></Header>
    <div class="layout pad">
      <div class="top">
        <SelectDateList :startYear="2019" :endYear="2025" :isDisMonth="isDisMonth" :isShowDay="false"></SelectDateList>
        <van-radio-group v-model="yearOrMonth" @change="changeYearOrMonth" direction="horizontal">
          <van-radio name="year">年</van-radio>
          <van-radio name="month">月</van-radio>
        </van-radio-group>
      </div>

      <van-panel :title="isDisMonth?'本年资产情况': '本月资产状况'">
        <van-grid :gutter="20" square :column-num="3">
          <van-grid-item>
            <div class="money"><span>￥</span>1000</div>
            <div class="desc">总支出</div>
          </van-grid-item>
          <van-grid-item>
            <div class="money"><span>￥</span>1000</div>
            <div class="desc">总收入</div>
          </van-grid-item>
          <van-grid-item>
            <div class="money"><span>￥</span>1000</div>
            <div class="desc">结余</div>
          </van-grid-item>
        </van-grid>
      </van-panel>
      <van-panel :title="isDisMonth?'本年消费': '本月消费'">
        <div style="width:100%;height: 200px;">
          <Bing :initData="initData" :config="payConfig"></Bing>
        </div>
      </van-panel>
      <van-panel :title="isDisMonth?'本年房租相关': '本月房租相关'">
        <div style="width:100%;height: 200px;">
          <ColumnBar :initData="initData" :config="payConfig"></ColumnBar>
        </div>
      </van-panel>
      <van-panel :title="isDisMonth?'本年收入': '本月收入'">
        <div style="width:100%;height: 200px;">
          <ColumnBar :initData="initData" :config="payConfig"></ColumnBar>
        </div>
      </van-panel>
    </div>
  </div>
</template>

<script>
import Bing from '@/components/charts/bing.vue'
import ColumnBar from '@/components/charts/column_bar.vue'
import DoubleColumnBar from '@/components/charts/double_column_bar.vue'
import LineMore from '@/components/charts/line_more.vue'
export default {
  components: {
    Bing,
    ColumnBar,
    DoubleColumnBar,
    LineMore
  },
  data() {
    return {
      yearOrMonth: 'month',
      isDisMonth: false,//是否禁用月份选择
      selYear: 0,
      selMonth: '0',
      optionYear: '',
      optionMonth: '',
      initData: [
        { "value": 10, "name": "甲" },
        { "value": 90, "name": "乙" },
        { "value": 35, "name": "丙" },
        { "value": 25, "name": "丁" },
        { "value": 50, "name": "戊" },
        { "value": 35, "name": "已" },
        { "value": 35, "name": "庚" }
      ],
      payConfig: {

      }
    };
  },
  created() {
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
  padding: 6px 0 50px;
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
/deep/.van-cell__title {
  color: #3a3a3a;
  font-size: 16px;
  font-weight: 600;
}
.van-grid {
  margin-top: 8px;
}
.van-cell-group::after {
  border: none;
}
.van-grid-item {
  // display: flex;
  // flex-direction: column;
  // justify-content: space-between;
  .money,
  .desc {
    font-size: 16px;
    line-height: 25px;
    > span {
      color: #ff0000;
    }
  }
  .desc {
    color: #424141;
    font-size: 18px;
    font-weight: 400;
  }
}
</style>
