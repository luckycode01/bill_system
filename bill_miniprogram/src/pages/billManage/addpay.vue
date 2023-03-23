<template>
  <view class="content">
    <Header isBack :title="'添加账单'"></Header>
    <u-tabs
      :list="tabList"
      @click="handleTabChange"
      :itemStyle="tabItemStyle"
      :lineWidth="'80rpx'"
    >
    </u-tabs>
    <view class="form_main">
      <u-form
        labelPosition="left"
        :model="dataForm"
        :rules="dataFormRules"
        ref="dataFormRef"
      >
        <u-form-item
          label="日期"
          prop="dateTime"
          borderBottom
          required
          @click="hideOpenPicker('time')"
          ref="item1"
        >
          <u-input
            v-model="dataForm.dateTime"
            placeholder="请选择时间"
            border="none"
            disabled
            disabledColor="#fff"
          ></u-input>
        </u-form-item>
        <u-form-item
          label="分类"
          prop="categoryValue"
          borderBottom
          required
          @click="hideOpenPicker('cate')"
          ref="item1"
        >
          <u-input
            v-model="dataForm.dateTime"
            placeholder="请选择分类"
            border="none"
            disabled
            disabledColor="#fff"
          ></u-input>
        </u-form-item>
        <u-form-item label="金额" prop="amount" required borderBottom>
          <u-input
            v-model="dataForm.amount"
            placeholder="请输入金额"
            border="none"
          ></u-input>
        </u-form-item>
      </u-form>
    </view>
    <u-datetime-picker
      mode="date"
      v-model="dataForm.dateTime"
      :show="showDateTime"
      :closeOnClickOverlay="true"
      @close="showDateTime = false"
      @cancel="showDateTime = false"
      @confirm="handleConfirmTime($event, item)"
    ></u-datetime-picker>
  </view>
</template>

<script>
import * as dayjs from "dayjs";
export default {
  components: {},
  data() {
    return {
      tabList: [
        {
          name: "单项记录",
        },
        {
          name: "批量记录",
        },
        {
          name: "租房记录",
        },
      ],
      dataForm: {
        dateTime: "",
        amount: "",
      },
      showDateTime: false,
      showCategory: false,
      dataFormRules: {
        dateTime: {
          required: true,
          message: "请填写姓名",
          trigger: ["blur", "change"],
        },
        categoryValue: {
          required: true,
          message: "请填写姓名",
          trigger: ["blur", "change"],
        },
        amount: {
          required: true,
          message: "请填写姓名",
          trigger: ["blur", "change"],
        },
      },
      tabItemStyle: {
        width: "33%",
        height: "44px",
      },
    };
  },
  // 需要在节点加载到页面后调用
  onReady() {},

  methods: {
    handleTabChange() {},
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
      console.log(value);
      console.log(dayjs);
      dayjs.format(value);
      console.log(dayjs().format(value));
      console.log(this.dataForm);
    },
  },
};
</script>

<style lang="scss" scoped>
.form_main {
  padding: 48rpx;
}
</style>
