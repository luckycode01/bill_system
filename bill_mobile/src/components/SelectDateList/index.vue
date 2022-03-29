<template>
  <van-dropdown-menu active-color="#1989fa">
    <van-dropdown-item v-model="selYear" :options="optionYear" />
    <van-dropdown-item :disabled="isDisMonth" v-model="selMonth" :options="optionMonth" />
    <van-dropdown-item :disabled="isDisDay" v-model="selDay" :options="optionDay" />
  </van-dropdown-menu>
</template>

<script>
export default {
  name: 'SelectDateList',
  props: ['startYear', 'endYear'],
  data() {
    return {
      selYear: '',
      selMonth: '',
      selDay: '',
      isDisMonth: false,
      isDisDay: false,
      optionDay: [],
      optionYear: [],
      optionMonth: [],
    }
  },
  created() {
    this.createdYear();
    this.createdMonth();
    this.getDate();
  },
  methods: {
    getDate(dateData) {
      let date = '';
      if (dateData)
        date = new Date(dateData);
      else
        date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      this.selYear = this.optionYear.find(item => parseInt(item.text) == year).value;
      this.selMonth = month;
      this.selDay = day;
    },
    // 生成年份
    createdYear() {
      let { startYear, endYear } = this;
      let yearArr = [];
      if (parseInt(endYear) - parseInt(startYear) > 0) {
        for (let i = 0; i <= parseInt(endYear) - parseInt(startYear); i++) {
          yearArr.push({
            text: parseInt(startYear) + i + '年',
            value: i,
          })
        }
      }
      this.optionYear = yearArr;
    },
    // 生成月份
    createdMonth() {
      let monthArr = [];
      for (let i = 0; i <= 12; i++) {
        monthArr.push({
          text: i + 1 + '月',
          value: i,
        })
      }
      this.optionMonth = monthArr;
    },
    // 生成日期
    createdDay() {

    }
  },
}
</script>
<style lang="less" scoped>
/deep/.van-dropdown-item__content {
  max-height: 50%;
}
</style>