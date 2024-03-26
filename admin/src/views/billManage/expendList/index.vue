<template>
  <div class="expend-contend">
    <el-row :gutter="10" class="mg-b12">
      <el-form ref="formDataRef" :model="searchForm" label-width="80px">
        <el-col :span="4">
          <el-form-item label="用户">
            <el-select v-model="searchForm.userId" @change="handleChangeUser" placeholder="请选择用户" size="mini">
              <el-option v-for="item in []" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="账单时间">
            <el-date-picker v-model="searchForm.expendTime" size="mini" type="daterange" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
              :default-time="['00:00:00', '23:59:59']" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="getDataList"
              style="width: 100%"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" size="mini" @click="handleToAdd()">添加记录</el-button>
        </el-col>
      </el-form>
    </el-row>
    <el-table :data="[{}]" size="mini" show-summary :summary-method="getSummaries" style="width: 100%" border>
      <el-table-column header-align="center" align="center" prop="date" label="日期" width="100">
        <template slot-scope="{row}">
          <el-button type="text" @click="handleToDetail(row)" style="padding:0">2022-03-12</el-button>
        </template>
      </el-table-column>
      <el-table-column :prop="item.fieldName" :label="item.cateName" v-for="item in tableHeaderList" :key="item.cateId" align="center" width="width">
      </el-table-column>
      <el-table-column prop="item.cateName" label="备注" align="center" width="width"></el-table-column>
    </el-table>
    <AddExpend ref="addExpend" :categoryList="tableHeaderList"></AddExpend>
    <ExpendDetail ref="expendDetail"></ExpendDetail>
  </div>
</template>

<script>
import { handleSummaries } from "@/utils";
import { getCategoryList } from "@/api/bill/category"

export default {
  components: {
    ExpendDetail: () => import('./components/expendDetail'),
    AddExpend: () => import('./components/AddExpend')
  },
  data() {
    return {
      tableHeaderList: [],
      searchForm: {
        expendTime: '',
        expendStartTime: '',
        expendETime: '',
        userId: ''
      },
    }
  },
  created() {
    this.getTableHeader();
  },
  methods: {
    handleChangeUser() { },
    getDataList() { },

    handleToAdd() {
      this.$refs.addExpend.init();
    },
    handleToDetail(row) {
      this.$refs.expendDetail.init(row);
    },
    // 获取表头
    async getTableHeader() {
      try {
        const params = {
          pageNum: 1,
          pageSize: 0,
        };
        const res = await getCategoryList(params);
        if (res.meta.status == 200) {
          this.tableHeaderList = (res.data && res.data.data) || [];
        } else {
          this.$message.error(res.meta.msg);
          this.tableHeaderList = [];
        }
      } catch (err) {
        this.$message.error(err);
      }
    },
    getSummaries(params) {
      const noCountList = [];
      return handleSummaries(params, noCountList)
    }
  },
}
</script>

<style lang="scss" scoped>
.expend-contend {
}
</style>