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
            <el-form-item label="选择月份">
              <el-select v-model="model" placeholder="">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-table :data="[{prop:10},{prop:10}]" style="width: 100%" border stripe show-summary sum-text="合计">
        <el-table-column prop="prop" label="日期" width="50" align="center"></el-table-column>
        <el-table-column prop="prop" label="星期" width="50" align="center"></el-table-column>
        <el-table-column prop="prop" label="快餐饮食" width="width" align="center"></el-table-column>
        <el-table-column prop="prop" label="生活买菜" width="width" align="center"></el-table-column>
        <el-table-column prop="prop" label="交通出行" width="width" align="center"></el-table-column>
        <el-table-column prop="prop" label="日用百货" width="width" align="center"></el-table-column>
        <el-table-column prop="prop" label="水果零食" width="width" align="center"></el-table-column>
        <el-table-column prop="prop" label="医药健康" width="width" align="center">
          <!--备注 -->
        </el-table-column>
        <el-table-column prop="prop" label="话费充值" width="width" align="center"></el-table-column>
        <el-table-column prop="prop" label="车辆保养" width="width" align="center"></el-table-column>
        <el-table-column prop="prop" label="服装服饰" width="width" align="center"></el-table-column>
        <el-table-column prop="prop" label="其他" width="width" align="center"></el-table-column>
        <el-table-column prop="prop" label="备注" width="width" align="center"></el-table-column>
        <el-table-column prop="prop" label="合计" width="width" align="center"></el-table-column>
        <el-table-column label="操作" width="150" align="center" fixed="right">
          <template slot-scope="{}">
            <HintButton :title='"编辑"' type='primary' icon="el-icon-edit" size='mini' circle></HintButton>
            <HintButton :title='"清除"' type='danger' icon="el-icon-delete" size='mini' circle></HintButton>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'payBill',
}
</script>

<style lang="less" scoped>
</style>
