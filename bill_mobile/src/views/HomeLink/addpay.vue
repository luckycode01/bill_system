<template>
  <div>
    <Header :leftIcon="'arrow-left'" :title="'添加账单'"></Header>
    <div class="layout">
      <van-tabs v-model="activeName" @change="changeActiveTabs" color="#1989fa">
        <van-tab name="1" title="单一记录">
          <van-form validate-first>
            <van-field v-model="addOneForm.selectDate" required label="日期" @click="showDatePicker = true" placeholder="请选择日期" />
            <van-field v-model="addOneForm.categoryValue" required is-link readonly label="分类" placeholder="请选择分类" @click="showCategory = true" />
            <van-popup v-model="showCategory" round position="bottom" :style="{ height: '40%' }">
              <van-cascader v-model="cascaderValue" active-color="#1989fa" title="请选择分类" :options="categoryList" @close="showCategory = false" @finish="selectCateFinish" />
            </van-popup>
            <van-field v-model="addOneForm.money" type="number" label="金额" required placeholder="请输入金额" />
          </van-form>
        </van-tab>
        <van-tab name="2" title="批量记录">
          <van-form validate-first>
            <van-field v-model="batchFormData.selectDate" required label="日期" @click="showDatePicker = true" placeholder="请选择日期" />
            <van-field v-model="batchFormData.food" label="快餐饮食" placeholder="请输入金额" />
            <van-field v-model="batchFormData.life" label="生活买菜" placeholder="请输入金额" />
            <van-field v-model="batchFormData.traffic" label="交通出行" placeholder="请输入金额" />
            <van-field v-model="batchFormData.dailyuse" label="日用百货" placeholder="请输入金额" />
            <van-field v-model="batchFormData.telephonebill" label="话费充值" placeholder="请输入金额" />
            <van-field v-model="batchFormData.car" label="车辆保养" placeholder="请输入金额" />
            <van-field v-model="batchFormData.clothing" label="服装服饰" placeholder="请输入金额" />
            <van-field v-model="batchFormData.fruitsnacks" label="水果零食" placeholder="请输入金额" />
            <van-field v-model="batchFormData.health" label="医药健康" placeholder="请输入金额" />
            <van-field v-model="batchFormData.other" label="其他" placeholder="请输入金额" />
          </van-form>
        </van-tab>
        <van-tab name="3" title="租房记录">
          <van-form validate-first>
            <van-field v-model="houseFormData.selectDate" required label="日期" @click="showDatePicker = true" placeholder="请选择日期" />
            <van-field v-model="houseFormData.houseMoney" required label="房租" placeholder="请输入金额" />
            <van-field v-model="houseFormData.waterStart" required label="水表起码" placeholder="请输入金额" />
            <van-field v-model="houseFormData.waterEnd" required label="水表止码" placeholder="请输入金额" />
            <van-field v-model="houseFormData.waterMoney" required label="水费" placeholder="请输入金额" />
            <van-field v-model="houseFormData.electricityStart" required label="电表起码" placeholder="请输入金额" />
            <van-field v-model="houseFormData.electricityEnd" required label="电表止码" placeholder="请输入金额" />
            <van-field v-model="houseFormData.electricityMoney" required label="电费" placeholder="请输入金额" />
            <van-field v-model="houseFormData.networkMoney" required label="网费" placeholder="请输入金额" />
            <van-field v-model="houseFormData.totalMoney" required label="合计" disabled placeholder="请输入金额" />
          </van-form>
        </van-tab>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-tabs>
      <van-popup v-model="showDatePicker" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker @confirm="confirmDate" @cancel="showDatePicker = false" v-model="currentDate" type="date" title="选择日期" :min-date="minDate" :max-date="maxDate" />
      </van-popup>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AddPay',
  data() {
    return {
      showDatePicker: false, //日期控件
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      showCategory: false, //选择分类
      fieldValue: '',
      cascaderValue: '',
      activeName: '1',//激活的tab标签

      addOneForm: {
        selectDate: '',
        categoryValue: '',
        money: '',
      },
      batchFormData: {
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
      houseFormData: {
        selectDate: '',
        houseMoney: '',
        waterStart: '',
        waterEnd: '',
        waterMoney: '',
        electricityStart: '',
        electricityEnd: '',
        electricityMoney: '',
        networkMoney: '',
        totalMoney: '',
      },
      // 选项列表，children 代表子选项，支持多级嵌套
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
  mounted() {
  },
  methods: {
    selectCateFinish({ selectedOptions }) {
      this.showCategory = false;
      this.addOneForm.categoryValue = selectedOptions.map((option) => option.text).join('/');
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
    changeActiveTabs(name) {
      // 改变tab激活状态
      if (this.activeName == '1')
        this.addOneForm.selectDate = `${year}-${month}-${day}`;
      if (this.activeName == '2')
        this.batchFormData.selectDate = `${year}-${month}-${day}`;
      if (this.activeName == '3')
        this.houseFormData.selectDate = `${year}-${month}-${day}`;
    },
    // 选择日期确认
    confirmDate(val) {
      let year = val.getFullYear();
      let month = val.getMonth();
      let day = val.getDate();
      if (this.activeName == '1')
        this.addOneForm.selectDate = `${year}-${month}-${day}`;
      if (this.activeName == '2')
        this.batchFormData.selectDate = `${year}-${month}-${day}`;
      if (this.activeName == '3')
        this.houseFormData.selectDate = `${year}-${month}-${day}`;
      this.showDatePicker = false;
    }
  },
};
</script>

<style lang="less" scoped>
/deep/.van-tabs__line {
  width: 1.2rem;
}
</style>
