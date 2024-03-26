<template>
  <div class="container">
    <el-row :gutter="24" class="mg-b12">
      <el-col :span="6">
        <el-date-picker v-model="dateTime" type="year" size="mini" placeholder="选择日期" style="width:100%"></el-date-picker>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" size="mini" icon="el-icon-plus" @click="($event)=>openAddOrEditRecord()">添加记录</el-button>
      </el-col>
    </el-row>
    <el-table :data="[{}]" show-summary :summary-method="getSummaries" style="width: 100%" border>
      <el-table-column prop="dateTime" label="日期" align="center" width="width"></el-table-column>
      <el-table-column prop="salary" label="工资收入" align="center" width="width"></el-table-column>
      <el-table-column prop="project" label="项目奖金" align="center" width="width"></el-table-column>
      <el-table-column prop="allowance" label="出差补贴" align="center" width="width"></el-table-column>
      <el-table-column prop="refund" label="纳税退税" align="center" width="width"></el-table-column>
      <el-table-column prop="prop" label="支出" align="center" width="width"></el-table-column>
      <el-table-column prop="prop" label="合计" align="center" width="width"></el-table-column>
      <el-table-column prop="prop" label="结余" align="center" width="width"></el-table-column>
      <el-table-column prop="remake" label="备注" align="center" width="width"></el-table-column>
      <el-table-column label="操作" align="center" width="120">
        <template slot-scope="{row}">
          <el-button type='text' icon="el-icon-edit" size='mini' @click="($event)=>openAddOrEditRecord(row)">编辑</el-button>
          <el-button type='text' icon="el-icon-delete" size='mini' style="color:red" @click="($event)=>deleteRecord(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="pageInfo.total >= pageInfo.pageSize">
      <pagination :total="pageInfo.total" :page.sync="pageInfo.pageNum" :limit.sync="pageInfo.pageSize" @pagination="getDataList" />
    </div>
    <AddOrEditRecord ref="addOrEditRecordRef"></AddOrEditRecord>
  </div>
</template>

<script>
import { handleSummaries } from "@/utils";
export default {
  components:{
    AddOrEditRecord:()=>import("./components/addOrEditRecord")
  },
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
    openAddOrEditRecord(row){
      this.$refs.addOrEditRecordRef.init(row);
    },
    deleteRecord(row){},
    getSummaries(params) {
      const noCountList = ["备注"];
      return handleSummaries(params, noCountList)
    }
  }
}
</script>

<style>
</style>