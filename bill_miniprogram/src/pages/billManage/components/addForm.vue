<template>
  <view>
    <view class="form_main">
      <!--  -->
      <u-form v-if="tabIndex=='one'" labelPosition="left" :model="addOneForm" :rules="dataFormRules" ref="dataFormRef">
        <u-form-item label="日期" prop="dateTime" borderBottom required @click="hideOpenPicker('time')" ref="item1">
          <u-input v-model="addOneForm.dateTime" placeholder="请选择时间" border="none" disabled disabledColor="#fff"></u-input>
        </u-form-item>
        <u-form-item label="分类" prop="categoryValue" borderBottom required @click="hideOpenPicker('cate')" ref="item1">
          <u-input v-model="addOneForm.categoryValue" placeholder="请选择分类" border="none" disabled disabledColor="#fff"></u-input>
        </u-form-item>
        <u-form-item label="金额" prop="money" required borderBottom>
          <u-input v-model="addOneForm.money" placeholder="请输入金额" border="none"></u-input>
        </u-form-item>
      </u-form>
      <!--  -->
      <u-form v-if="tabIndex=='batch'" labelPosition="left" labelWidth="80" :model="batchFormData" :rules="dataFormRules" ref="batchFormRef">
        <u-form-item label="日期" prop="dateTime" borderBottom required @click="hideOpenPicker('time')">
          <u-input v-model="batchFormData.dateTime" placeholder="请选择时间" border="none" disabled disabledColor="#fff"></u-input>
        </u-form-item>
        <u-form-item label="快餐饮食" prop="amount" borderBottom>
          <u-input v-model="batchFormData.amount" placeholder="请输入金额" border="none"></u-input>
        </u-form-item>
      </u-form>
      <!--  -->
      <u-form v-if="tabIndex=='house'" labelPosition="left" labelWidth="80" :model="houseFormData" :rules="dataFormRules" ref="houseFormRef">
        <u-form-item label="日期" prop="dateTime" borderBottom required @click="hideOpenPicker('time')" ref="item1">
          <u-input v-model="houseFormData.dateTime" placeholder="请选择时间" border="none" disabled disabledColor="#fff"></u-input>
        </u-form-item>
        <u-form-item label="房租" prop="houseMoney" required borderBottom>
          <u-input v-model="houseFormData.houseMoney" placeholder="请填写房租金额" border="none"></u-input>
        </u-form-item>
        <u-form-item label="水表起码" prop="waterStart" required borderBottom>
          <u-input v-model="houseFormData.waterStart" placeholder="请填写水表起码" border="none"></u-input>
        </u-form-item>
        <u-form-item label="水表止码" prop="waterEnd" required borderBottom>
          <u-input v-model="houseFormData.waterEnd" placeholder="请填写水表止码" border="none"></u-input>
        </u-form-item>
        <u-form-item label="水费单价" prop="waterPrice" required borderBottom>
          <u-input v-model="houseFormData.waterPrice" placeholder="请填写水费单价" border="none"></u-input>
        </u-form-item>
        <u-form-item label="电表起码" prop="electricityStart" required borderBottom>
          <u-input v-model="houseFormData.electricityStart" placeholder="请填写电表起码" border="none"></u-input>
        </u-form-item>
        <u-form-item label="电表止码" prop="electricityEnd" required borderBottom>
          <u-input v-model="houseFormData.electricityEnd" placeholder="请填写电表止码" border="none"></u-input>
        </u-form-item>
        <u-form-item label="电费单价" prop="electricityPrice" required borderBottom>
          <u-input v-model="houseFormData.electricityPrice" placeholder="请填写电费单价" border="none"></u-input>
        </u-form-item>
        <u-form-item label="网费" prop="networkMoney" required borderBottom>
          <u-input v-model="houseFormData.networkMoney" placeholder="请填写网费" border="none"></u-input>
        </u-form-item>
      </u-form>
      <!--  -->
      <u-form v-if="tabIndex=='salary'" labelPosition="left" labelWidth="80" :model="salaryFormData" :rules="dataFormRules" ref="houseFormRef">
        <u-form-item label="日期" prop="dateTime" borderBottom required @click="hideOpenPicker('time')" ref="item1">
          <u-input v-model="salaryFormData.dateTime" placeholder="请选择时间" border="none" disabled disabledColor="#fff"></u-input>
        </u-form-item>
        <u-form-item label="工资收入" prop="houseMoney" required borderBottom>
          <u-input v-model="salaryFormData.houseMoney" placeholder="请输入金额" border="none"></u-input>
        </u-form-item>
        <u-form-item label="社保扣除" prop="waterStart" required borderBottom>
          <u-input v-model="salaryFormData.waterStart" placeholder="请输入金额" border="none"></u-input>
        </u-form-item>
        <u-form-item label="公积金" prop="waterEnd" required borderBottom>
          <u-input v-model="salaryFormData.waterEnd" placeholder="请输入金额" border="none"></u-input>
        </u-form-item>
        <u-form-item label="其他扣除" prop="waterPrice" required borderBottom>
          <u-input v-model="houseFormData.waterPrice" placeholder="请输入金额" border="none"></u-input>
        </u-form-item>
        <u-form-item label="扣除后工资" prop="electricityStart" required borderBottom>
          <u-input v-model="houseFormData.electricityStart" placeholder="请输入金额" border="none"></u-input>
        </u-form-item>
      </u-form>
      <!--  -->
      <u-form v-if="tabIndex=='other'" labelPosition="left" labelWidth="80" :model="otherFormData" :rules="dataFormRules" ref="houseFormRef">
        <u-form-item label="日期" prop="dateTime" borderBottom required @click="hideOpenPicker('time')" ref="item1">
          <u-input v-model="otherFormData.dateTime" placeholder="请选择时间" border="none" disabled disabledColor="#fff"></u-input>
        </u-form-item>
        <u-form-item label="分类" prop="categoryValue" borderBottom required @click="hideOpenPicker('cate')" ref="item1">
          <u-input v-model="otherFormData.categoryValue" placeholder="请选择分类" border="none" disabled disabledColor="#fff"></u-input>
        </u-form-item>
        <u-form-item label="姓名" prop="houseMoney" required borderBottom>
          <u-input v-model="otherFormData.uname" placeholder="请输入姓名" border="none"></u-input>
        </u-form-item>
        <u-form-item label="重量" prop="waterStart" required borderBottom>
          <u-input v-model="otherFormData.weight" placeholder="请输入重量" border="none"></u-input>
        </u-form-item>
        <u-form-item label="价格" prop="waterEnd" required borderBottom>
          <u-input v-model="otherFormData.price" placeholder="请输入价格" border="none"></u-input>
        </u-form-item>
        <u-form-item label="邮费" prop="waterPrice" required borderBottom>
          <u-input v-model="otherFormData.postPrice" placeholder="请输入邮费" border="none"></u-input>
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
      type: String,
      default: '',
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
      salaryFormData: {
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
      otherFormData: {
        dateTime: "",
        categoryValue: "",
        uname: "",
        weight: "",
        price: "",
        postPrice: "",
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