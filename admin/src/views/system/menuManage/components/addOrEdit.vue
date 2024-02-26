<template>
  <el-dialog :title="dataForm.id?'编辑用户':'添加用户'" :visible.sync="addOrEditUserDialog" center width="700px" :before-close="dialogBeforeClose">
    <el-form ref="addOrEditFormRef" :model="dataForm" :rules="addOrEditRules" label-width="80px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="上级菜单" prop="parentId">
            <el-select v-model="dataForm.parentId" :options="menuOptions" placeholder="选择上级菜单" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="菜单类型" prop="menuType">
            <el-radio-group v-model="dataForm.menuType">
              <el-radio :label="1">菜单</el-radio>
              <el-radio :label="2">按钮</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="!dataForm.id" :label="dataForm.menuType==1?'菜单名称':'按钮名称'" prop="menuName">
            <el-input v-model="dataForm.menuName" placeholder="请输入菜单/钮名称" />
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
          <el-form-item label="显示排序" prop="order">
            <el-input v-model="dataForm.order" type="number" :min="0" placeholder="请输入数字" />
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="dataForm.menuType == '1'">
          <el-form-item label="路由地址" prop="menuPath">
            <el-input v-model="dataForm.menuPath" placeholder="请输入路由地址" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="权限标识" prop="menuSign">
            <el-input v-model="dataForm.menuSign" placeholder="请输入权限标识" maxlength="100" />
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="dataForm.menuType == '1'">
          <el-form-item label="路由参数" prop="menuParams">
            <el-input v-model="dataForm.menuParams" placeholder="请输入路由参数`{'id': 1, 'name': 'ry'}`" maxlength="255" />
          </el-form-item>
        </el-col>
        <el-col :span="12"  v-if="dataForm.menuType == '1'">
          <el-form-item label="显示状态" prop="isShowMenu">
            <el-radio-group v-model="dataForm.isShowMenu">
              <el-radio label="1">是</el-radio>
              <el-radio label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
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
      menuOptions: [],
      dataForm: {
        menuName: '',
        parentId: 0,
        level: 0,
        menuType: 1,
        menuPath: '',
        menuSign: '',
        icon: '',
        menuParams: '',
        isShowMenu: '',
        order: '',
      },
      addOrEditRules: {
        menuName: [
          { required: true, message: "菜单名称不能为空", trigger: "blur" }
        ],
        orderNum: [
          { required: true, message: "菜单顺序不能为空", trigger: "blur" }
        ],
        path: [
          { required: true, message: "路由地址不能为空", trigger: "blur" }
        ]
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