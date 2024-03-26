<template>
  <div class="container">
    <el-row :gutter="10" class="mg-b12">
      <el-col :span="6">
        <el-input placeholder="请输入分类名" v-model="catename" size="small" @keyup.native.enter="handleSearchData" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="handleSearchData"></el-button>
        </el-input>
      </el-col>
      <el-col :span="18" style="text-align:right">
        <el-button type="primary" size="small" icon="el-icon-plus" @click="($event)=>openAddOrEditCate()">添加分类</el-button>
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="categoryList" style="width: 100%" border :height="tableHeight">
      <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
      <el-table-column prop="cateId" label="分类id" align="center" width="80"></el-table-column>
      <el-table-column prop="cateName" label="分类名称" align="center" width="width"></el-table-column>
      <el-table-column prop="fieldName" label="字段名" align="center" width="width"></el-table-column>
      <el-table-column label="分类图标" align="center" width="80">
        <template slot-scope="{row}">
          <svg-icon v-if="row.imgUrl" :icon-class="row.imgUrl" :iconWidth="'30px'" :iconHeight="'30px'" class-name="icon" />
        </template>
      </el-table-column>
      <el-table-column prop="order" label="排序" align="center" width="80"></el-table-column>
      <el-table-column prop="width" label="显示宽度" align="center" width="80"></el-table-column>
      <el-table-column prop="desc" label="分类描述" align="center" width="width"></el-table-column>
      <el-table-column label="创建时间" align="center" width="180">
        <template slot-scope="{row}">
          <span>{{ row.createdTime | handleTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center" width="180">
        <template slot-scope="{row}">
          <span>{{ row.updateTime | handleTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="120">
        <template slot-scope="{row}">
          <el-button type='text' icon="el-icon-edit" size='mini' @click="($event)=>openAddOrEditCate(row)">编辑</el-button>
          <el-button type='text' icon="el-icon-delete" size='mini' style="color:red" @click="($event)=>handleDeleteCate(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="pageInfo.total" :page.sync="pageInfo.pageNum" :limit.sync="pageInfo.pageSize" @pagination="getDataList" />

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="500px" :before-close="dialogBeforeClose">
      <el-row :gutter="10">
        <el-form ref="dataFormRef" :rules="dataFormRules" :model="dataForm" label-width="80px">
          <el-col :span="24">
            <el-form-item label="分类名称" prop="cateName">
              <el-input v-model="dataForm.cateName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="分类排序" prop="order">
              <el-input type="number" v-model="dataForm.order"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示宽度" prop="showWidth">
              <el-input type="number" v-model="dataForm.showWidth"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="字段名称" prop="fieldName">
              <el-input v-model="dataForm.fieldName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="分类图标" prop="imgUrl">
              <el-popover placement="bottom-start" width="460" trigger="click" @show="$refs['iconSelect'].reset()">
                <IconSelect ref="iconSelect" :isSearch="false" @selected="selected" :active-icon="dataForm.imgUrl" />
                <el-input slot="reference" v-model="dataForm.imgUrl" placeholder="点击选择图标" readonly>
                  <svg-icon v-if="dataForm.imgUrl" slot="prefix" :icon-class="dataForm.imgUrl" style="height:100%;width: 25px;" />
                  <i v-else slot="prefix" class="el-icon-search el-input__icon" />
                </el-input>
              </el-popover>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="分类描述" prop="cateDesc">
              <el-input type="textarea" rows="2" v-model="dataForm.cateDesc"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer">
        <el-button @click="dialogBeforeClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from "dayjs";
import IconSelect from "@/components/IconSelect";
import { getCategoryList, addorEditCategory, deleteCategory } from "@/api/bill/category"
import tableHeight from '@/mixin/tableHeight';
export default {
  components: {
    IconSelect,
  },
  mixins: [tableHeight],
  data() {
    return {
      defaultHeight: 90,
      loading: false,
      catename: '',
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      categoryList: [],
      dialogTitle: "添加分类",
      dialogVisible: false,
      dataForm: {
        cateName: '',
        imgUrl: '',
        order: 1,
        showWidth: 0,
        cateDesc: '',
        fieldName:''
      },
      dataFormRules: {
        cateName: [{ required: true, message: '请输入分类名', trigger: 'blur' }],
        order: [{ required: true, message: '请输入排序', trigger: 'blur' }],
        showWidth: [],
        cateDesc: [],
        imgUrl: [],
        fieldName: [],
      }
    }
  },
  filters: {
    handleTime(val) {
      return val ? dayjs(val).format('YYYY-MM-DD HH:mm:ss') : ''
    }
  },
  created() {
    this.getDataList();
  },
  methods: {
    handleDeleteCate(row) {
      if (!row) return this.$message.error('请选择分类');
      this.$confirm(`是否删除分类< ${row.cateName} >?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await deleteCategory({ cateId: row.cateId })
        if (res.meta.status == 200) {
          this.$message.success(res.meta.msg);
          if (this.categoryList.length == 1 && this.pageInfo.pageNum > 1) {
            this.pageInfo.pageNum--;
          }
          this.getDataList();
        } else {
          this.$message.error(res.meta.msg);
        }
      }).catch(() => { });
    },
    handleSubmit() {
      this.$refs.dataFormRef.validate(async val => {
        if (val) {
          try {
            const params = JSON.parse(JSON.stringify(this.dataForm))
            const res = await addorEditCategory(params);
            if (res.meta.status == 200) {
              this.$message.success(res.meta.msg);
              this.pageInfo.pageNum = 1;
              this.getDataList();
              this.dialogBeforeClose();
            } else {
              this.$message.error(res.meta.msg)
            }
          } catch (error) {
            this.$message.error(error)
          }
        }
      })
    },
    handleSearchData() {
      this.pageInfo.pageNum = 1;
      this.getDataList();
    },
    async getDataList() {
      try {
        this.loading = true;
        const params = {
          pageSize: this.pageInfo.pageSize,
          pageNum: this.pageInfo.pageNum,
          catename: this.catename
        };
        const res = await getCategoryList(params);
        if (res.meta.status == 200) {
          this.categoryList = (res.data && res.data.data) || [];
          this.pageInfo.total = res.data.pageInfo.total;
        } else {
          this.$message.error(res.meta.msg);
          this.categoryList = [];
        }
        this.loading = false;
      } catch (err) {
        this.$message.error(err);
        this.loading = false;
      }

    },
    openAddOrEditCate(row) {
      if (row) {
        this.dataForm.cateId = row.cateId;
        this.dataForm.cateName = row.cateName;
        this.dataForm.imgUrl = row.imgUrl;
        this.dataForm.order = row.order;
        this.dataForm.showWidth = row.width;
        this.dataForm.cateDesc = row.desc;
        this.dataForm.fieldName = row.fieldName;
        this.dialogTitle = "编辑分类"
      }
      this.dialogVisible = true;
    },
    dialogBeforeClose(done) {
      this.$refs.dataFormRef.resetFields();
      delete this.dataForm.cateId
      const keys = Object.keys(this.dataForm);
      keys.forEach(item => {
        this.dataForm[item] = '';
      })
      this.dataForm.order = 1;
      this.dataForm.showWidth = 0;

      done instanceof Function ? done() : this.dialogVisible = false;
    },
    // 选择图标
    selected(name) {
      this.dataForm.imgUrl = name;
    },
  }

}
</script>

<style lang="scss" scoped>
.cate-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}
</style>