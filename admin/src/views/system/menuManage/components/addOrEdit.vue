<template>
  <el-dialog :title="dataForm.id?'编辑用户':'添加用户'" :visible.sync="addOrEditUserDialog" center width="700px" :before-close="dialogBeforeClose">
    <el-form ref="addOrEditFormRef" :model="dataForm" :rules="addOrEditRules" label-width="80px">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="上级菜单" prop="pid">
            <el-input v-model="dataForm.pid" :disabled="dataForm.id ? true : false" placeholder="请选择上级菜单" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单类型" prop="type">
            <el-radio-group v-model="dataForm.type">
              <el-radio :label="1">菜单</el-radio>
              <el-radio :label="2">按钮</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="!dataForm.id" :label="dataForm.type==1?'菜单名称':'按钮名称'" prop="passwordRepead">
            <el-input v-model="dataForm.passwordRepead" type="password" show-password placeholder="请输入确认密码" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单图标" prop="icon">
            <el-popover placement="bottom-start" width="460" trigger="click" @show="$refs['iconSelect'].reset()">
              <IconSelect ref="iconSelect" :isSearch="false" @selected="selected" :active-icon="dataForm.icon" />
              <el-input slot="reference" v-model="dataForm.icon" placeholder="点击选择图标" readonly>
                <svg-icon v-if="dataForm.icon" slot="prefix" :icon-class="dataForm.icon" style="height:100%;width: 25px;" />
                <i v-else slot="prefix" class="el-icon-search el-input__icon" />
              </el-input>
            </el-popover>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="路由标识" prop="email">
            <el-input v-model="dataForm.menuPath"  placeholder="请输入路由标识" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排序" prop="email">
            <el-input v-model="dataForm.order" type="number" placeholder="请输入数字" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否显示" prop="userType">
            <el-radio-group v-model="dataForm.userType">
              <el-radio :label="1">管理用户</el-radio>
              <el-radio :label="2">普通用户</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="12">
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="dataForm.sex">
              <el-radio :label="0">男</el-radio>
              <el-radio :label="1">女</el-radio>
              <el-radio :label="2">未知</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col> -->
        <!-- <el-col :span="20">
          <el-form-item label="用户简介" prop="introduce">
            <el-input v-model="dataForm.introduce" type="textarea" :row="2" placeholder="请输入用户简介" />
          </el-form-item>
        </el-col> -->
      </el-row>
    </el-form>
    <div slot="footer">
      <el-button @click="dialogBeforeClose" size="mini" icon="el-icon-close" style="margin-right:48px">取 消</el-button>
      <el-button type="primary" @click="submitAddOrMenu" icon="el-icon-check" size="mini">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import IconSelect from "@/components/IconSelect";

export default {
  components: {
    IconSelect,
  },
  props: {
    menuList: {
      type: Array,
      default: () => { return [] }
    }
  },
  data() {
    return {
      addOrEditUserDialog: false,
      dataForm: {
        menuName: '菜单管理1111111',
        pid: 0,
        level: 0,
        type: 1,
        menuPath: '/user-list111111',
        menuSign: 'sys - user - 1111111',
        icon: 'category',
        menuParams: 111111,
        isShowMenu: 1,
        order: 0,
      },
      addOrEditRules: {
        mobile: [{ required: true, message: '', trigger: 'blur' }],
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
        this.dataForm.rids = (Array.isArray(row.rids) && row.rids.split(",").map(item => +item)) || [];
      }
      this.addOrEditUserDialog = true;
    },
    submitAddOrMenu() {
      this.$refs.addOrEditMenuFormRef.validate(val => {
        if (val) {

        }
      })
    },
    // 选择图标
    selected(name) {
      this.dataForm.icon = name;
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