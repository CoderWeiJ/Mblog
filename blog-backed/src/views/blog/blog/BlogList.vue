<template>
  <!-- 文章管理 -->
  <div>
    <!-- 检索 -->
    <el-row>
      <el-col :span="8">
        <el-input v-model="queryInfo.title" placeholder="请输入标题" :clearable="true" style="min-width: 500px"
          @clear="search" @keyup.native.enter="search">
          <el-select v-model="queryInfo.category_id" slot="prepend" placeholder="请选择分类" :clearable="true"
            style="width: 160px" @change="search">
            <el-option v-for="item in categoryList" :key="item.id" :value="item.id" :label="item.category_name">
            </el-option>
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-select>
        </el-input>
      </el-col>
    </el-row>

    <!-- 内容 -->
    <el-table :data="blogList">
      <el-table-column label="序号" type="index" width="50"></el-table-column>
      <el-table-column label="标题" prop="title" show-overflow-tooltip></el-table-column>
      <el-table-column label="分类" prop="category_name" width="150"></el-table-column>
      <el-table-column label="置顶" width="80">
        <template v-slot="scope">
          <el-switch v-model="scope.row.is_top" @change="blogTopChanged(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="推荐" width="80">
        <template v-slot="scope">
          <el-switch v-model="scope.row.is_recommend" @change="blogRecommendChanged(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="可见性" width="100">
        <template v-slot="scope">
          <el-link icon="el-icon-edit" :underline="false" @click="editBlogVisibility(scope.row)">
            {{ scope.row.is_published ? (scope.row.password  ? '密码保护' : '公开') : '私密'}}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="170">
        <template v-slot="scope">{{ scope.row.createdAt | dateFormat }}</template>
      </el-table-column>
      <el-table-column label="最近更新" width="170">
        <template v-slot="scope">{{ scope.row.updatedAt | dateFormat }}</template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template v-slot="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="goBlogEditPage(scope.row.id)">编辑</el-button>
          <el-popconfirm title="确定删除吗？" icon="el-icon-delete" iconColor="red" @onConfirm="deleteBlogById(scope.row.id)">
            <el-button size="mini" type="danger" icon="el-icon-delete" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="queryInfo.pageNum" :page-sizes="[10, 20, 30, 50]" :page-size="queryInfo.pageSize" :total="total"
      layout="total, sizes, prev, pager, next, jumper" background>
    </el-pagination>

    <!-- 编辑可见性状态对话框 -->
    <el-dialog title="博客可见性" width="30%" :visible.sync="dialogVisible">
      <!-- 内容主体 -->
      <el-form label-width="50px" @submit.native.prevent>
        <el-form-item>
          <el-radio-group v-model="radio">
            <el-radio :label="1">公开</el-radio>
            <el-radio :label="2">私密</el-radio>
            <el-radio :label="3">密码保护</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="密码" v-if="radio === 3">
          <el-input v-model="visForm.password"></el-input>
        </el-form-item>
        <el-form-item v-if="radio !== 2">
          <el-row>
            <el-col :span="6">
              <el-switch v-model="visForm.is_appreciation" active-text="赞赏"></el-switch>
            </el-col>
            <el-col :span="6">
              <el-switch v-model="visForm.is_recommend" active-text="推荐"></el-switch>
            </el-col>
            <el-col :span="6">
              <el-switch v-model="visForm.is_comment_enabled" active-text="评论"></el-switch>
            </el-col>
            <el-col :span="6">
              <el-switch v-model="visForm.is_top" active-text="置顶"></el-switch>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <span slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveVisibility">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 常量

import {
  getDataByQuery,
  updateTop,
  updateRecommend,
  updateVisibility,
  deleteBlogById,
} from "@/api/blog"
export default {
  name: "BlogList",
  data() {
    return {
      queryInfo: {
        title: "",
        category_id: '',
        pageNum: 1,
        pageSize: 10,
      },
      blogList: [],
      categoryList: [],
      total: 0,
      dialogVisible: false,
      blogId: 0,
      radio: 1,
      visForm: {
        is_appreciation: false,
        is_recommend: false,
        is_comment_enabled: false,
        is_top: false,
        is_published: false,
        password: "",
      },
    }
  },
  beforeMount() {
    this.getData()
  },
  methods: {

    // 获取相关数据
    async getData() {
      try {
        console.log('打印查询条件', this.queryInfo)
        const { data } = await getDataByQuery(this.queryInfo)
        console.log('请求结果：', data)
        if (data.success) {
          this.blogList = data.result.blogList
          this.categoryList = data.result.categoryList
          this.total = data.result.total
        }
      } catch (error) {
        console.error('BlogList [getData] Error: ', error.message)
      }
    },
    // 搜索
    search() {
      this.queryInfo.pageNum = 1
      this.queryInfo.pageSize = 10
      this.getData()
    },
    // 切换博客置顶状态
    async blogTopChanged(row) {
      console.log('状态：', row)
      try {
        const { data } = await updateTop(row.id, row.is_top)
        if (data.success) this.$msg(data.message, "success")
      } catch (error) {
        console.error("博客置顶状态更新失败: ", error.message)
      }
    },
    // 切换博客推荐状态
    async blogRecommendChanged(row) {
      try {
        const { data } = await updateRecommend(row.id, row.is_recommend)
        if (data.success) this.$msg(data.message, "success")
      } catch (error) {
        console.error("博客推荐状态更新失败：", error.message)
      }
    },
    // 编辑博客可见性
    editBlogVisibility(row) {
      for (let key in this.visForm) {
        this.visForm[key] = row[key]
      }
      this.blogId = row.id
      this.radio = this.visForm.is_published ? (this.visForm.password ? 3 : 1) : 2
      this.dialogVisible = true
    },
    // 修改博客可见性
    async saveVisibility() {
      if (this.radio === 3 && ["", null].includes(this.visForm.password)) {
        return this.$msg("密码保护模式必须填写密码！", "error")
      }
      if (this.radio === 2) {
        this.visForm.is_appreciation = false
        this.visForm.is_recommend = false
        this.visForm.is_comment_enabled = false
        this.visForm.is_top = false
        this.visForm.is_published = false
      } else this.visForm.is_published = true
      if (this.radio === 3) this.visForm.password = ""
      try {
        const { data } = await updateVisibility(this.blogId, this.visForm)
        if (data.success) {
          this.$msg(data.message, "success")
          this.getData()
          this.dialogVisible = false
        }
      } catch (error) {
        console.error("修改博客可见性失败: ", error.message)
      }
    },
    // 监听 pageSize 改变事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getData()
    },
    // 监听页码改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage
      this.getData()
    },
    // 前往编辑博客页面
    goBlogEditPage(id) {
      this.$router.push(`/blog/edit/${id}`)
    },
    // 删除博客
    async deleteBlogById(id) {
      this.$confirm(
        '此操作将永久删除该博客<strong style="color: red">及其所有评论</strong>，是否删除?<br>建议将博客置为<strong style="color: red">私密</strong>状态！',
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          dangerouslyUseHTMLString: true, // 是否将 message 属性作为 HTML 片段处理
        }
      )
        .then(async () => {
          const { data } = await deleteBlogById(id)
          console.log('删除信息：', data)
          if (data.success) {
            this.$msg(data.message, "success")
            this.getData()
          }
        })
        .catch(() => this.$msg("已取消删除", "info"))
    },
  },

};
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
