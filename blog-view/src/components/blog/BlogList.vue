<template>
  <div>
    <!-- 博客列表 -->
    <!-- content -->
    <BlogItem />
    <!-- 分页 -->
    <Pagination />
  </div>
</template>

<script lang="ts" setup>
import BlogItem from './BlogItem.vue'
import Pagination from './Pagination.vue'
</script>

<style lang="less" scoped></style>
