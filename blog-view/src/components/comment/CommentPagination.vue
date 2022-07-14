<template>
  <!-- 评论分页 -->
  <el-pagination @current-change="handleCurrentChange" :current-page="commentQuery.pageNum" :total="commentTotalPage" layout="prev, pager, next" background hide-on-single-page class="pagination"></el-pagination>
</template>

<script lang="ts" setup>
import {  toRefs, computed } from 'vue'
import { useStore } from 'vuex'

import { SET_COMMENT_QUERY_PAGE_NUM, SET_PARENT_COMMENT_ID } from '@/store/mutations-types'

const store = useStore()

// 定义变量
const commentQuery = computed(() => store.state['commentQuery'])
const commentTotalPage = computed(() => store.state['commentTotalPage'])

const usePagination: Function = () => {
  // 监听页码改变的事件
  const handleCurrentChange: Function = (newPage: number) => {
    store.commit(SET_COMMENT_QUERY_PAGE_NUM, newPage)
    store.commit(SET_PARENT_COMMENT_ID, -1)
    store.dispatch('getCommentList')
  }

  return { handleCurrentChange }
}
const { handleCurrentChange } = usePagination()
</script>

<style lang="less" scoped>
.pagination {
  margin-top: 2em;
  text-align: center;
}
</style>