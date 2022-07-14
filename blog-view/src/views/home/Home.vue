<template>
  <BlogList />
</template>

<script lang="ts">
import { ref, nextTick, getCurrentInstance, defineComponent, provide } from 'vue'
import { useStore } from 'vuex'
import { getBlogList } from '@/api/home'
// 引入组件
import BlogList from '@/components/blog/BlogList.vue'

import { SET_IS_BLOG_TO_HOME } from '@/store/mutations-types'
const store = useStore()
// 定义响应式变量
// 博客列表
const blogList = ref([])
const totalPage = ref<number>(3) // 总页数
const getBlogListFinish = ref<boolean>(false)
// 组件逻辑处理
const useHomeEffect: Function = () => {
  const getBlogData: Function = async (pageNum: number = 1) => {
    const result: any = await getBlogList(pageNum)
    console.log('请求结果：', result)

    try {
      if (result.success) {
        blogList.value = result.result.blogList
        totalPage.value = result.result.totalPage
        // timer.value = new Date().getTime()
        nextTick(() => {
          Prism.highlightAll() // 语法高亮
        })
        getBlogListFinish.value = true
      } else {
        // 加载失败
        // $msgTip('请求失败', 'error')
      }
    } catch (error) {
      console.error('Home组件请求数据失败: ', error)
    }
  }
  return { getBlogData }
}
const { getBlogData } = useHomeEffect()
export default defineComponent({
  beforeRouteEnter(to, from, next) {
    next((vm: any) => {
      if (from.name !== 'blog') {
        // 其他页面跳转到首页时，重新请求数据
        // 设置一个flag，让首页的分页组件指向正确的页码

        vm.$store.commit(SET_IS_BLOG_TO_HOME, false)
        getBlogData()
      } else {
        // 如果文章页面是起始访问页，首页将是第一次进入，即缓存不存在，要请求数据
        if (!getBlogListFinish.value) {
          getBlogData()
        }
        // 从文章页面跳转到首页时，使用首页缓存
        vm.$store.commit(SET_IS_BLOG_TO_HOME, true)
      }
    })
  },
  setup() {
    const { proxy } = getCurrentInstance() as any
    const { $msgTip } = proxy
    // 传给子孙组件
    provide('blogList', blogList)
    provide('totalPage', totalPage)
    provide('getBlogList', getBlogList)
    return {
      getBlogListFinish,
      getBlogData,
    }
  },
})
</script>

<style lang="less" scoped></style>
