<template>
  <div>
    <el-card>
      <el-row :gutter="10">
        <el-form ref="form" :model="form" label-width="80px">
          <el-col :span="5">
            <el-form-item label="选择年份">
              <el-select v-model="model" placeholder="">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-button type="primary" icon="el-icon-plus"> 添加</el-button>
          </el-col>
        </el-form>
      </el-row>
      <el-table :data="[{prop:10},{prop:10}]" style="width: 100%" border stripe show-summary sum-text="合计">
        <el-table-column prop="prop" label="日期" width="50" align="center"></el-table-column>
        <el-table-column prop="prop" label="工资收入" width="width" align="center"></el-table-column>
        <el-table-column prop="prop" label="社保扣除" width="width" align="center"></el-table-column>
        <el-table-column prop="prop" label="公积金扣除" width="width" align="center"></el-table-column>
        <el-table-column prop="prop" label="其他扣除" width="width" align="center"></el-table-column>
        <el-table-column prop="prop" label="备注" width="width" align="center"></el-table-column>
        <el-table-column prop="prop" label="实际收入" width="width" align="center"></el-table-column>
        <el-table-column prop="prop" label="结余" width="width" align="center"></el-table-column>
        <el-table-column label="操作" width="150" align="center" fixed="right">
          <template slot-scope="{}">
            <HintButton :title='"编辑"' type='primary' icon="el-icon-edit" size='mini' circle></HintButton>
            <HintButton :title='"删除"' type='danger' icon="el-icon-delete" size='mini' circle></HintButton>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'salary',
}
</script>

<style lang="less" scoped>
</style>
