<template>
  <div>
    <el-dialog title="添加记录" :visible.sync="addExpendVisible" width="500px" :before-close="dialogBeforeClose">
      <el-form ref="dataFormRef" size="mini" :model="dataForm" label-width="80px">
        <el-row :gutter="10">
          <el-col :span="12" v-for="item in categoryList" :key="item.cateId">
            <el-form-item :label="item.cateName">
              <el-input v-model="dataForm[item.fieldName]" type="number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input v-model="dataForm.remake" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="footer">
        <el-button size="mini" @click="dialogBeforeClose">取 消</el-button>
        <el-button type="primary" size="mini" @click="dialogBeforeClose">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    categoryList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      addExpendVisible: false,
      dataForm: {},
    }
  },
  methods: {
    init() {
      this.addExpendVisible = true;
      this.categoryList.forEach(item => {
        this.dataForm[item.fieldName] == '';
      })
    },
    dialogBeforeClose(done) {
      done instanceof Function ? done() : this.addExpendVisible = false;
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__body {
  max-height: calc(100vh - 300px);
  overflow: hidden;
  overflow-y: auto;
}
.footer {
  width: 100%;
  text-align: center;
}
</style>