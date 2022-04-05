<template>
  <div>
    <Header :leftIcon="'arrow-left'" :title="'添加收入'"></Header>
    <div class="layout">
      <van-tabs @click="onClick">
        <van-tab title="工资收入">
          <van-form validate-first @failed="onFailed">
            <van-field v-model="phone" required label="日期" @click="showPopup" placeholder="请选择日期" />
            <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
              <van-datetime-picker v-model="currentDate" type="year-month" title="选择年月" :min-date="minDate" :max-date="maxDate" :formatter="formatter" />
            </van-popup>
            <van-field v-model="phone" label="工资收入" placeholder="请输入金额" />
            <van-field v-model="phone" label="社保扣除" placeholder="请输入金额" />
            <van-field v-model="phone" label="公积金" placeholder="请输入金额" />
            <van-field v-model="phone" label="其他扣除" placeholder="请输入金额" />
            <van-field v-model="phone" label="扣除后工资" placeholder="请输入金额" />
            <div style="margin: 16px;">
              <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
          </van-form>
        </van-tab>
        <van-tab title="其他收入">
          <van-form validate-first @failed="onFailed">
            <van-field v-model="phone" required label="日期" @click="showPopup" placeholder="请选择日期" />
            <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
              <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" />
            </van-popup>
            <van-cell is-link title="选择分类" @click="showType = true" />
            <van-action-sheet v-model="showType" :actions="actions" style='height:40%' @select="onSelect" />
            <van-field v-model="phone" label="姓名" placeholder="请输入姓名" />
            <van-field v-model="phone" label="重量" placeholder="请输入重量" />
            <van-field v-model="phone" label="价格" placeholder="请输入价格" />
            <van-field v-model="phone" label="邮费" placeholder="请输入邮费" />
            <van-row>
              <van-col span="8">是否包邮</van-col>
              <van-col span="16">
                <van-radio-group v-model="radio" direction="horizontal">
                  <van-radio name="1">单选框 1</van-radio>
                  <van-radio name="2">单选框 2</van-radio>
                </van-radio-group>
              </van-col>
            </van-row>

            <van-field v-model="phone" label="合计" placeholder="请输入合计" />
            <van-field v-model="phone" label="收款" placeholder="请输入收款" />
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
  name: 'AddIn',
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
      actions: [{ name: '葛粉收入' }, { name: '生活买菜' }, { name: '交通出行' }, { name: '交通出行' }, { name: '交通出行' }, { name: '交通出行' }, { name: '交通出行' }],
      radio: '1',
    };
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
