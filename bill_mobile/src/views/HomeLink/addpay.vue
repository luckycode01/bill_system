<template>
  <div>
    <Header :leftIcon="'arrow-left'" :title="'添加账单'"></Header>
    <div class="layout">
      <van-tabs @click="onClick">
        <van-tab title="单一记录">
          <van-form validate-first @failed="onFailed">
            <van-field v-model="phone" required label="日期" @click="showPopup" placeholder="请选择日期" />
            <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
              <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" />
            </van-popup>
            <van-cell is-link title="选择分类" @click="showType = true" />
            <van-action-sheet v-model="showType" :actions="actions" style='height:40%' @select="onSelect" />
            <van-field v-model="phone" label="金额" required placeholder="请输入金额" />
            <div style="margin: 16px;">
              <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
          </van-form>
        </van-tab>
        <van-tab title="批量记录">
          <van-form validate-first @failed="onFailed">
            <van-field v-model="phone" required label="日期" @click="showPopup" placeholder="请选择日期" />
            <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
              <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" />
            </van-popup>
            <van-field v-model="phone" label="快餐饮食" placeholder="请输入金额" />
            <van-field v-model="phone" label="生活买菜" placeholder="请输入金额" />
            <van-field v-model="phone" label="交通出行" placeholder="请输入金额" />
            <van-field v-model="phone" label="日用百货" placeholder="请输入金额" />
            <van-field v-model="phone" label="话费充值" placeholder="请输入金额" />
            <van-field v-model="phone" label="车辆保养" placeholder="请输入金额" />
            <van-field v-model="phone" label="服装服饰" placeholder="请输入金额" />
            <van-field v-model="phone" label="水果零食" placeholder="请输入金额" />
            <van-field v-model="phone" label="医药健康" placeholder="请输入金额" />
            <van-field v-model="phone" label="其他" placeholder="请输入金额" />
            <div style="margin: 16px;">
              <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
          </van-form>
        </van-tab>
        <van-tab title="租房记录">
          <van-form validate-first @failed="onFailed">
            <van-field v-model="phone" required label="日期" @click="showPopup" placeholder="请选择日期" />
            <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
              <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" />
            </van-popup>
            <van-field v-model="phone" required label="房租" placeholder="请输入金额" />
            <van-field v-model="phone" required label="水表起码" placeholder="请输入金额" />
            <van-field v-model="phone" required label="水表止码" placeholder="请输入金额" />
            <van-field v-model="phone" required label="水费" placeholder="请输入金额" />
            <van-field v-model="phone" required label="电表起码" placeholder="请输入金额" />
            <van-field v-model="phone" required label="电表止码" placeholder="请输入金额" />
            <van-field v-model="phone" required label="电费" placeholder="请输入金额" />
            <van-field v-model="phone" required label="网费" placeholder="请输入金额" />
            <van-field v-model="phone" required label="合计" disabled placeholder="请输入金额" />
            <div style="margin: 16px;">
              <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
          </van-form>
        </van-tab>
      </van-tabs>

    </div>
  </div>
</template>

<script>
export default {
  name: 'AddPay',
  data() {
    return {
      value1: '',
      value2: '',
      value3: '',
      pattern: /\d{6}/,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(2021, 0, 17),
      phone: '',
      show: false,
      showType: false,
      actions: [{ name: '快餐饮食' }, { name: '生活买菜' }, { name: '交通出行' }, { name: '交通出行' }, { name: '交通出行' }, { name: '交通出行' }, { name: '交通出行' }],
    };
  },
  methods: {
    // 校验函数返回 true 表示校验通过，false 表示不通过
    validator(val) {
      return /1\d{10}/.test(val);
    },
    // 异步校验函数返回 Promise
    onFailed(errorInfo) {
      console.log('failed', errorInfo);
    },
    showPopup() {
      this.show = true;
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
</style>
