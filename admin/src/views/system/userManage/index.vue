<template>
  <div class="container">
    <el-row :gutter="10" class="mg-b12">
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
    <el-row :gutter="10" class="mg-b12">
      <el-button type="primary" size="mini" icon="el-icon-plus">添加用户</el-button>
      <el-button type="danger" size="mini" icon="el-icon-delete">批量删除</el-button>
    </el-row>
    <el-table :data="usersList" style="width: 100%" border stripe>
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="username" align="center" label="用户名" show-overflow-tooltip></el-table-column>
      <el-table-column prop="mobile" align="center" label="电话" show-overflow-tooltip></el-table-column>
      <el-table-column prop="email" align="center" label="邮箱" show-overflow-tooltip min-width="120"></el-table-column>
      <el-table-column prop="state" align="center" label="状态" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" align="center" label="创建时间" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" align="center" show-overflow-tooltip>
        <template>

        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="searchData.pageNum" :limit.sync="searchData.pageSize" @pagination="getDataList" />
  </div>
</template>

<script>
import { getUserlistReq } from "@/api/user/list"
export default {
  data() {
    return {
      searchData: {
        userName: '',
        mobiel: '',
        state: '',
        timeArr: '',
        pageNum:1,
        pageSize: 10,
      },
      total: 0,
      loading: false,
      usersList: [],
    }
  },
  created() {
    this.getDataList();
  },
  methods: {
    // 获取用户列表
    async getDataList() {
      try {
        const params = { ...this.searchData };
        this.loading = true;
        const res = await getUserlistReq(params);
        if (res.meta.status == 200) {
          this.usersList = res.data && res.data.data;
          this.total = res.data.total;
        } else {
          this.$message.error(res.meta.msg)
        }
        this.loading = false;
      } catch (err) {
        console.log(err);
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.el-range-editor--mini.el-input__inner {
  width: 100%;
}
</style>