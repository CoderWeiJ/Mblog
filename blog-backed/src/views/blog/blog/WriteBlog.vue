<template>
  <div>
    <el-form :model="form" :rules="formRules" ref="formRef" label-position="top">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="文章标题" prop="title">
            <el-input v-model="form.title" placeholder="请输入标题"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="文章首图URL" prop="first_picture">
            <el-input v-model="form.first_picture" placeholder="文章首图，用于随机文章展示"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="文章描述" prop="description">
        <mavon-editor v-model="form.description" />
      </el-form-item>

      <el-form-item label="文章正文" prop="content">
        <mavon-editor v-model="form.content" />
      </el-form-item>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="分类" prop="category">
            <el-select v-model="form.category" placeholder="请选择分类（输入可添加新分类）" :allow-create="true" :filterable="true"
              style="width:100%;">
              <el-option :label="item.category_name" :value="item.id" v-for="item in categoryList" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="标签" prop="tagList">
            <el-select v-model="form.tagList" placeholder="请选择标签（输入可添加新标签）" :allow-create="true" :filterable="true"
              :multiple="true" style="width: 100%;">
              <el-option :label="item.tag_name" :value="item.id" v-for="item in tagList" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="字数" prop="words">
            <el-input v-model="form.words" placeholder="请输入文章字数（自动计算阅读时长）" type="number"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="阅读时长（分钟）" prop="read_time">
            <el-input v-model="form.read_time" placeholder="请输入阅读时长（可选）默认 Math.round(字数 / 200)" type="number">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="浏览次数" prop="views">
            <el-input v-model="form.views" placeholder="请输入浏览次数" type="number"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item style="text-align:right;">
        <el-button type="primary" @click="dialogVisible = true">保存</el-button>
      </el-form-item>
    </el-form>

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
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item v-if="radio !== 2">
          <el-row>
            <el-col :span="6">
              <el-switch v-model="form.is_appreciation" active-text="赞赏"></el-switch>
            </el-col>
            <el-col :span="6">
              <el-switch v-model="form.is_recommend" active-text="推荐"></el-switch>
            </el-col>
            <el-col :span="6">
              <el-switch v-model="form.is_comment_enabled" active-text="评论"></el-switch>
            </el-col>
            <el-col :span="6">
              <el-switch v-model="form.is_top" active-text="置顶"></el-switch>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>

      <!-- 底部 -->
      <span slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入api
import { getCategoryAndTag, saveBlog, getBlogById, updateBlog } from '@/api/blog'
export default {
  // name: 'WriteBlog',
  data() {
    return {
      categoryList: [],
      tagList: [],
      dialogVisible: false,
      radio: 1,
      form: {
        id: Infinity,
        title: '',
        first_picture: '',
        description: '',
        content: '',
        category: null,
        tagList: [],
        words: null,
        read_time: null,
        views: 0,
        is_appreciation: false,
        is_recommend: false,
        is_comment_enabled: false,
        is_top: false,
        is_published: false,
        password: '',
      },
      formRules: Object.freeze({
        title: [{ required: true, message: '请输入标题', trigger: 'change' }],
        first_picture: [{ required: true, message: '请输入首图链接', trigger: 'change' }],
        category: [{ required: true, message: '请输入分类', trigger: 'change' }],
        tagList: [{ required: true, message: '请选择标签', trigger: 'change' }],
        words: [{ required: true, message: '请输入文章字数', trigger: 'change' }]
      })
    }
  },
  watch: {
    'form.words'(newValue) {
      this.form.read_time = newValue ? Math.round(newValue / 200) : null
    }
  },
  created() {
    this.getData()
    if (this.$route.params.id) this.getBlog(this.$route.params.id)
  },
  methods: {
    async getData() {
      try {
        const { data } = await getCategoryAndTag()
        console.log('获取标签和分类列表: ', data)
        if (data.success) {
          this.categoryList = [...data.result.categoryList]
          this.tagList = [...data.result.tagList]
        }
      } catch (error) {
        console.error('WriteBlog.vue [getData] Error: ', error.message)
      }
    },
    async getBlog(id) {
      try {
        const { data } = await getBlogById(id)
        console.log('data: ', data)
        if (data.success) {
          this.computeCategoryAndTag(data.result)
          for (let k in this.form) this.form[k] = data.result[k]
          console.log('打印表单：：：', this.form)
          this.radio = this.form.is_published ? (this.form.password ? 3 : 1) : 2
        }
      } catch (error) {
        console.error('WriteBlog.vue [getBlog] Error: ', error.message)
      }
    },
    computeCategoryAndTag(blog) {
      blog.category = Number(blog.category_id)
      blog.tagList = []
      blog.tags.forEach(item => blog.tagList.push(item.id))
    },
    submit() {
      if (this.radio === 3 && ['', null].includes(this.form.password)) return this.$msg('密码保护模式必须填写密码！', 'error')
      this.$refs.formRef.validate(async valid => {
        if (valid) {
          if (this.radio === 2) {
            this.form.is_appreciation = false
            this.form.is_recommend = false
            this.form.is_comment_enabled = false
            this.form.is_top = false
            this.form.is_published = false
          } else this.form.is_published = true
          if (this.radio !== 3) this.form.password = ''
          if (this.$route.params.id) {
            console.log('提交表单: ', this.form)
            try {
              const { data } = await updateBlog(this.form)
              if (data.success) {
                this.$msg(data.message, 'success')
                this.$router.push('/blog/list')
              }
            } catch (error) {
              console.error('WriteBlog [updateBlog] Error: ', error.message)
            }
          } else {
            try {
              const { data } = await saveBlog(this.form)
              if (data.success) {
                this.$msg(data.message, 'success')
                this.$router.push('/blog/list')
              }
            } catch (error) {
              console.error('WriteBlog [saveBlog] Error: ', error.message)
            }
          }
        } else {
          this.dialogVisible = false
          return this.$msg('请填写必要的表单项', 'error')
        }
      })
    }
  },
  mounted() { },
}
</script>

<style lang="scss" scoped></style>
