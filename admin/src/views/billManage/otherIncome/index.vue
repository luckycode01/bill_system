<template>
  <div class="container">
    <el-row :gutter="10" class="mg-b12">
      <el-button type="primary" size="mini" icon="el-icon-plus" @click="($event)=>openAddOrEditRecord()">添加记录</el-button>
    </el-row>
    <el-table :data="[{}]" show-summary :summary-method="getSummaries" style="width: 100%" border>
      <el-table-column prop="dateTime" label="日期" align="center" width="width"></el-table-column>
      <el-table-column prop="prop" label="姓名" align="center" width="width"></el-table-column>
      <el-table-column prop="prop" label="物品" align="center" width="width"></el-table-column>
      <el-table-column prop="prop" label="单价" align="center" width="width"></el-table-column>
      <el-table-column prop="prop" label="单位" align="center" width="width"></el-table-column>
      <el-table-column prop="prop" label="邮费" align="center" width="width"></el-table-column>
      <el-table-column prop="prop" label="合计" align="center" width="width"></el-table-column>
      <el-table-column label="操作" align="center" width="120">
        <template>
          <el-button type='text' icon="el-icon-edit" size='mini'>编辑</el-button>
          <el-button type='text' icon="el-icon-delete" size='mini' style="color:red">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="pageInfo.total >= pageInfo.pageSize">
      <pagination :total="pageInfo.total" :page.sync="pageInfo.pageNum" :limit.sync="pageInfo.pageSize" @pagination="getDataList" />
    </div>
  </div>
</template>

<script>
import { handleSummaries } from "@/utils";
export default {
  data() {
    return {
      pageInfo: {
        total: 0,
        pageNum: 1,
        pageSize: 10,
      },
    }
  },
  methods: {
    getSummaries(params) {
      const noCountList = ["备注"];
      return handleSummaries(params, noCountList)
    }
  }
}
</script>

<style>
</style>