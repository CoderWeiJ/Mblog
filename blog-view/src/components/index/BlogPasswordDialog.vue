<template>
  <!-- 私密文章密码对话框 -->
  <el-dialog title="请输入受保护文章密码" width="30%" v-model="blogPasswordDialogVisible" :lock-scroll="false" :before-close="handleCancel">
    <!-- 内容主体 -->
    <el-form :model="blogPasswordForm" :rules="formRules" label-width="80px" ref="formRef">
      <el-form-item label="密码" prop="password">
        <el-input v-model="blogPasswordForm.password" />
      </el-form-item>
    </el-form>
    <!-- 底部 #footer是插槽写法，需要写在template -->
    <template #footer>
      <span>
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, computed, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { checkBlogPassword } from '@/api/blog'
import { SET_BLOG_PASSWORD_DIALOG_VISIBLE } from '@/store/mutations-types'
import router from '@/router'

const { proxy } = getCurrentInstance() as any // 获取全局变量
const { $msgTip } = proxy // 消息提示框

const store = useStore()
// 定义响应式变量
const blogPasswordDialogVisible = computed(() => store.state.blogPasswordDialogVisible)
const blogPasswordForm = computed(() => store.state.blogPasswordForm)
const formRef = ref<HTMLElement | null | any>(null)
const formRules = reactive({ password: [{ required: true, message: '请输入密码', trigger: 'change' }] })

const useDialogEffect: Function = () => {
  const handleCancel: Function = () => {
    formRef.value.resetFields() // 表单项重置
    store.commit(SET_BLOG_PASSWORD_DIALOG_VISIBLE, false)
  }

  const handleSubmit: Function = () => {
    // 表单验证
    formRef.value.validate(async (valid: boolean) => {
      if (valid) {
        let result = await checkBlogPassword(blogPasswordForm.value)
        let data = result.data.result
        if (data.code === '0') {
          $msgTip(data.message, 'success')
          window.localStorage.setItem(`blog${blogPasswordForm.value.blogId}`, data)
          router.push(`/blog/${blogPasswordForm.value.blogId}`)
          handleCancel()
        } else {
          $msgTip(data.message, 'error')
        }
      }
    })
  }
  return { handleCancel, handleSubmit }
}
const { handleCancel, handleSubmit } = useDialogEffect()
</script>

<style lang="less" scoped></style>
