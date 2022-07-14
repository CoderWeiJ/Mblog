<template>
  <div>
    <div class="ui top segment" style="text-align: center">
      <h2 class="m-text-500">分类 {{ categoryName }} 下的文章</h2>
    </div>
    <BlogList v-if="blogList.length > 0" />
    <el-empty v-else :image-size="200"></el-empty>
  </div>
</template>

<script lang="ts" setup>
import { ref, provide, watch, computed, onBeforeMount, nextTick, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
// 引入组件
import BlogList from '@/components/blog/BlogList.vue'
// 引入API
import { getBlogListByCategoryName } from '@/api/category'

// 定义变量
const route = useRoute()
const { proxy } = getCurrentInstance() as any
const { $msgTip } = proxy

const blogList = ref([])
const totalPage = ref(0)
const categoryName = computed(() => route.params.name)
// 逻辑处理
const useCategory: Function = () => {
  const getBlogList: Function = async (pageNum: number) => {
    try {
      const res = await getBlogListByCategoryName(categoryName.value, pageNum)
      if (res.success) {
        blogList.value = res.result.blogList
        totalPage.value = res.result.totalPage
        // $msgTip(res.message, 'success')
        nextTick(() => Prism.highlightAll())
      } else $msgTip(res.message, 'error')
    } catch (err) {
      console.error('数据请求失败：', err)
      $msgTip('数据请求失败', 'error')
    }
  }
  return { getBlogList }
}

const { getBlogList } = useCategory()

// provide
provide('getBlogList', getBlogList)
provide('blogList', blogList)
provide('totalPage', totalPage)

// watch
watch(
  () => route.fullPath,
  () => {
    // 在当前组件被重用时，要重新获取博客列表
    if (route.name === 'category') getBlogList()
  },
)

// 生命周期
onBeforeMount(() => getBlogList())
</script>

<style lang="less" scoped></style>
