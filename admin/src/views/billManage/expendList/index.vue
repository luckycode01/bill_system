<template>
  <div class="expend-contend">
    <el-table :data="[{}]" show-summary :summary-method="getSummaries" style="width: 100%" border>
      <el-table-column header-align="center" align="center" prop="prop" label="日期"></el-table-column>
      <el-table-column :prop="item.cateName" :label="item.cateName" v-for="item in tableHeaderList" :key="item.cateId" align="center"
        width="width"></el-table-column>
      <el-table-column label="操作" align="center" width="120">
        <template>
          <el-button type='text' icon="el-icon-edit" size='mini'>详情</el-button>
          <el-button type='text' icon="el-icon-delete" size='mini' style="color:red">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { handleSummaries } from "@/utils";
import { getCategoryList } from "@/api/bill/category"
export default {
  data() {
    return {
      tableHeaderList: []
    }
  },
  created() {
    this.getTableHeader();
  },
  methods: {
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