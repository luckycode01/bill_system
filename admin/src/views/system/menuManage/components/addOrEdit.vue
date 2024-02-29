<template>
  <el-dialog :title="dataForm.id?'编辑用户':'添加用户'" :visible.sync="addOrEditUserDialog" center width="700px" :before-close="dialogBeforeClose">
    <el-form v-loading="loading" ref="addOrEditFormRef" :model="dataForm" :rules="addOrEditRules" label-width="80px">
      <el-row :gutter="24">
        <el-col :span="24">
          <el-form-item label="上级菜单" prop="parentId">
            <!-- <el-cascader v-model="dataForm.parentId" :options="menuList" :props="menuProp" placeholder="选择上级菜单" /> -->
            <Treeselect v-model="dataForm.parentId" :options="menuOptions" :normalizer="normalizer" :show-count="true" placeholder="选择上级菜单" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单类型" prop="menuType">
            <el-radio-group v-model="dataForm.menuType">
              <el-radio :label="1">菜单</el-radio>
              <el-radio :label="2">按钮</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="dataForm.menuType==1?'菜单名称':'按钮名称'" prop="menuName">
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
            <el-input v-model="dataForm.menuSign" placeholder="xxx:xxx:xxx" maxlength="100" />
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="dataForm.menuType == '1'">
          <el-form-item label="路由参数" prop="menuParams">
            <el-input v-model="dataForm.menuParams" placeholder="请输入路由参数`{'id': 1, 'name': 'ry'}`" maxlength="255" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="接口服务" prop="serviceName">
            <el-input v-model="dataForm.serviceName" placeholder="请输入接口服务名称" maxlength="255" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="接口方法" prop="actionName">
            <el-input v-model="dataForm.actionName" placeholder="请输入接口服务方法" maxlength="255" />
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="dataForm.menuType == '1'">
          <el-form-item label="显示状态" prop="isShowMenu">
            <el-radio-group v-model="dataForm.isShowMenu">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
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
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { getMenuInfoById, addOrUpdateMenu } from "@/api/user/menus"
export default {
  components: {
    IconSelect,
    Treeselect
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
        menuType: 1,
        menuPath: '',
        menuSign: '',
        icon: '',
        menuParams: '',
        isShowMenu: '1',
        order: 0,
        serviceName: '',
        actionName: '',
      },
      addOrEditRules: {
        parentId: [
          { required: true, message: "上级菜单不能为空", trigger: "blur" }
        ],
        menuName: [
          { required: true, message: "菜单名称不能为空", trigger: "blur" }
        ],
        order: [
          { required: true, message: "菜单顺序不能为空", trigger: "blur" }
        ],
        menuPath: [
          { required: true, message: "路由地址不能为空", trigger: "blur" }
        ],
        menuType: [
          { required: true, message: "菜单类型不能为空", trigger: "blur" }
        ],
        menuSign: [
          { required: true, message: "权限标识不能为空", trigger: "blur" }
        ]
      },
      roleList: [],
      loading: false,
    }
  },
  created() {

  },
  methods: {
    init(row, type) {
      if (row) {
        if (type == 'add') {
          this.dataForm.parentId = row.id;
          this.dataForm.menuType = 1;
          this.dataForm.isShowMenu = 1;
          this.dataForm.order = 0;
        } else if (type == 'edit') {
          // 编辑菜单，获取菜单详情
          this.dataForm.id = row.id;
          this.getMenuInfoById(row.id);
        }
      }
      this.menuOptions = [{ id: 0, authName: '一级菜单', children: JSON.parse(JSON.stringify(this.menuList)) }];
      this.addOrEditUserDialog = true;
    },
    async getMenuInfoById(id) {
      try {
        this.loading = true;
        const res = await getMenuInfoById({ menuId: id });
        if (res.meta.status == 200) {
          const keys = Object.keys(this.dataForm);
          keys.forEach(item => {
            this.dataForm[item] = res.data[item];
          })
          this.dataForm.parentId = +this.dataForm.parentId;
        } else {
          this.$message.error(res.meta.msg)
        }
        this.loading = false;
      } catch (err) {
      }
    },
    submitAddOrMenu() {
      console.log(this.dataForm);
      this.$refs.addOrEditFormRef.validate(async val => {
        if (val) {
          const params = JSON.parse(JSON.stringify(this.dataForm))
          const res = await addOrUpdateMenu(params);
          if (res.meta.status == 200) {
            this.$message.success(res.meta.msg);
            this.dialogBeforeClose();
            this.$emit('refresh');
          } else {
            this.$message.error(res.meta.msg)
          }
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
      this.dataForm.menuType = 1;
      this.dataForm.parentId = 0;
      this.dataForm.order = 0;
      this.dataForm.isShowMenu = '1';
      delete this.dataForm.id;
      done instanceof Function ? done() : this.addOrEditUserDialog = false;
    },
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.id,
        label: node.authName,
        children: node.children,
        isDefaultExpanded: true
      };
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
::v-deep .el-cascader--medium {
  width: 100%;
}
</style>