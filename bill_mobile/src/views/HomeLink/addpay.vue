<template>
  <div>
    <Header :leftIcon="'arrow-left'" :title="'添加账单'"></Header>
    <div class="layout">
      <van-tabs @click="onClick" color="#1989fa">
        <van-tab title="单一记录">
          <van-form validate-first>
            <van-field v-model="selectDate1" required label="日期" @click="showDatePicker = true" placeholder="请选择日期" />
            <van-field v-model="fieldValue" required is-link readonly label="分类" placeholder="请选择分类" @click="showCategory = true" />
            <van-popup v-model="showCategory" round position="bottom" :style="{ height: '40%' }">
              <van-cascader v-model="cascaderValue" active-color="#1989fa" title="请选择分类" :options="categoryList" @close="showCategory = false" @finish="selectCateFinish" />
            </van-popup>
            <van-field v-model="phone" label="金额" required placeholder="请输入金额" />
          </van-form>
        </van-tab>
        <van-tab title="批量记录">
          <van-form validate-first>
            <van-field v-model="fieldValue.selectDate" required label="日期" @click="showDatePicker = true" placeholder="请选择日期" />
            <van-field v-model="fieldValue.food" label="快餐饮食" placeholder="请输入金额" />
            <van-field v-model="fieldValue.life" label="生活买菜" placeholder="请输入金额" />
            <van-field v-model="fieldValue.traffic" label="交通出行" placeholder="请输入金额" />
            <van-field v-model="fieldValue.dailyuse" label="日用百货" placeholder="请输入金额" />
            <van-field v-model="fieldValue.telephonebill" label="话费充值" placeholder="请输入金额" />
            <van-field v-model="fieldValue.car" label="车辆保养" placeholder="请输入金额" />
            <van-field v-model="fieldValue.clothing" label="服装服饰" placeholder="请输入金额" />
            <van-field v-model="fieldValue.fruitsnacks" label="水果零食" placeholder="请输入金额" />
            <van-field v-model="fieldValue.health" label="医药健康" placeholder="请输入金额" />
            <van-field v-model="fieldValue.other" label="其他" placeholder="请输入金额" />
          </van-form>
        </van-tab>
        <van-tab title="租房记录">
          <van-form validate-first>
            <van-field v-model="selectDate3" required label="日期" @click="showDatePicker = true" placeholder="请选择日期" />
            <van-field v-model="phone" required label="房租" placeholder="请输入金额" />
            <van-field v-model="phone" required label="水表起码" placeholder="请输入金额" />
            <van-field v-model="phone" required label="水表止码" placeholder="请输入金额" />
            <van-field v-model="phone" required label="水费" placeholder="请输入金额" />
            <van-field v-model="phone" required label="电表起码" placeholder="请输入金额" />
            <van-field v-model="phone" required label="电表止码" placeholder="请输入金额" />
            <van-field v-model="phone" required label="电费" placeholder="请输入金额" />
            <van-field v-model="phone" required label="网费" placeholder="请输入金额" />
            <van-field v-model="phone" required label="合计" disabled placeholder="请输入金额" />
          </van-form>
        </van-tab>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-tabs>
      <van-popup v-model="showDatePicker" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker v-model="currentDate" type="date" title="选择日期" :min-date="minDate" :max-date="maxDate" />
      </van-popup>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddPay',
  data() {
    return {
      selectDate1: '', //选择的日期
      selectDate2: '', //选择的日期
      selectDate3: '', //选择的日期
      showDatePicker: false, //日期控件
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(2021, 0, 17),

      showCategory: false, //选择分类
      fieldValue: '',
      cascaderValue: '',
      // 选项列表，children 代表子选项，支持多级嵌套
      batchFormDate: {
        selectDate: '',
        food: '',
        life: '',
        traffic: '',
        dailyuse: '',
        telephonebill: '',
        car: '',
        clothing: '',
        fruitsnacks: '',
        health: '',
        other: ''
      },
      categoryList: [
        {
          text: '快餐饮食',
          value: '1',
          // children: [{ text: '杭州市', value: '330100' }],
        },
        {
          text: '生活买菜',
          value: '2',
          // children: [{ text: '南京市', value: '320100' }],
        },
      ],

      value1: '',
      value2: '',
      value3: '',
      pattern: /\d{6}/,

      phone: '',

      // actions: [{ name: '快餐饮食' }, { name: '生活买菜' }, { name: '交通出行' }, { name: '交通出行' }, { name: '交通出行' }, { name: '交通出行' }, { name: '交通出行' }],
    };
  },
  methods: {
    selectCateFinish({ selectedOptions }) {
      this.showCategory = false;
      this.fieldValue = selectedOptions.map((option) => option.text).join('/');
    },
    // 校验函数返回 true 表示校验通过，false 表示不通过
    validator(val) {
      return /1\d{10}/.test(val);
    },
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
      this.$toast(item.name);
    },
    onClick(name, title) {
      this.$toast(title);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.van-tabs__line {
  width: 1.2rem;
}
</style>
