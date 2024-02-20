<template>
  <div class="container">
    <el-row :gutter="10" class="mg-b12">
      <el-col :span="5">
        <el-date-picker v-model="dateTime" type="year" size="mini" placeholder="选择日期" style="width:100%"></el-date-picker>
      </el-col>
      <el-button type="primary" size="mini" icon="el-icon-plus" @click="($event)=>openAddOrEditRecord()">添加记录</el-button>
    </el-row>
    <el-table :data="[{}]" show-summary :summary-method="getSummaries" style="width: 100%" border>
      <el-table-column prop="dateTime" label="日期" align="center" width="80"></el-table-column>
      <el-table-column prop="prop" label="房租" align="center" width="70"></el-table-column>
      <el-table-column prop="prop" label="水表起码" align="center" width="width"></el-table-column>
      <el-table-column prop="prop" label="水表止码" align="center" width="width"></el-table-column>
      <el-table-column prop="prop" label="水量m³" align="center" width="70"></el-table-column>
      <el-table-column prop="prop" label="水费" align="center" width="70"></el-table-column>
      <el-table-column prop="prop" label="电表起码" align="center" width="width"></el-table-column>
      <el-table-column prop="prop" label="电表止码" align="center" width="width"></el-table-column>
      <el-table-column prop="prop" label="电量(°)" align="center" width="70"></el-table-column>
      <el-table-column prop="prop" label="电费" align="center" width="70"></el-table-column>
      <el-table-column prop="prop" label="网费" align="center" width="70"></el-table-column>
      <el-table-column prop="prop" label="优惠" align="center" width="70"></el-table-column>
      <el-table-column prop="prop" label="押金" align="center" width="70"></el-table-column>
      <el-table-column prop="prop" label="合计" align="center" width="70"></el-table-column>
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
      dateTime: '',
      pageInfo: {
        total: 0,
        pageNum: 1,
        pageSize: 12,
      },
    }
  },
  created() {
    this.dateTime = new Date().getFullYear().toString();
  },
  methods: {
    getDataList() { },
    getSummaries(params) {
      const noCountList = ["水表起码", "水表止码", "电表起码", "电表止码", "押金"];
      return handleSummaries(params, noCountList)
    }
  }
}
</script>

<style>
</style>