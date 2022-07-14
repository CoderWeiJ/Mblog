<template>
  <div class="ui top attached segment" style="text-align: center">
    <h2 class="m-text-500">小伙伴们</h2>
  </div>
  <div class="ui attached segment">
    <div class="ui attached segment">
      <div class="ui link three doubling cards">
        <a :href="item['website']" target="_blank" rel="external nofollow noopener" class="card" :style="randomRGB()" v-for="(item, index) in friendList" :key="index" @click="addViews(item['nickname'])">
          <div class="image">
            <img :src="item['avatar']" onerror="javascript:this.src='@a/img/error.png'" />
          </div>
          <div class="content">
            <div class="header">{{ item['nickname'] }}</div>
            <div class="description">{{ item['description'] }}</div>
          </div>
        </a>
      </div>
    </div>
  </div>
  <!-- 页面描述 -->
  <div class="ui teal attached segment">
    <div class="typo content" v-viewer v-html="info.content"></div>
  </div>
  <!-- 评论 -->
  <div class="ui bottom teal attached segment threaded comments">
    <CommentList :page="2" :blogId="null" v-if="info.commentEnabled" />
    <h3 class="ui header" v-else>评论已关闭</h3>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, getCurrentInstance } from 'vue'
// 引入api
import { getData, addViewsByNickname } from '@/api/friend'

// 定义变量
const { proxy } = getCurrentInstance() as any
const { $msgTip } = proxy
const friendList = ref([])
const info = ref({ content: '', commentEnabled: 'false' })
const bgColor = ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#f1c40f', '#e67e22', '#e74c3c', '#ee5a24', '#9980fa', '#8c7ae6', '#f79f1f']

// 逻辑处理
const useFriends: Function = () => {
  // 获取友链数据
  const getFriendData: Function = async () => {
    try {
      const res = await getData()
      if (res.success) {
        friendList.value = res.result.friendList
        info.value = res.result.friendInfo
        console.log('友链数据：', info.value)
      } else $msgTip(res.message, 'error')
    } catch (error) {
      console.error('数据获取失败', error)
      $msgTip('数据获取失败', 'error')
    }
  }
  // 增加浏览次数
  const addViews: Function = (nickname: string) => addViewsByNickname(nickname)
  const randomRGB: Function = () => {
    const index = Math.floor(Math.random() * bgColor.length)
    console.log('下标：', index)

    return { backgroundColor: bgColor[index] }
  }

  return { getFriendData, addViews, randomRGB }
}
const { getFriendData, addViews, randomRGB } = useFriends()
// 生命周期
onBeforeMount(() => getFriendData())
</script>

<style lang="less" scoped>
.card {
  .image {
    width: 70px !important;
    margin: 10px auto 0px;
    img {
      border-radius: 100% !important;
      width: 70px !important;
      height: 70px !important;
    }
  }
  .content {
    * {
      color: #fff !important;
    }
    text-align: center;
    padding: 10px 14px !important;
    border-top: 0 !important;
    .header {
      font-size: 16px !important;
    }
    .description {
      font-size: 12px !important;
      margin-top: 5px !important;
      margin-bottom: 7px;
    }
  }
}
</style>
