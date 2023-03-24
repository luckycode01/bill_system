<template>
  <view>
    <view class="form_main">
      <u-form v-if="tabIndex==0" labelPosition="left" :model="addOneForm" :rules="dataFormRules" ref="dataFormRef">
        <u-form-item label="日期" prop="dateTime" borderBottom required @click="hideOpenPicker('time')" ref="item1">
          <u-input v-model="dataForm.dateTime" placeholder="请选择时间" border="none" disabled disabledColor="#fff"></u-input>
        </u-form-item>
        <u-form-item label="分类" prop="categoryValue" borderBottom required @click="hideOpenPicker('cate')" ref="item1">
          <u-input v-model="dataForm.categoryValue" placeholder="请选择分类" border="none" disabled disabledColor="#fff"></u-input>
        </u-form-item>
        <u-form-item label="金额" prop="money" required borderBottom>
          <u-input v-model="dataForm.money" placeholder="请输入金额" border="none"></u-input>
        </u-form-item>
      </u-form>
      <u-form v-if="tabIndex==1" labelPosition="left" labelWidth="80" :model="batchFormData" :rules="dataFormRules" ref="batchFormRef">
        <u-form-item label="日期" prop="dateTime" borderBottom required @click="hideOpenPicker('time')">
          <u-input v-model="dataForm.dateTime" placeholder="请选择时间" border="none" disabled disabledColor="#fff"></u-input>
        </u-form-item>
        <u-form-item label="快餐饮食" prop="amount" borderBottom>
          <u-input v-model="dataForm.amount" placeholder="请输入金额" border="none"></u-input>
        </u-form-item>
      </u-form>
      <u-form v-if="tabIndex==2" labelPosition="left" labelWidth="80" :model="houseFormData" :rules="dataFormRules" ref="houseFormRef">
        <u-form-item label="日期" prop="dateTime" borderBottom required @click="hideOpenPicker('time')" ref="item1">
          <u-input v-model="dataForm.dateTime" placeholder="请选择时间" border="none" disabled disabledColor="#fff"></u-input>
        </u-form-item>
        <u-form-item label="房租" prop="houseMoney" required borderBottom>
        </u-form-item>
        <u-form-item label="水表起码" prop="waterStart" required borderBottom>
          <u-input v-model="dataForm.waterStart" placeholder="请填写水表起码" border="none"></u-input>
        </u-form-item>
        <u-form-item label="水表止码" prop="waterEnd" required borderBottom>
          <u-input v-model="dataForm.waterEnd" placeholder="请填写水表止码" border="none"></u-input>
        </u-form-item>
        <u-form-item label="水费单价" prop="waterPrice" required borderBottom>
          <u-input v-model="dataForm.waterPrice" placeholder="请填写水费单价" border="none"></u-input>
        </u-form-item>
        <u-form-item label="电表起码" prop="electricityStart" required borderBottom>
          <u-input v-model="dataForm.electricityStart" placeholder="请填写电表起码" border="none"></u-input>
        </u-form-item>
        <u-form-item label="电表止码" prop="electricityEnd" required borderBottom>
          <u-input v-model="dataForm.electricityEnd" placeholder="请填写电表止码" border="none"></u-input>
        </u-form-item>
        <u-form-item label="电费单价" prop="electricityPrice" required borderBottom>
          <u-input v-model="dataForm.electricityPrice" placeholder="请填写电费单价" border="none"></u-input>
        </u-form-item>
        <u-form-item label="网费" prop="networkMoney" required borderBottom>
          <u-input v-model="dataForm.networkMoney" placeholder="请填写网费" border="none"></u-input>
        </u-form-item>
      </u-form>
    </view>
    <view class="save_btn">
      <u-button type="primary" :disabled="loading" :loading="loading" :loadingText="loadingText">
        {{ loadingText }}
      </u-button>
    </view>
    <u-datetime-picker mode="date" :show="showDateTime" v-model="selectTime" :closeOnClickOverlay="true" @close="showDateTime = false"
      @cancel="showDateTime = false" @confirm="handleConfirmTime($event, item)"></u-datetime-picker>
    <u-picker :show="showCategory" :keyName="'label'" :columns="categoryList" :closeOnClickOverlay="true" @close="showCategory = false"
      @cancel="showCategory = false" @confirm="handleConfirmCate($event, item)"></u-picker>
  </view>
</template>

<script>
import dayjs from "dayjs";
// const dayjs = require("dayjs");
export default {
  props: {
    tabIndex: {
      type: Number,
      default: 0,
    }
  },
  data() {
    return {
      addOneForm: {
        dateTime: "",
        categoryValue: "",
        money: "",
      },
      batchFormData: {
        dateTime: "",
        food: "",
        life: "",
        traffic: "",
        dailyuse: "",
        telephonebill: "",
        car: "",
        clothing: "",
        fruitsnacks: "",
        health: "",
        other: "",
      },
      houseFormData: {
        dateTime: "",
        houseMoney: "",
        waterStart: "",
        waterEnd: "",
        waterPrice: "",
        electricityStart: "",
        electricityEnd: "",
        electricityPrice: "",
        networkMoney: "",
        totalMoney: "",
      },
      selectTime: Number(new Date()),

      loading: false,
      loadingText: "保存",
      showDateTime: false,
      showCategory: false,
      categoryList: [
        [
          {
            label: "雪月夜",
            id: 2021,
          },
          {
            label: "冷夜雨",
            id: 804,
          },
        ],
      ],
      dataFormRules: {
        dateTime: {
          required: true,
          message: "请选择日期",
          trigger: ["blur", "change"],
        },
        categoryValue: {
          required: true,
          message: "请选择分类",
          trigger: ["blur", "change"],
        },
        money: {
          required: true,
          message: "请填写金额",
          trigger: ["blur", "change"],
        },
        houseMoney: {
          required: true,
          message: "请填写房租金额",
          trigger: ["blur", "change"],
        },
        waterStart: {
          required: true,
          message: "请填写水表起码",
          trigger: ["blur", "change"],
        },
        waterEnd: {
          required: true,
          message: "请填写水表止码",
          trigger: ["blur", "change"],
        },
        waterPrice: {
          required: true,
          message: "请填写水费单价",
          trigger: ["blur", "change"],
        },
        electricityStart: {
          required: true,
          message: "请填写电表起码",
          trigger: ["blur", "change"],
        },
        electricityEnd: {
          required: true,
          message: "请填写电表止码",
          trigger: ["blur", "change"],
        },
        monelectricityPriceey: {
          required: true,
          message: "请填写电费单价",
          trigger: ["blur", "change"],
        },
        networkMoney: {
          required: true,
          message: "请填写网费",
          trigger: ["blur", "change"],
        },
      },
    };
  },
  methods: {
    handleClose() {
      this.showDateTime = false;
    },
    hideOpenPicker(tag) {
      if (tag == "time") {
        this.showDateTime = true;
      } else if (tag == "cate") {
        this.showCategory = true;
      }
      uni.hideKeyboard();
    },
    hideKeyBorder(e) {
      uni.hideKeyboard();
    },
    handleConfirmTime(value) {
      console.log(dayjs(value));
      dayjs.format(value);
      console.log(dayjs().format(value));
    },
  },
};
</script>

<style lang="scss" scoped>
.form_main {
  padding: 36rpx;
}
.save_btn {
  margin: 18rpx auto 36rpx;
  width: 240rpx;
}
</style>