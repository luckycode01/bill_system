<template>
  <div class="expend-contend">
    <el-table :data="[{}]" show-summary :summary-method="getSummaries" style="width: 100%" border>
      <el-table-column :prop="item.label" :label="item.label" v-for="item in columnsList" :key="item.value" align="center" width="width"></el-table-column>
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
export default {
  data() {
    return {
      columnsList: [
        {
          value: 'category1',
          label: '水表起码',
        },
        {
          value: 'category2',
          label: '水表止码',
        },
        {
          value: 'category3',
          label: '水表起码',
        },
        {
          value: 'category4',
          label: '水表止码',
        },
        
      ]
    }
  },
  methods: {
    getSummaries(params) {
      const noCountList = [];
      return handleSummaries(params, noCountList)
    }
  },
}
</script>

<style lang="scss" scoped>
.expend-contend {}
</style>