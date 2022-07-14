<template>
  <div>
    <el-form :model="form" :rules="formRules" ref="formRef" label-position="top">
      <el-form-item label="标题" prop="title" style="width: 50%">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-form-item>

      <el-row :gutter="20" style="width: 50%">
        <el-col :span="12">
          <el-form-item label="网易云歌曲ID" prop="musicId">
            <el-input v-model="form.musicId" type="number" placeholder="请输入网易云歌曲ID（可选）"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="评论开关">
            <el-switch v-model="form.commentEnabled" active-text="评论"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="正文" prop="content">
        <mavon-editor v-model="form.content" />
      </el-form-item>

      <el-form-item style="text-align: right;">
        <el-button type="primary" icon="el-icon-check" @click="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import { getAbout, updateAbout } from '@/api/about.js'
export default {
  name: 'About',
  data() {
    return {
      form: {
        title: '',
        musicId: '',
        content: '',
        commentEnabled: ''
      },
      formRules: {
        title: [{ required: true, message: '请输入标题', trigger: 'change' }]
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    // 获取数据
    async getData() {
      try {
        const { data } = await getAbout()
        console.log('da:::', data)
        if(data.success) {
          for(let k in this.form) {
            this.form[k] = data.result[k]
          }
          this.form['commentEnabled'] = eval(this.form['commentEnabled'])
          this.$msg(data.message, 'success')
        } else this.$msg(data.message, 'error')
      } catch (error) {
        console.error('About.vue [getData] Error: ', error.message)
      }
    },
    // 提交更新
    submit() {
      this.$refs.formRef.validate(async valid => {
        if(valid) {
          // 纯数字
          const reg = /^\d{1,}$/
          if(!reg.test(this.form.musicId)) return this.$msg('歌曲ID有误', 'error')
          const {data} = await updateAbout(this.form)
          if(data.success) {
            this.$msg(data.message, 'success')
          }
          else this.$msg(data.message, 'error')
        } else this.$msg('请填写必要的表单', 'error')
      })
    },
  },
}
</script>

<style lang='scss' scoped>
</style>
