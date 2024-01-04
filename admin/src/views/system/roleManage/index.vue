<template>
  <div class="container">
    <el-row :gutter="10" class="mg-b12">
      <el-input v-model="roleName" placeholder="请输入角色名称" size="mini" style="width:260px" @change="getDataList(1)">
        <template slot="append"><i class="icon el-icon-search cursor" @click="getDataList(1)"></i></template>
      </el-input>
    </el-row>
    <el-row :gutter="10" class="mg-b12">
      <el-button type="primary" size="mini" icon="el-icon-plus" @click="($event)=>openAddOrEditRole()">添加角色</el-button>
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
          <el-button @click="openAddOrEditRole(row,'detail')" type='text' icon="el-icon-more-outline" size='mini'>详情</el-button>
          <el-button @click="($event)=>openAddOrEditRole(row)" type='text' icon="el-icon-edit" size='mini'>编辑</el-button>
          <el-button @click="deleteRole(row)" type='text' icon="el-icon-delete" size='mini' style="color:red">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="pageInfo.total > pageInfo.pageSize" :total="pageInfo.total" :page.sync="pageInfo.pageNum" :limit.sync="pageInfo.pageSize" @pagination="getDataList" />
    <el-dialog title="" :visible.sync="addOrEditRoleDialog" width="500px" :before-close="dialogBeforeClose">
      <el-form ref="addorEditroleFormRef" :rules="addorEditRules" :model="addorEditroleForm" label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addorEditroleForm.roleName" :disabled="isDisabled" required placeholder="请输入角色名称" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addorEditroleForm.roleDesc" :disabled="isDisabled" type="textarea" placeholder="请输入角色描述"></el-input>
        </el-form-item>
        <el-form-item label="菜单权限">
          <el-card class="role-list">
            <el-tree :data="menuList" :props="treeProps" show-checkbox default-expand-all @node-click="handleNodeClick"></el-tree>
          </el-card>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogBeforeClose" size="mini">取 消</el-button>
        <el-button v-if="!isDisabled" type="primary" @click="submitAddOrEdit" size="mini">确 定</el-button>
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
      roleList:[],
      menuList: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      addOrEditRoleDialog: false,
      isDisabled: false,
      addorEditroleForm: {
        roleName: '',
        roleDesc: '',
        menuIdList: [],
      },
      addorEditRules: {
        roleName: [{ required: true, message: "请输入角色名称", tigger: 'blue' }]
      },
      treeProps: {
        children: 'children',
        label: 'label'
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
    submitAddOrEdit() {
      this.$refs.addorEditroleFormRef.validate(val => {
        if (val) {

        }
      })
    },
    handleNodeClick(data) {
      console.log(data);
    },
    async getDataList() {
      try {
        const params = {
          roleName: this.roleName,
          pageNum: this.pageInfo.pageNum,
          pageSize: this.pageInfo.pageSize,
        }
        const res = await getRoleslistReq(params);
        if (res.meta.status == 200) {
          this.roleList = res.data.data || [];
          this.pageInfo.total = res.data.total;
        }

      } catch (err) {
        console.log(err);
      }
    },
    openAddOrEditRole(row, type) {
      if (row) {
        if (type && type == 'detail') this.isDisabled = true;
        this.addorEditroleForm.id = row.id;
        this.addorEditroleForm.roleName = row.roleName;
        this.addorEditroleForm.roleDesc = row.roleDesc;
        this.addorEditroleForm.menuIdList = row.menuIdList;
        console.log(this.addorEditroleForm);

      }

      this.addOrEditRoleDialog = true;

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

    dialogBeforeClose(done) {
      this.isDisabled = false;
      this.$refs.addorEditroleFormRef.resetFields();
      const keys = Object.keys(this.addorEditroleForm);
      keys.forEach(item => {
        this.addorEditroleForm[item] = '';
      })
      this.addorEditroleForm.menuIdList = [];
      done instanceof Function ? done() : this.addOrEditRoleDialog = false;
    },
  }
}
</script>

<style lang="scss" scoped>
.el-range-editor--mini.el-input__inner {
  width: 100%;
}
::v-deep .el-dialog__body {
  padding: 30px 20px 0;
}
.role-list {
  height: 240px;
  overflow: hidden;
  overflow-y: auto;
}
</style>