<template>
  <div>
    <el-form :model="form" label-position="top">
      <el-form-item label="动态内容" prop="content">
        <mavon-editor v-model="form.content" />
      </el-form-item>

      <el-form-item label="点赞数" prop="likes" style="width: 50%">
        <el-input v-model="form.likes" type="number" placeholder="可选，默认为 0"></el-input>
      </el-form-item>

      <el-form-item label="创建时间" prop="createdAt">
        <el-date-picker v-model="form.createdAt" type="datetime" placeholder="可选，默认此刻" :editable="false">
        </el-date-picker>
      </el-form-item>

      <el-form-item style="text-align: right;">
        <el-button type="info" @click="submit(false)">仅自己可见</el-button>
        <el-button type="primary" @click="submit(true)">发布动态</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getMomentById, updateMoment, saveMoment } from '@/api/moment.js'
export default {
  name: 'WriteMoment',
  data() {
    return {
      form: {
        content: '',
        createdAt: null,
        likes: 0,
        is_published: false
      }
    }
  },
  created() {
    if (this.$route.params.id) this.getMoment(this.$route.params.id)
  },
  methods: {
    async getMoment(id) {
      try {
        const { data } = await getMomentById(id)
        if (data.success) this.form = data.result
      } catch (error) {
        console.error('WriteMoment [getMoment] Error: ', error.message)
      }
    },
    async submit(published) {
      this.form.is_published = published
      console.log('this.form: ', this.form)
      let flag = false
      if (this.$route.params.id) flag = true
      try {
        let res
        if (flag) {
          const { data } = await updateMoment(this.form)
          res = data
        } else {
          const { data } = await saveMoment(this.form)
          res = data
        }
        if(res.success) this.$msg(res.message, 'success')
        else this.$msg(res.message, 'error')
        this.$router.push(`/blog/moment/list`)
      } catch (error) {
        this.$msg('发布/更新失败', 'error')
        console.error('WriteMoment [submit] Error: ', error.message)
      }
    }
  }
}
</script>

<style scoped>
</style>
