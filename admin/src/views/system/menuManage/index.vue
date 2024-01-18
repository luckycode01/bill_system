<template>
  <div class="container">
    <el-row :gutter="10" class="mg-b12">
      <el-input class="mr-24" v-model="searchForm.menuName" placeholder="请输入菜单名称" size="mini" style="width:210px;" clearable @change="handleSearch"></el-input>
      <el-select class="mr-24" v-model="searchForm.menuState" @change="handleSearch" clearable placeholder="请选择菜单状态" prefix-icon="el-icon-search" size="mini">
        <el-option label="正常" value="1"></el-option>
        <el-option label="停用" value="2"></el-option>
      </el-select>
      <el-button type="primary" size="mini" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      <el-button type="primary" size="mini" icon="el-icon-refresh" plain @click="reset">重置</el-button>
    </el-row>
    <el-row :gutter="10" class="mg-b12">
      <el-button type="primary" size="mini" icon="el-icon-plus" @click="($event)=>openAddOrEditMenu()">添加菜单</el-button>
      <el-button type="danger" size="mini" icon="el-icon-delete" @click="($event)=>deleteMenu()">批量删除</el-button>
    </el-row>
    <el-table v-loading="loading" :data="menuList" style="width: 100%" :height="tableHeight" row-key="id" default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}" border stripe>
      <el-table-column prop="authName" align="center" label="菜单名称" width="140"></el-table-column>
      <el-table-column prop="roleDesc" align="center" label="图标"  width="80"></el-table-column>
      <el-table-column prop="roleDesc" align="center" label="排序"  width="80"></el-table-column>
      <el-table-column prop="roleDesc" align="center" label="权限标识" show-overflow-tooltip width="width"></el-table-column>
      <el-table-column prop="roleDesc" align="center" label="组件路径" show-overflow-tooltip width="width"></el-table-column>
      <el-table-column prop="roleDesc" align="center" label="状态" width="80"></el-table-column>
      <el-table-column prop="createTime" align="center" label="创建时间"  width="140">
        <template slot-scope="{row}">
          <span>{{row.createTime | handleTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="{row}">
          <el-button @click="openAddOrEditMenu(row,'add')" type='text' icon="el-icon-plus" size='mini'>添加</el-button>
          <el-button @click="openAddOrEditMenu(row,'edit')" type='text' icon="el-icon-edit" size='mini'>编辑</el-button>
          <el-button @click="deleteMenu(row)" type='text' icon="el-icon-delete" size='mini' style="color:red">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="" :visible.sync="addOrEditMenuDialog" width="500px" :before-close="dialogBeforeClose">
      <el-form ref="addOrEditMenuFormRef" :rules="addorEditRules" :model="addOrEditMenuForm" label-width="80px">
        <el-form-item label="角色名称" prop="roleName">

        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogBeforeClose" size="mini">取 消</el-button>
        <el-button type="primary" @click="submitAddOrMenu" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { } from "@/api/user/role";
import { getMenuList } from "@/api/user/menus";
import tableHeight from '@/mixin/tableHeight';

import dayjs from "dayjs";
export default {
  components: {
  },
  mixins: [tableHeight],
  data() {
    return {
      searchForm: {
        menuState: '',
        menuName: '',
      },
      loading: false,
      menuList: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      addOrEditMenuDialog: false,
      addOrEditMenuForm: {

      },
      addorEditRules: {
        menuName: [{ required: true, message: "请输入角色名称", tigger: 'blue' }]
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
    submitAddOrMenu() {
      this.$refs.addOrEditMenuFormRef.validate(val => {
        if (val) {

        }
      })
    },
    handleSearch() {
      this.pageInfo.pageNum = 1;
      this.getDataList();
    },
    async getDataList() {
      try {
        const params = {
          menuName: this.menuName,
          pageNum: this.pageInfo.pageNum,
          pageSize: this.pageInfo.pageSize,
        }
        const res = await getMenuList(params);
        if (res.meta.status == 200) {
          this.menuList = res.data || [];
          this.pageInfo.total = res.data.total;
        }

      } catch (err) {
        console.log(err);
      }
    },
    openAddOrEditMenu(row, type) {
      if (row) {

      }

      this.addOrEditMenuDialog = true;

    },
    deleteMenu(row) {
      if (!row) {
        this.$message.info("功能开发中")
      } else {
        this.$confirm(`是否删除菜单< ${row.menuName} >?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {

        }).catch(() => { });
      }
    },

    dialogBeforeClose(done) {
      this.$refs.addOrEditMenuFormRef.resetFields();
      const keys = Object.keys(this.addOrEditMenuForm);
      keys.forEach(item => {
        this.addOrEditMenuForm[item] = '';
      })

      done instanceof Function ? done() : this.addOrEditRoleDialog = false;
    },
    reset() {
      this.searchData = {
      };
      this.handleSearch();
    },
  }
}
</script>

<style lang="scss" scoped>
</style>