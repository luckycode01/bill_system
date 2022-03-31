<template>
  <van-dropdown-menu active-color="#1989fa">
    <van-dropdown-item v-model="selYear" @change="handleChangeYear" :options="optionYear" />
    <van-dropdown-item :disabled="isDisMonth" @change="handleMonthYear" v-model="selMonth" :options="optionMonth" />
    <van-dropdown-item v-if="isShowDay" :disabled="isDisDay" @change="handleDayYear" v-model="selDay" :options="optionDay" />
  </van-dropdown-menu>
</template>

<script>
export default {
  name: 'SelectDateList',
  props: ['startYear', 'endYear', 'isShowDay', "isDisMonth", 'isDisDay'],
  data() {
    return {
      selYear: '',
      selMonth: '',
      selDay: '',
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
      this.createdDay(day);
    },
    // 查找年份表中对应的年
    // 查找月份表中对应的月
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
      for (let i = 0; i < 12; i++) {
        monthArr.push({
          text: i + 1 + '月',
          value: i,
        })
      }
      this.optionMonth = monthArr;
    },
    // 生成日期
    createdDay(params = 1) {
      let { selYear, selMonth, selDay } = this;
      // 获取年份,月份
      let yearText = this.optionYear.find(item => item.value == selYear).text;
      let monthText = this.optionMonth.find(item => item.value == selMonth).text;
      let days = '';
      let dayArr = [];
      // 生成日期字典
      if (parseInt(yearText) % 4 == 0 || parseInt(yearText) % 400 == 0) {
        // 润年二月份29天
        days = this.dayList(parseInt(monthText), true)
      } else {
        days = this.dayList(parseInt(monthText), false)
      }
      for (let i = 1; i <= days; i++) {
        dayArr.push({
          text: i + '日',
          value: i,
        })
      }
      this.optionDay = dayArr;
      this.selDay = params;
    },
    // 日期字典
    dayList(month, isLeap) {
      let days = 0;
      switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12: days = 31; break;
        case 2: {
          if (isLeap) { days = 29; break }
          else { days = 28; break; }
        }
        default: days = 30; break;
      }
      return days;
    },
    // 下拉选择，改变选项时
    handleChangeYear(val) {
      this.createdDay();
    },
    handleMonthYear(val) {
      this.createdDay();
    },
    handleDayYear(val) {

    }
  },
}
</script>
<style lang="less" scoped>
/deep/.van-dropdown-item__content {
  max-height: 50%;
}
</style>