<template>
  <div>
    <el-dialog title="2022-03-12详细列表" :visible.sync="detailVisible" width="700" :before-close="dialogBeforeClose">
      <el-table :data="dataList" style="width: 100%" size="mini" border stripe>
        <el-table-column prop="prop" label="流水Id" align="center" width="width"></el-table-column>
        <el-table-column prop="prop" label="分类" align="center" width="width"></el-table-column>
        <el-table-column prop="prop" label="金额" align="center" width="width"></el-table-column>
        <el-table-column prop="prop" label="添加时间" align="center" width="width"></el-table-column>
      </el-table>
      <div slot="footer">
        <el-button size="mini" @click="dialogBeforeClose">取 消</el-button>
        <el-button type="primary" size="mini" @click="dialogBeforeClose">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detailVisible: false,
      dataList:[],
    }
  },
  methods: {
    init() {
      this.detailVisible = true;
    },
    dialogBeforeClose(done) {
      done instanceof Function ? done() : this.detailVisible = false;
    }
  }
}
</script>

<style>
</style>