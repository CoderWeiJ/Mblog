<template>
  <div class="site">
    <Nav blogName="WeiJ's Blog" :categoryList="categoryList" v-if="categoryList.length > 0" />
    <!-- 首页大图 只在首页且pc端时展示 -->
    <div class="m-mobile-hide">
      <Header v-if="route.name === 'home'" />
    </div>

    <div class="main">
      <div class="m-padded-tb-big">
        <div class="ui container">
          <div class="ui stackable grid">
            <!-- 左侧 -->
            <div class="three wide column m-mobile-hide">
              <Introduction v-if="flag === true" :class="{ 'm-display-none': focusMode }" />
            </div>
            <!-- 中间 -->
            <div class="ten wide column">
              <keep-alive include="home">
                <router-view />
              </keep-alive>
            </div>
            <!-- 右侧 -->
            <div class="three wide column m-mobile-hide">
              <!-- 随机文章 -->
              <RandomBlog v-if="flag" :randomBlogList="randomBlogList" :class="{ 'm-display-none': focusMode }" />
              <!-- 标签组件 -->
              <Tags :tagList="tagList" :class="{ 'm-display-none': focusMode }" />
              <!-- 只在文章页面显示目录 -->
              <Tocbot v-if="route.name === 'blog'" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 私密文章密码对话框 -->
    <BlogPasswordDialog />
    <!--APlayer-->
    <div class="m-mobile-hide">
      <MyAPlayer />
    </div>

    <!-- 回到顶部 -->
    <el-backtop>
      <img src="@a/img/paper-plane.png" />
    </el-backtop>
    <!-- 底部 -->
    <Footer v-if="flag" :siteInfo="siteInfo" :badges="badges" :newBlogList="newBlogList" :hitokoto="hito" />
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, onBeforeMount, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { Lock } from '@element-plus/icons-vue'
// 引入组件
import Nav from '@/components/index/Nav.vue'
import Header from '@/components/index/Header.vue'
import Introduction from '@/components/sidebar/Introduction.vue'
import RandomBlog from '@/components/sidebar/RandomBlog.vue'
import Tags from '@/components/sidebar/Tags.vue'
import Footer from '@/components/index/Footer.vue'
import MyAPlayer from '@/components/index/MyAPlayer.vue'
import BlogPasswordDialog from '@/components/index/BlogPasswordDialog.vue'

import { SAVE_CLIENT_SIZE, SAVE_INTRODUCTION, SAVE_SITE_INFO, RESTORE_COMMENT_FORM } from '@/store/mutations-types'
import { getSite, getHiToKoTo } from '@/api/index'
const route = useRoute()
const router = useRouter()
const store = useStore()
// 定义变量
const focusMode = computed(() => store.state.focusMode)
const randomBlogList = ref<Array<any>>([])
const siteInfo = ref<Object | any>({}) // 站点信息
const categoryList = ref<Array<any>>([]) // 类别列表
const tagList = ref<Array<any>>([]) // 标签列表
const badges = ref<Array<any>>([]) // 徽章列表
const newBlogList = ref<Array<any>>([]) // 新博客的列表
const hito = ref<Object>({})
const flag = ref<Boolean>(false)
// 组件的逻辑处理
const useIndexEffect: Function = () => {
  // 获取站点信息
  const getSiteData: Function = async () => {
    let result = await getSite()
    console.log('Site站点result: ', result)
    if (result.success) {
      const data = result.result
      siteInfo.value = data.siteInfo
      badges.value = data.badges
      newBlogList.value = data.newBlogList
      categoryList.value = data.categoryList
      tagList.value = data.tagList
      randomBlogList.value = data.randomBlogList
      store.commit(SAVE_SITE_INFO, siteInfo)
      store.commit(SAVE_INTRODUCTION, data.introduction)

      document.title = route.meta.title + siteInfo.value.webTitleSuffix
      flag.value = true
      console.log('[flag]: ', flag.value)
    }
  }
  // 获取每日推荐歌曲(一言网)
  const getHit: Function = async () => {
    let { from, hitokoto } = await getHiToKoTo()
    hito.value = Object.assign({}, { from, hitokoto })
  }
  return { getSiteData, getHit }
}

const { getSiteData, getHit } = useIndexEffect()

// 生命周期
onBeforeMount(async () => {
  await getHit()
  await getSiteData()

  //从localStorage恢复之前的评论信息
  store.commit(RESTORE_COMMENT_FORM)
  // 保存可视窗口大小
  store.commit(SAVE_CLIENT_SIZE, {
    clientHeight: document.body.clientHeight,
    clientWidth: document.body.clientWidth,
  })
  window.onresize = () => {
    store.commit(SAVE_CLIENT_SIZE, {
      clientHeight: document.body.clientHeight,
      clientWidth: document.body.clientWidth,
    })
  }
})
</script>

<style lang="less" scoped>
.site {
  display: flex;
  min-height: 100vh; /* 没有元素时，也把页面撑开至100% */
  flex-direction: column;
  .main {
    margin-top: 40px;
    flex: 1;
    .ui.container {
      width: 1400px !important;
      margin-left: auto !important;
      margin-right: auto !important;
      .ui.grid .three.column {
        padding: 0;
      }
      .ten.column {
        padding-top: 0;
      }
      .m-display-none {
        display: none !important;
      }
    }
  }
}
.el-backtop {
  box-shadow: none;
  background: none;
  img {
    width: 40px;
    height: 40px;
  }
}
</style>
