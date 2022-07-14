<template>
  <div>
    <div class="ui top segment" style="text-align: center">
      <h2 class="m-text-500">标签 {{ tagName }} 下的文章</h2>
    </div>
    <BlogList v-if="flag" />
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref, watch, computed, getCurrentInstance, provide, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
// 引入组件
import BlogList from '@/components/blog/BlogList.vue'
// 引入api
import { getBlogListByTagName } from '@/api/tag'

// 定义变量
const route = useRoute()
const { proxy } = getCurrentInstance() as any
const { $msgTip } = proxy

const blogList = ref([])
const totalPage = ref<number>(0)
const tagName = computed(() => route.params.name)
const flag = ref<Boolean>(false)
const timer = ref(0) // 给BlogList组件的key，每次key改变，都会重新渲染BlogList
// 逻辑处理
const useTagEffect: Function = () => {
  const getBlogList: Function = async (pageNum: number) => {
    try {
      const res = await getBlogListByTagName(tagName.value, pageNum)
      console.log('Tag.vue结果：', res)

      if (res.success) {
        blogList.value = res.result.blogList
        totalPage.value = res.result.totalPage
        flag.value = true
        nextTick(() => {
          Prism.highlightAll()
        })        
      } else $msgTip(res.message, 'error')
    } catch (error) {
      console.error('blogList数据获取失败')
      $msgTip('数据获取失败', 'error')
    }
  }
  return { getBlogList }
}
const { getBlogList } = useTagEffect()

// provide
provide('getBlogList', getBlogList)
provide('totalPage', totalPage)
provide('blogList', blogList)

// watch
watch(
  () => route.fullPath,
  async () => {
    console.log('组件重用：', route.fullPath)

    if (route.name === 'tag') {
      await getBlogList()
    }
  },
)
// 生命周期
onBeforeMount(async () => {
  await getBlogList()
})
</script>
