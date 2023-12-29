<template>
  <el-dialog :title="dataForm.id?'编辑用户':'添加用户'" :visible.sync="addOrEditUserDialog" center width="700px" :before-close="dialogBeforeClose">
    <el-form ref="addOrEditFormRef" :model="dataForm" :rules="addOrEditRules" label-width="80px">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="dataForm.username" :disabled="dataForm.id ? true : false" placeholder="请输入用户名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="dataForm.mobile" placeholder="请输入手机号" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="!dataForm.id" label="密码" prop="password">
            <el-input v-model="dataForm.password" type="password" show-password  placeholder="请输入密码" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="!dataForm.id" label="确认密码" prop="passwordRepead">
            <el-input v-model="dataForm.passwordRepead" type="password" show-password placeholder="请输入确认密码" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱地址" prop="email">
            <el-input v-model="dataForm.email" placeholder="请输入邮箱地址" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="角色" prop="rids">
            <el-select v-model="dataForm.rids" multiple collapse-tags filterable remote :remote-method="getRoleList" placeholder="请选择角色">
              <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户类型" prop="userType">
            <el-radio-group v-model="dataForm.userType">
              <el-radio :label="1">管理用户</el-radio>
              <el-radio :label="2">普通用户</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="dataForm.sex">
              <el-radio :label="0">男</el-radio>
              <el-radio :label="1">女</el-radio>
              <el-radio :label="2">未知</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="用户简介" prop="introduce">
            <el-input v-model="dataForm.introduce" type="textarea" :row="2" placeholder="请输入用户简介" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer">
      <el-button @click="dialogBeforeClose" size="mini" icon="el-icon-close" style="margin-right:48px">取 消</el-button>
      <el-button type="primary" @click="submit" icon="el-icon-check" size="mini">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getRoleListReq, addOrUpdateUser } from "@/api/user/list"

export default {
  data() {
    const checkUserName = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入用户名"));
      }
      if (value.length > 15 || value.length < 3) {
        callback(new Error("用户名长度不超过3-15个字符"));
      } else {
        callback();
      }
    };
    const checkPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入用户密码"));
      }
      if (value.length > 15 || value.length < 6) {
        callback(new Error("密码长度应该在6到15个字之间"));
      } else {
        callback();
      }
    };
    const checkRePassword = (rule, value, callback) => {
      if (!this.dataForm.id && !/\S/.test(value)) {
        callback(new Error("确认密码不能为空"));
      } else if (this.dataForm.password !== value) {
        callback(new Error("确认密码与密码输入不一致"));
      } else {
        callback();
      }
    };
    const checkEmail = (rule, value, callback) => {
      const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (value && !reg.test(value)) {
        callback(new Error("邮箱地址格式有误，请重新输入"));
      } else {
        callback();
      }
    };
    const checkMobile = (rule, value, callback) => {
      const reg = /^1[34578]\d{9}/;
      if (!value)
        callback(new Error("请输入手机号"));
      if (!reg.test(value)) {
        callback(new Error("手机号格式有误，请重新输入"));
      } else {
        callback();
      }
    };
    return {
      addOrEditUserDialog: false,
      dataForm: {
        userType: '',
        username: '',
        password: '',
        passwordRepead: '',
        email: '',
        mobile: '',
        rids: [],
        sex: '',
        introduce: '',
      },
      addOrEditRules: {
        userType: [{ required: true, message: "请选择用户类型", trigger: 'blur' }],
        username: [{ required: true, validator: checkUserName, trigger: 'blur' }],
        password: [{ required: true, validator: checkPassword, trigger: 'blur' }],
        passwordRepead: [{ required: true, validator: checkRePassword, trigger: 'blur' }],
        email: [{ required: false, validator: checkEmail, trigger: 'blur' }],
        mobile: [{ required: true, validator: checkMobile, trigger: 'blur' }],
      },
      roleList: [],
    }
  },
  methods: {
    init(row) {
      if (row) {
        this.dataForm.id = row.id;
        const keys = Object.keys(this.dataForm);
        keys.forEach(item => {
          if (item !== 'password' && item !== 'passwordRepead') {
            this.dataForm[item] = row[item] ? row[item] : '';
          }
        })
        this.dataForm.rids = row.rids.split(",").map(item => +item);
      }
      this.getRoleList();
      this.addOrEditUserDialog = true;
    },
    submit() {
      this.$refs.addOrEditFormRef.validate(async value => {
        if (value) {
          const params = { ...this.dataForm };
          params.rids = params.rids.join(",");
          const res = await addOrUpdateUser(params);
          if (res && res.meta.status == 200) {
            this.$message.success(res.meta.msg);
            this.dialogBeforeClose();
            this.$emit('getDataList');
          } else {
            this.$message.error(res.meta.msg);
          }
        } else {
          this.$message.error("请先完善信息再提交")
        }
      })
    },

    async getRoleList() {
      const res = await getRoleListReq();
      if (res.meta.status == 200) {
        this.roleList = res.data || [];
      } else {
        this.message.error(res.meta.msg);
      }
    },
    dialogBeforeClose(done) {
      this.$refs.addOrEditFormRef.resetFields();
      const keys = Object.keys(this.dataForm);
      keys.forEach(item => {
        this.dataForm[item] = '';
      })
      this.dataForm.rids = [];
      done instanceof Function ? done() : this.addOrEditUserDialog = false;
    },
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__body {
  padding: 24px 48px;
}
::v-deep .el-dialog__footer {
  padding: 0 32px 32px;
}
</style>