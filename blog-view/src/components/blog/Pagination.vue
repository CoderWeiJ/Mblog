<template>
  <div class="ui bottom">
    <el-pagination @current-change="handleCurrentChange" :page-size="5" :current-page="pageNum" :total="total" layout="prev,pager,next" background hide-on-single-page></el-pagination>
  </div>
</template>

<script lang="ts" setup>
import { inject, nextTick, onActivated, getCurrentInstance, toRefs, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const route = useRoute()
const { proxy } = getCurrentInstance() as any
const { scrollTop } = proxy
// 接收祖先组件传过来的
const getBlogList = inject('getBlogList')
const total = inject('totalPage')

const isBlogToHome = computed(() => store.state.isBlogToHome)
const clientSize = computed(() => store.state.clientSize)
let pageNum = ref<number>(1)

const usePagination: Function = () => {
  // 监听页码改变的事件
  const handleCurrentChange: Function = (newPage: number) => {
    // 如果是首页，则滚动至Header下方
    if (route.name === 'home') window.scrollTo({ top: clientSize.value.clientHeight, behavior: 'smooth' })
    else scrollTop() // 其它页面(分类和标签页)滚动至顶部
    pageNum.value = newPage
    getBlogList(newPage)
  }
  return { handleCurrentChange }
}
const { handleCurrentChange } = usePagination()
// 目前只有首页被缓存，所以这个钩子只会被首页调用
onActivated(() => {
  nextTick(() => {
    if (!isBlogToHome) {
      // 从其他页面路由回到首页时，让首页的分页组件页码重置到第一页
      pageNum.value = 1
    }
  })
})
</script>

<style scoped>
.ui.bottom {
  display: flex;
  justify-content: center;
  
}
.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  background-color: #ffffff !important;
}

.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #409eff !important;
}
</style>
