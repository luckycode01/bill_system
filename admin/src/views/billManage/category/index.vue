<template>
  <div class="container">
    <el-row :gutter="10" class="mg-b12">
      <el-button type="primary" size="mini" icon="el-icon-plus" @click="($event)=>openAddOrEditRecord()">添加分类</el-button>
    </el-row>
    <el-table :data="[{}]" style="width: 100%" border>
      <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
      <el-table-column prop="prop" label="分类id" align="center" width="width"></el-table-column>
      <el-table-column prop="prop" label="分类名称" align="center" width="width"></el-table-column>
      <el-table-column prop="prop" label="分类图标" align="center" width="width">
        <template>
          <img class="cate-icon" src="@/assets/images/png/weixin.png" alt="" srcset="">
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="120">
        <template>
          <el-button type='text' icon="el-icon-edit" size='mini'>编辑</el-button>
          <el-button type='text' icon="el-icon-delete" size='mini' style="color:red">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.cate-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}
</style>