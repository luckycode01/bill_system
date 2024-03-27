<template>
  <div>
    <el-dialog :title="addOrEditForm.id?'编辑记录':'添加记录'" :visible.sync="addOrEditDialog" width="600px" :before-close="dialogBeforeClose">
      <el-form ref="addOrEditFormRef" size="small" :rules="addOrEditFormRules" :model="addOrEditForm" label-width="80px">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="账单日期" prop="rentTime">
              <el-input v-model="addOrEditForm.rentTime" placeholder="请输入账单日期" type="number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房租" prop="rent">
              <el-input v-model="addOrEditForm.rent" placeholder="请输入房租" type="number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="水表起码" prop="waterStart">
              <el-input v-model="addOrEditForm.waterStart" placeholder="请输入水表起码" type="number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="水表止码" prop="waterEnd">
              <el-input v-model="addOrEditForm.waterEnd" placeholder="请输入水表止码" type="number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="水费单价" prop="waterPrice">
              <el-input v-model="addOrEditForm.waterPrice" placeholder="请输入水费单价" type="number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电表起码" prop="electricityStart">
              <el-input v-model="addOrEditForm.electricityStart" placeholder="请输入电表起码" type="number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电表止码" prop="electricityEnd">
              <el-input v-model="addOrEditForm.electricityEnd" placeholder="请输入电表止码" type="number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电费单价" prop="electricityPrice">
              <el-input v-model="addOrEditForm.electricityPrice" placeholder="请输入电费单价" type="number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="宽带网费" prop="networkAmount">
              <el-input v-model="addOrEditForm.networkAmount" placeholder="请输入宽带网费" type="number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="优惠" prop="preferential">
              <el-input v-model="addOrEditForm.preferential" placeholder="请输入优惠" type="number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="押金" prop="rentDeposit">
              <el-input v-model="addOrEditForm.rentDeposit" placeholder="请输入押金" type="number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="其他" prop="other">
              <el-input v-model="addOrEditForm.other" placeholder="请输入押金" type="number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remake">
              <el-input v-model="addOrEditForm.remake" placeholder="请输入备注" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button size='mini' @click="dialogBeforeClose">取 消</el-button>
        <el-button type="primary" size='mini' @click="handleSubmit">确 定</el-button>
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
        rentTime: '',
        rent: '',
        waterStart: '',
        waterEnd: '',
        waterPrice: 6,
        electricityStart: '',
        electricityEnd: '',
        electricityPrice: 1,
        networkAmount: '',
        preferential: '',
        rentDeposit: '',
        remake: '',
        other: '',
      },
      addOrEditFormRules: {
        rentTime: [{ required: true, message: '请输入账单日期', trigger: 'blur' }],
        rent: [{ required: true, message: '请输入房租', trigger: 'blur' }],
        waterStart: [{ required: true, message: '请输入水表起码', trigger: 'blur' }],
        waterEnd: [{ required: true, message: '请输入水表止码', trigger: 'blur' }],
        waterPrice: [{ required: true, message: '请输入水费单价', trigger: 'blur' }],
        electricityStart: [{ required: true, message: '请输入电表起码', trigger: 'blur' }],
        electricityEnd: [{ required: true, message: '请输入电表止码', trigger: 'blur' }],
        electricityPrice: [{ required: true, message: '请输入电费单价', trigger: 'blur' }],
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
    handleSubmit() {
      this.$refs.addOrEditFormRef.validate(async (val) => {
        if (val) {

        }
      })
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