<template>
  <div class="container">
    <el-row :gutter="10" class="mg-b12">
      <el-col :span="5">
        <el-date-picker v-model="dateTime" type="year" size="mini" placeholder="选择日期" style="width:100%"></el-date-picker>
      </el-col>
      <el-button type="primary" size="mini" icon="el-icon-plus" @click="($event)=>openAddOrEditRecord()">添加记录</el-button>
    </el-row>
    <el-table :data="[{dateTime:'2022-03-12'}]" show-summary :summary-method="getSummaries" style="width: 100%" border>
      <el-table-column prop="rentTime" label="日期" align="center" width="100"></el-table-column>
      <el-table-column prop="prop" label="合计" align="center" width="width"></el-table-column>
      <el-table-column prop="rent" label="房租" align="center" width="width"></el-table-column>
      <el-table-column prop="waterStart" label="水表起码" align="center" width="width"></el-table-column>
      <el-table-column prop="waterEnd" label="水表止码" align="center" width="width"></el-table-column>
      <el-table-column prop="waterNum" label="水量m³" align="center" width="width"></el-table-column>
      <el-table-column prop="waterExpend" label="水费" align="center" width="width"></el-table-column>
      <el-table-column prop="electricityStart" label="电表起码" align="center" width="width"></el-table-column>
      <el-table-column prop="electricityEnd" label="电表止码" align="center" width="width"></el-table-column>
      <el-table-column prop="electricityNum" label="电量(°)" align="center" width="width"></el-table-column>
      <el-table-column prop="electricityExpend" label="电费" align="center" width="width"></el-table-column>
      <el-table-column label="网费" align="center" width="width">
        <template slot-scope="{row}">
          <span>{{row.networkAmount || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="优惠" align="center" width="width">
        <template slot-scope="{row}">
          <span>{{row.preferential || '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="押金" align="center" width="width">
        <template slot-scope="{row}">
          <span>{{row.rentDeposit|| '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="水电单价" align="center" width="width">
        <template slot-scope="{row}">
          <span>{{row.waterPrice}}/{{row.electricityPrice}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="other" label="其他" align="center" width="width"></el-table-column>
      <el-table-column prop="remake" label="备注" align="center" width="width"></el-table-column>
      <el-table-column label="操作" align="center" width="120" fixed="right">
        <template slot-scope="{row}">
          <el-button type='text' icon="el-icon-edit" size='mini' @click="($event)=>openAddOrEditRecord(row)">编辑</el-button>
          <el-button type='text' icon="el-icon-delete" size='mini' style="color:red">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="pageInfo.total >= pageInfo.pageSize">
      <pagination :total="pageInfo.total" :page.sync="pageInfo.pageNum" :limit.sync="pageInfo.pageSize" @pagination="getDataList" />
    </div>
    <AddOrEditRent ref="addOrEditRentRef"></AddOrEditRent>
  </div>
</template>

<script>
import { handleSummaries } from "@/utils";
export default {
  components: {
    AddOrEditRent: () => import("./components/addOrEditRent")
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
    getDataList() { },
    openAddOrEditRecord(row) {
      this.$refs.addOrEditRentRef.init(row);
    },
    getSummaries(params) {
      const noCountList = ["水表起码", "水表止码", "电表起码", "电表止码", "押金"];
      return handleSummaries(params, noCountList)
    }
  }
}
</script>

<style>
</style>