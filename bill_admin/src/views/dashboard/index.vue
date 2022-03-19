<template>
  <div class="dashboard-container">
    <div class="chart-container">
      <div class="box">
        <Bing :initData="bingData" :config="bingConfig"></Bing>
      </div>
      <div class="box">
        <ColumnBar :initData="columnBarData" :config="columnBarConfig"></ColumnBar>
      </div>
      <div class="box">
        <DoubleColumnBar :initData="doubleColumnData" :config="doubleColumnConfig"></DoubleColumnBar>
      </div>
      <div class="box">
        <LineMore :initData="lineData" :config="lineConfig"></LineMore>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Bing from '@/components/charts/bing.vue'
import ColumnBar from '@/components/charts/column_bar.vue'
import DoubleColumnBar from '@/components/charts/double_column_bar.vue'
import LineMore from '@/components/charts/line_more.vue'

export default {
  name: 'Dashboard',
  components: {
    Bing,
    ColumnBar,
    DoubleColumnBar,
    LineMore
  },
  data() {
    return {
      bingData: [
        { "value": 10, "name": "甲" },
        { "value": 90, "name": "乙" },
        { "value": 35, "name": "丙" },
        { "value": 25, "name": "丁" },
        { "value": 50, "name": "戊" },
        { "value": 35, "name": "已" },
        { "value": 35, "name": "庚" }
      ],
      bingConfig: {
        legendRight: '10%',
        center: ["45%", "50%"],
        radius: [0, "50%"],
        colorList: ["#D0C5FE", "#D5F2F4", "#FEEBB4", "#FFF2ED", "#FFDBDB", "#EDE8FF", "#BAD6FF", "#188DF0", "#FDA3A3", "#FECBA0", "#FEE498", "#97DFE6", "#D0E3FF"]
      },
      columnBarData: [
        { "value": 10, "name": "甲" },
        { "value": 90, "name": "乙" },
        { "value": 35, "name": "丙" },
        { "value": 25, "name": "丁" },
        { "value": 50, "name": "戊" },
        { "value": 35, "name": "已" },
        { "value": 35, "name": "庚" }
      ],
      columnBarConfig: {},
      doubleColumnData: {
        "name": ["A", "B", "C", "D", "E", "F"],
        "value1": [121, 212, 123, 263, 125, 341],
        "value2": [121, 212, 123, 263, 125, 341],
        "legend": ["甲", "乙"]
      },
      doubleColumnConfig: {},
      lineData: {
        "name": ["甲", "乙", "丙", "丁", "戊", "己"],
        "AA": [121, 212, 123, 263, 125, 341],
        "BB": [232, 122, 134, 122, 99, 235],
        "CC": [444, 300, 444, 333, 521, 555],
        "DD": [500, 234, 345, 555, 322, 123],
        "EE": [33, 111, 222, 444, 555, 333]
      },
      lineConfig: {
        colorList: ['#44C8D5', '#4B77F8', '#99D17D', '#695BEB', '#3C88F6', '#70D087', '#1DC0B7'],
      }
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
  }

}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 40px 40px 0px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.chart-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  height: calc(100vh - 110px);
}
.box {
  width: 49%;
  height: 48%;
  background: #ffffff;
  border: #d9d9d9 1px solid;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 10%);
}
</style>
