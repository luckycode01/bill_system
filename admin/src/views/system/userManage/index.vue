<template>
  <div class="container">
    <el-row :gutter="10" style="margin-bottom:12px">
      <el-col :span="4">
        <el-input v-model="searchData.userName" placeholder="请输入用户名" prefix-icon="el-icon-search" size="mini"></el-input>
      </el-col>
      <el-col :span="4">
        <el-input v-model="searchData.mobiel" placeholder="请输入手机号" prefix-icon="el-icon-search" size="mini"></el-input>
      </el-col>
      <el-col :span="4">
        <el-select v-model="searchData.state" placeholder="请选择用户状态" prefix-icon="el-icon-search" size="mini"></el-select>
      </el-col>
      <el-col :span="6">
        <el-date-picker v-model="searchData.timeArr" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini">
        </el-date-picker>
      </el-col>
      <el-col :span="5" style="text-align:right">
        <el-button type="primary" size="mini" icon="el-icon-search">搜索</el-button>
        <el-button type="primary" plain size="mini" icon="el-icon-refresh">重置</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-button type="primary" size="mini" icon="el-icon-plus">添加用户</el-button>
      <el-button type="danger" size="mini" icon="el-icon-delete">批量删除</el-button>
    </el-row>
    <el-table :data="dataList" style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchData: {
        userName: '',
        mobiel: '',
        state: '',
        timeArr: '',
      },
      dataList: [{}],
    }
  }
}
</script>

<style lang="scss" scoped>
.el-range-editor--mini.el-input__inner {
  width: 100%;
}
</style>