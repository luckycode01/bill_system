<template>
  <div>
    <el-card>
      <el-form inline>
        <el-form-item>
          <el-input v-model="tempSearchObj.roleName" style="width:300px" clearable placeholder="角色名称" />
        </el-form-item>

        <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
        <!-- <el-button @click="resetSearch">清空</el-button> -->
      </el-form>

      <div style="margin-bottom: 20px">
        <el-button type="primary" @click="addRole">添加</el-button>
        <el-button type="danger" @click="removeRoles()" :disabled="selectedRoles.length === 0">批量删除</el-button>
      </div>

      <el-table border stripe style="width:100%" v-loading="listLoading" :data="roles" @selection-change="handleSelectionChange">

        <el-table-column type="selection" width="55" />

        <el-table-column type="index" label="序号" width="80" align="center">
        </el-table-column>

        <el-table-column label="角色名称">
          <template slot-scope="{row}">
            <template v-if="row.edit">
              <el-input v-model="row.roleName" class="edit-input" size="small" />
              <el-button class="cancel-btn" size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(row)">
                取消
              </el-button>
            </template>
            <span v-else>{{ row.roleName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
        </el-table-column>

        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="{row}">
            <HintButton size="mini" type="info" icon="el-icon-info" title="分配权限" @click="$router.push(`/acl/role/auth/${row.id}?roleName=${row.roleName}`)" />

            <template>
              <HintButton size="mini" type="primary" icon="el-icon-check" title="确定" @click="updateRole(row)" v-if="row.edit" />
              <HintButton size="mini" type="primary" icon="el-icon-edit" title="修改角色" @click="row.edit= true" v-if="!row.edit" />
            </template>

            <HintButton size="mini" type="danger" icon="el-icon-delete" title="删除角色" @click="removeRole(row)" />
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件 -->
      <el-pagination :current-page="page" :total="total" :page-size="limit" :page-sizes="[5, 10, 20, 30, 40, 50, 100]" style="padding: 20px 0;" layout="prev, pager, next, jumper, ->, sizes, total" @current-change="getRoles" @size-change="handleSizeChange" />
    </el-card>
  </div>
</template>

<script>

export default {

  name: 'RoleList',

  data() {
    return {
      listLoading: false, // 数据是否正在加载
      roles: [], // 角色列表
      total: 0, // 总记录数
      page: 1, // 当前页码
      limit: 5, // 每页记录数
      tempSearchObj: { // 收集搜索条件数据
        roleName: '',
      },
      searchObj: { // 发送请求的条件参数数据
        roleName: '',
      },
      selectedRoles: [] // 所有选中的角色列表
    }
  },

  mounted() {
    this.getRoles()
  },

  methods: {

    /*
    取消修改
    */
    cancelEdit(role) {

    },

    /*
    更新角色
    */
    updateRole(role) {

    },

    /*
    每页数量发生改变的监听
    */
    handleSizeChange(pageSize) {
      this.limit = pageSize
      this.getRoles()
    },

    /*
    添加角色
    */
    addRole() {

    },

    /*
    异步获取角色分页列表
    */
    getRoles(page = 1) {

    },

    /*
    根据搜索条件进行搜索
    */
    search() {
      this.searchObj = { ...this.tempSearchObj }
      this.getRoles()
    },

    /*
    重置查询表单搜索列表
    */
    resetSearch() {
      this.tempSearchObj = {
        roleName: ''
      }
      this.searchObj = {
        roleName: ''
      }
      this.getRoles()
    },

    /*
    删除指定的角色
    */
    removeRole({ id, roleName }) {

    },

    /*
    当表格复选框选项发生变化的时候触发
    */
    handleSelectionChange(selection) {
      this.selectedRoles = selection
    },

    /*
    批量删除
    */
    removeRoles() {

    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
