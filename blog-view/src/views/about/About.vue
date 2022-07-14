<template>
  <div class="ui top attached segment m-padded-lr-big">
    <h2 class="m-text-500" style="text-align: center">{{ about.title }}</h2>
    <meting-js server="netease" type="song" :id="about.musicId" theme="#25CCF7" v-if="about.musicId !== ''"></meting-js>
    <div class="typo content m-margin-top-large" v-viewer v-html="about.content"></div>
  </div>
  <!-- 评论 -->
  <div class="ui bottom teal attached segment threaded comments">
    <CommentList :page="1" :blogId="null" v-if="about.commentEnabled === 'true'" />
    <h3 class="ui header" v-else>评论已关闭</h3>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, onBeforeMount, ref } from 'vue'
// 引入组件
import CommentList from '@/components/comment/CommentList.vue'
// 引入api
import { getAbout } from '@/api/about'

// 定义变量
const { proxy } = getCurrentInstance() as any
const { $msgTip } = proxy

const about = ref({
  title: '',
  musicId: '',
  content: '',
  commentEnabled: 'false',
})

// 逻辑处理
const useAbout: Function = () => {
  const getData: Function = async () => {
    try {
      let res = await getAbout()
      if (res.success) {
        about.value =res.result
      } else $msgTip(res.message, 'error')
    } catch (err) {
      $msgTip('数据请求失败', 'error')
      console.error('数据请求失败: ', err)
    }
  }
  return { getData }
}
const { getData } = useAbout()

// 生命周期
onBeforeMount(() => {
  getData()
})
</script>

<style lang="less" scoped>
.content ul li {
  letter-spacing: 1px !important;
}
</style>
