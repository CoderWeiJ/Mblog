<template>
  <Comment />
  <Pagination />
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'
// 引入组件
import Comment from './Comment.vue'
import CommentPagination from './CommentPagination.vue'
import { SET_COMMENT_QUERY_PAGE, SET_COMMENT_QUERY_BLOG_ID, SET_COMMENT_QUERY_PAGE_NUM, SET_PARENT_COMMENT_ID } from '@/store/mutations-types'

const props = ({
  page: {
    type: Number,
    required: true,
  },
  blogId: {
    type: Number,
    required: false,
  },
})

// 定义变量
const store = useStore()

// 逻辑处理
const useCommentList: Function = () => {
  const init: Function = () => {
    // 重置评论表单位置
    store.commit(SET_PARENT_COMMENT_ID, -1)
    store.commit(SET_COMMENT_QUERY_PAGE, props.page)
    store.commit(SET_COMMENT_QUERY_BLOG_ID, props.blogId)
    store.commit(SET_COMMENT_QUERY_PAGE_NUM, 1)
    
    store.dispatch('getCommentList')
  }
  return { init }
}
const { init } = useCommentList()
// 生命周期
onBeforeMount(() => {
  init()
})
</script>
