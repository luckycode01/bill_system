<template>
  <div>
    <el-card>
      <el-row :gutter="10">
        <el-form ref="form" :model="form" label-width="80px">
          <el-col :span="5">
            <el-form-item label="收入选项">
              <el-select v-model="model" placeholder="选择收入">
                <el-option label="收入1" value="value1"></el-option>
                <el-option label="收入2" value="value2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
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

      <el-table v-if="type == 1" :data="tableData" stripe style="width: 100%" border show-summary sum-text="合计">
        <el-table-column prop="id" label="日期" width="150" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" width="width" align="center"></el-table-column>
        <el-table-column prop="amount1" label="重量" width="width" align="center"></el-table-column>
        <el-table-column prop="amount2" label="价格" width="width" align="center"></el-table-column>
        <el-table-column prop="amount3" label="邮费" height="0" width="width" align="center">
          <el-table-column prop="prop" label="自费" width="width" align="center"></el-table-column>
          <el-table-column prop="prop" label="包邮" width="width" align="center"></el-table-column>
        </el-table-column>

        <el-table-column prop="prop" label="合计收入" width="width" align="center"></el-table-column>
        <el-table-column prop="prop" label="收款" width="width" align="center"></el-table-column>
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
  data() {
    return {
      type: 1,
      tableData: [{
        id: '12987122',
        name: '王小虎',
        amount1: '234',
        amount2: '3.2',
        amount3: 10
      }, {
        id: '12987123',
        name: '王小虎',
        amount1: '165',
        amount2: '4.43',
        amount3: 12
      }, {
        id: '12987124',
        name: '王小虎',
        amount1: '324',
        amount2: '1.9',
        amount3: 9
      }, {
        id: '12987125',
        name: '王小虎',
        amount1: '621',
        amount2: '2.2',
        amount3: 17
      }, {
        id: '12987126',
        name: '王小虎',
        amount1: '539',
        amount2: '4.1',
        amount3: 15
      }]
    }
  },
  methods: {

  },
}
</script>

<style lang="less" scoped>
</style>
