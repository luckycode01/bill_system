<template>
  <div>
    <el-dialog :title="addOrEditForm.id?'编辑记录':'添加记录'" :visible.sync="addOrEditDialog" width="600px" :before-close="dialogBeforeClose">
      <el-form ref="addOrEditFormRef" size="small" :rules="addOrEditFormRules" :model="addOrEditForm" label-width="80px">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="日期" prop="dateTime">
              <el-input v-model="addOrEditForm.dateTime" type="number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工资收入" prop="salary">
              <el-input v-model="addOrEditForm.salary" type="number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目奖金">
              <el-input v-model="addOrEditForm.project" type="number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出差补贴">
              <el-input v-model="addOrEditForm.allowance" type="number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="医保">
              <el-input v-model="addOrEditForm.insurance" type="number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="纳税退税">
              <el-input v-model="addOrEditForm.refund" type="number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input v-model="addOrEditForm.remake" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button size='mini' @click="dialogBeforeClose">取 消</el-button>
        <el-button type="primary" size='mini' @click="dialogBeforeClose">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addOrEditDialog: false,
      addOrEditForm: {
        dateTime: '',
        salary: '',
        project: '',
        allowance: '',
        insurance: '',
        refund: '',
        remake: '',
      },
      addOrEditFormRules: {
        dateTime: [{ required: true, message: '请输入', trigger: 'blur' }],
        salary: [{ required: true, message: '请输入', trigger: 'blur' }],
      }
    }
  },
  methods: {
    init(row) {
      if (row) {
        this.addOrEditForm.id = row.id;
      }
      this.addOrEditDialog = true;
    },
    dialogBeforeClose(done) {
      delete this.addOrEditForm.id;
      this.$resetFormData(this.addOrEditForm);
      done instanceof Function ? done() : this.addOrEditDialog = false;
    }
  }
}
</script>

<style>
</style>