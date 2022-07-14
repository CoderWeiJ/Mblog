<template>
  <div>
    <!--添加-->
    <el-row :gutter="10">
      <el-col :span="6">
        <el-button type="primary" size="small" icon="el-icon-plus" @click="addDialogVisible=true">添加标签</el-button>
      </el-col>
    </el-row>

    <el-table :data="tagList">
      <el-table-column label="序号" type="index" width="50"></el-table-column>
      <el-table-column label="名称" prop="tag_name"></el-table-column>
      <el-table-column label="颜色">
        <template v-slot="scope">
          <div style="display:flex;justify-content: center">
            <span style="width: 100px;">{{ scope.row.color }}</span>
            <span style="width: 100px; height: 23px" :class="`me-${scope.row.color}`"></span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row)">编辑</el-button>
          <el-popconfirm title="确定删除吗？" icon="el-icon-delete" iconColor="red" @onConfirm="deleteTagById(scope.row.id)">
            <el-button size="mini" type="danger" icon="el-icon-delete" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="queryInfo.pageNum" :page-sizes="[10, 20, 30, 50]" :page-size="queryInfo.pageSize" :total="total"
      layout="total, sizes, prev, pager, next, jumper" background>
    </el-pagination>

    <!--添加标签对话框-->
    <el-dialog title="添加标签" width="50%" :visible.sync="addDialogVisible" :close-on-click-modal="false"
      @close="addDialogClosed">
      <!--内容主体-->
      <el-form :model="addForm" :rules="formRules" ref="addFormRef" label-width="80px">
        <el-form-item label="标签名称" prop="tag_name">
          <el-input v-model="addForm.tag_name"></el-input>
        </el-form-item>
        <el-form-item label="标签颜色">
          <el-select v-model="addForm.color" placeholder="请选择颜色" :clearable="true" style="width: 100%">
            <el-option v-for="item in colors" :key="item.value" :label="item.label" :value="item.value">
              <span style="float: left; width: 100px;">{{ item.label }}</span>
              <span style="float: left; width: 100px; height: inherit" :class="`me-${item.value}`"></span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!--底部-->
      <span slot="footer">
        <el-button @click="addDialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="addTag">确 定</el-button>
      </span>
    </el-dialog>

    <!--编辑标签对话框-->
    <el-dialog title="编辑标签" width="50%" :visible.sync="editDialogVisible" :close-on-click-modal="false"
      @close="editDialogClosed">
      <!--内容主体-->
      <el-form :model="editForm" :rules="formRules" ref="editFormRef" label-width="80px">
        <el-form-item label="标签名称" prop="tag_name">
          <el-input v-model="editForm.tag_name"></el-input>
        </el-form-item>
        <el-form-item label="标签颜色" prop="color">
          <el-select v-model="editForm.color" placeholder="请选择颜色" :clearable="true" style="width: 100%">
            <el-option v-for="item in colors" :key="item.value" :label="item.label" :value="item.value">
              <span style="float: left; width: 100px;">{{ item.label }}</span>
              <span style="float: left; width: 100px; height: inherit" :class="`me-${item.value}`"></span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!--底部-->
      <span slot="footer">
        <el-button @click="editDialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="editTag">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import { getData, addTag, editTag, deleteTagById } from '@/api/tag.js'
export default {
  name: 'TagList',
  data() {
    return {
      queryInfo: {
        pageNum: 1,
        pageSize: 10
      },
      tagList: [],
      total: 0,
      addDialogVisible: false,
      editDialogVisible: false,
      addForm: {
        tag_name: '',
        color: ''
      },
      editForm: {},
      formRules: Object.freeze({ name: [{ required: true, message: '请输入标签名称', trigger: 'blur' }] }),
      colors: Object.freeze([
        { label: '红色', value: 'red' },
        { label: '橘黄', value: 'orange' },
        { label: '黄色', value: 'yellow' },
        { label: '橄榄绿', value: 'olive' },
        { label: '纯绿', value: 'green' },
        { label: '水鸭蓝', value: 'teal' },
        { label: '纯蓝', value: 'blue' },
        { label: '紫罗兰', value: 'violet' },
        { label: '紫色', value: 'purple' },
        { label: '粉色', value: 'pink' },
        { label: '棕色', value: 'brown' },
        { label: '灰色', value: 'grey' },
        { label: '黑色', value: 'black' },
      ]),
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      try {
        const { data } = await getData(this.queryInfo)
        console.log('data：：：', data)
        this.tagList = data.result.tagList
        this.total = data.result.total
        console.log('总页数：', this.total)
      } catch (error) {
        console.error('TagList [getData] Error: ', error.message)
      }
    },
    //监听 pageSize 改变事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getData()
    },
    //监听页码改变事件
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage
      this.getData()
    },
    addDialogClosed() {
      this.addForm.color = ''
      this.$refs.addFormRef.resetFields()
    },
    editDialogClosed() {
      this.editForm = {}
      this.$refs.editFormRef.resetFields()
    },
    // 添加新标签
    addTag() {
      this.$refs.addFormRef.validate(async valid => {
        if (valid) {
          try {
            const { data } = await addTag(this.addForm)
            if (data.success) {
              this.$msg(data.message, 'success')
              this.getData()
            } else this.$msg(data.message, 'error')
            this.addDialogVisible = false
          } catch (error) {
            console.error('TagList [addTag] Error: ', error.message)
          }
        }
      })
    },
    // 编辑标签
    editTag() {
      console.log('this.editForm', this.editForm)
      this.$refs.editFormRef.validate(async valid => {
        if (valid) {
          try {
            const { data } = await editTag(this.editForm)
            if (data.success) {
              this.$msg(data.message, 'success')
              this.getData()
            } else this.$msg(data.message, 'error')
            this.editDialogVisible = false
          } catch (error) {
            console.error('TagList [editTag] Error: ', error.message)
          }
        }
      })
    },
    showEditDialog(row) {
      this.editForm = Object.assign({}, row)
      this.editDialogVisible = true
    },
    async deleteTagById(id) {
      try {
        const { data } = await deleteTagById(id)
        if (data.success) {
          this.$msg(data.message, 'success')

          this.getData()
        } else {
          this.$msg(data.message, 'error')
        }
      } catch (error) {
        console.error('TagList [deleteTagById] Error: ', error.message)
      }
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
.el-button + span {
  margin-left: 10px;
}
.el-pagination {
  display: flex;
  justify-content: center;
}
</style>
