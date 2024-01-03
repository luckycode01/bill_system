<template>
  <div class="container">
    <el-row :gutter="10" class="mg-b12">
      <el-input v-model="roleName" placeholder="请输入角色名称" size="mini" style="width:260px" @change="getDataList(1)">
        <template slot="append"><i class="icon el-icon-search cursor"></i></template>
      </el-input>
    </el-row>
    <el-row :gutter="10" class="mg-b12">
      <el-button type="primary" size="mini" icon="el-icon-plus" @click="($event)=>openAddOrEditRole('add')">添加角色</el-button>
      <el-button type="danger" size="mini" icon="el-icon-delete" @click="($event)=>deleteRole()">批量删除</el-button>
    </el-row>
    <el-table v-loading="loading" :data="roleList" style="width: 100%" border stripe>
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="roleName" align="center" label="角色名"></el-table-column>
      <el-table-column prop="roleDesc" align="center" label="角色描述" show-overflow-tooltip min-width="width"></el-table-column>
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
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="{row}">
          <el-button @click="openAddOrEditRole('detail',row.id)" type='text' icon="el-icon-more-outline" size='mini'>详情</el-button>
          <el-button @click="openAddOrEditRole('edit',row.id)" type='text' icon="el-icon-edit" size='mini'>编辑</el-button>
          <el-button @click="deleteRole(row)" type='text' icon="el-icon-delete" size='mini' style="color:red">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="pageInfo.total>pageInfo.pageSize" :total="pageInfo.total" :page.sync="pageInfo.pageNum" :limit.sync="pageInfo.pageSize" @pagination="getDataList" />
    <el-dialog title="" :visible.sync="addOrEditRoleDialog" width="500px" :before-close="dialogBeforeClose">
      <div>
        <el-form ref="roleFormRef" :model="roleForm" label-width="80px">
          <el-form-item label="角色名称">
            <el-input v-model="roleForm.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input v-model="roleForm.roleDesc"></el-input>
          </el-form-item>
          <el-form-item label="菜单权限">

          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button @click="addOrEditRoleDialog = false">取 消</el-button>
        <el-button type="primary" @click="addOrEditRoleDialog = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRoleslistReq,
  addOrUpdateRoleReq,
  deleteRolesReq
} from "@/api/user/role";
import {
  getMenuList
} from "@/api/user/menus";

import dayjs from "dayjs";
export default {
  components: {
  },
  data() {
    return {
      roleName: '',
      loading: false,
      roleList: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      addOrEditRoleDialog: false,
      roleForm: {
        roleName: '',
        roleDesc: '',
        rights: '',
      },
    }
  },
  created() {
    this.getDataList();
  },
  filters: {
    handleTime(val) {
      return val ? dayjs(val * 1000).format('YYYY-MM-DD HH:mm:ss') : ''
    }
  },
  methods: {
    async getDataList() {
      try {
        const res = await getRoleslistReq();
        if (res.meta.status == 200) {
          this.roleList = res.data || [];
          // this.pageInfo.total = res.meta;
        }

      } catch (err) {
        console.log(err);
      }
    },
    openAddOrEditRole(type, id) {
      if (type == 'edit') {

      } else {

      }
      this.openAddOrEditRole = true;

    },
    deleteRole(row) {
      if (!row) {
        this.$message.info("功能开发中")
      } else {
        this.$confirm(`是否删除角色< ${row.roleName} >?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await deleteRolesReq({ id: row.id })
          if (res.meta.status == 200) {
            this.$message.success(res.meta.msg);
            if (this.roleList.length == 1 && this.pageInfo.pageNum > 1) {
              this.pageInfo.pageNum--;
            }
            this.getDataList();
          } else {
            this.$message.error(res.meta.msg);
          }
        }).catch(() => { });
      }
    },

    dialogBeforeClose() { },
  }
}
</script>

<style lang="scss" scoped>
.el-range-editor--mini.el-input__inner {
  width: 100%;
}
</style>