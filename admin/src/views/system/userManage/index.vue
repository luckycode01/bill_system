<template>
  <div class="container">
    <el-row :gutter="10" class="mg-b12">
      <el-col :span="3">
        <el-input v-model="searchData.userName" @change="handleSearch" clearable placeholder="请输入用户名" prefix-icon="el-icon-search" size="mini" @keyup.native.enter="getDataList(1)"></el-input>
      </el-col>
      <el-col :span="3">
        <el-input v-model="searchData.mobile" @change="handleSearch" clearable placeholder="请输入手机号" prefix-icon="el-icon-search" size="mini"></el-input>
      </el-col>
      <el-col :span="3">
        <el-select v-model="searchData.userType" @change="handleSearch" clearable placeholder="请选择用户类型" prefix-icon="el-icon-search" size="mini">
          <el-option label="管理用户" value="1"></el-option>
          <el-option label="普通用户" value="2"></el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select v-model="searchData.state" @change="handleSearch" clearable placeholder="请选择用户状态" prefix-icon="el-icon-search" size="mini">
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
        <el-date-picker v-model="searchData.timeArr" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00','23:59:59']" @change="handleSearch" clearable type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="mini">
        </el-date-picker>
      </el-col>
      <el-col :span="5" style="text-align:right">
        <el-button type="primary" size="mini" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        <el-button type="primary" plain size="mini" icon="el-icon-refresh" @click="reset">重置</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="mg-b12">
      <el-button type="primary" size="mini" icon="el-icon-plus" @click="($event)=>openAddOrEditUser()">添加用户</el-button>
      <el-button type="danger" size="mini" icon="el-icon-delete" @click="($event)=>deleteUser()">批量删除</el-button>
    </el-row>
    <el-table v-loading="loading" :data="usersList" style="width: 100%" :height="tableHeight" border stripe>
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="username" align="center" label="用户名" width="80"></el-table-column>
      <el-table-column align="center" label="用户类型" width="80">
        <template slot-scope="{row}">
          <span>{{row.userType==1?'管理用户':'普通用户'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="mobile" align="center" label="电话" show-overflow-tooltip></el-table-column>
      <el-table-column prop="email" align="center" label="邮箱" show-overflow-tooltip min-width="width"></el-table-column>
      <el-table-column prop="roleNames" align="center" label="角色" show-overflow-tooltip min-width="width"></el-table-column>
      <el-table-column align="center" label="状态" width="80">
        <template slot-scope="{row}">
          <el-switch v-model="row.state" active-color="#13ce66" @change="handleUserState(row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" align="center" label="创建时间" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{row.createTime | handleTime}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" align="center" label="修改时间" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span>{{row.updateTime | handleTime}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="introduce" align="center" label="用户简介" show-overflow-tooltip min-width="width"></el-table-column>
      <el-table-column label="操作" align="center" width="120">
        <template slot-scope="{row}">
          <el-button @click="openAddOrEditUser(row)" type='text' icon="el-icon-edit" size='mini'>编辑</el-button>
          <el-button @click="deleteUser(row)" type='text' icon="el-icon-delete" size='mini' style="color:red">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination  :total="total" :page.sync="searchData.pageNum" :limit.sync="searchData.pageSize" @pagination="getDataList" />
    <addOrEditUser ref="addOrEditUserRef" @getDataList="getDataList"></addOrEditUser>
  </div>
</template>

<script>
import { getUserlistReq, changeUsersStateReq, deleteUser } from "@/api/user/list";
import addOrEditUser from '@/views/system/userManage/components/addOrEditUser';
import tableHeight from '@/mixin/tableHeight';
import dayjs from "dayjs";
export default {
  components: {
    addOrEditUser
  },
  mixins: [tableHeight],
  data() {
    return {
      searchData: {
        userName: '',
        mobile: '',
        state: '',
        userType: '',
        timeArr: [],
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      loading: false,
      usersList: [],
      dataForm: {},
    }
  },
  created() {
    this.getDataList();
  },
  filters: {
    handleTime(val) {
      return val ? dayjs(val).format('YYYY-MM-DD HH:mm:ss') : ''
    }
  },
  methods: {
    handleSearch() {
      this.searchData.pageNum = 1;
      const timeArr = this.searchData.timeArr;
      if (timeArr && timeArr.length) {
        this.searchData.startTime = timeArr[0] ? timeArr[0] : '';
        this.searchData.endTime = timeArr[1] ? timeArr[1] : '';
      } else {
        this.searchData.startTime = '';
        this.searchData.endTime = '';
      }
      this.getDataList();
    },
    deleteUser(row) {
      if (!row) {
        this.$message.info("功能开发中")
      } else {
        this.$confirm(`是否删除用户< ${row.username} >?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await deleteUser({ id: row.id })
          if (res.meta.status == 200) {
            this.$message.success(res.meta.msg);
            if (this.usersList.length == 1 && this.searchData.pageNum > 1) {
              this.searchData.pageNum--;
            }
            this.getDataList(this.searchData.pageNum);
          } else {
            this.$message.error(res.meta.msg);
          }
        }).catch(() => { });
      }
    },
    // 获取用户列表
    async getDataList() {
      try {
        const params = { ...this.searchData };
        delete params.timeArr;
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
      }
    },
    async handleUserState(row) {
      const res = await changeUsersStateReq({ id: row.id, state: row.state.toString() });
      if (res.meta.status == 200) {
        this.$message.success(res.meta.msg);
      } else {
        this.$message.error(res.meta.msg);
      }
      this.getDataList(this.searchData.pageNum);
    },
    openAddOrEditUser(row) {
      this.$refs.addOrEditUserRef.init(row);
    },
    reset() {
      this.searchData = {
        userName: '',
        mobile: '',
        state: '',
        userType: '',
        timeArr: [],
        pageNum: 1,
        pageSize: 10,
      };
      this.getDataList();
    },
  }
}
</script>

<style lang="scss" scoped>
.el-range-editor--mini.el-input__inner {
  width: 100%;
}
</style>