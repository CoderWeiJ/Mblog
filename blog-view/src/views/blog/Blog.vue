<template>
  <div class="ui padded attached segment m-padded-tb-large">
    <div class="ui large red right cormer label" v-if="blog.top">
      <i class="arrow alternate circle up icon"></i>
    </div>
    <div class="ui middle aligned mobile reversed stackable">
      <div class="ui grid m-margin-lr">
        <!-- 标题 -->
        <div class="row m-padded-tb-small">
          <h2 class="ui header m-center">{{ blog.title }}</h2>
        </div>
        <!-- 文章简要信息 -->
        <div class="row m-padded-tb-small">
          <div class="ui horizontal link list m-center">
            <div class="item m-datetime">
              <i class="small calendar icon"></i><span>{{ $filters.dateFormat(blog.createAt) }}</span>
            </div>
            <div class="item m-views">
              <i class="small eye icon"></i><span>{{ blog.views }}</span>
            </div>
            <div class="item m-common-black">
              <div class="small pencil alternate icon"></div>
              <span>字数≈{{ blog.words }}</span>
            </div>
            <div class="item m-common-black">
              <i class="small clock icon"></i><span>阅读时长≈{{ blog.read_time }}分</span>
            </div>
            <a class="item m-common-black" @click.prevent="bigFontSize = !bigFontSize">
              <div data-inverted="" data-tooltip="点击切换字体大小" data-position="top center">
                <i class="font icon"></i>
              </div>
            </a>
            <a class="item m-common-black" @click.prevent="changeFocusMode">
              <div data-inverted="" data-tooltip="专注模式" data-position="top center">
                <i class="book icon"></i>
              </div>
            </a>
          </div>
        </div>
        <!-- 分类 -->
        <router-link :to="`/category/${blog.category_name}`" class="ui orange large ribbon label" v-if="blog.category_name">
          <i class="small folder open icon"></i><span class="m-text-500">{{ blog.category_name }}</span>
        </router-link>
        <!-- 文章Markdown正文 -->
        <div class="typo js-toc-content m-padded-tb-small match-braces rainbow-braces" v-viewer :class="{ 'm-big-fontsize': bigFontSize }" v-html="blog.content"></div>
        <!-- 赞赏 -->
        <div style="margin: 2em auto">
          <el-popover placement="top" width="220px" trigger="click" visible="true">
            <div class="ui orange basic label" style="width: 100%">
              <div class="image">
                <div style="font-size: 12px; text-align: center; margin-bottom: 5px">一毛是奖励</div>
                <img :src="`https://naccl.top/img/reward.jpg`" alt="" class="ui rounded bordered image" style="width: 100%" />
                <div style="font-size: 12px; text-align: center; margin-top: 5px">一块是真爱</div>
              </div>
            </div>
            <!-- #reference包裹触发popover的标签 -->
            <template #reference>
              <el-button class="ui orange inverted circular button m-text-500"> 赞赏 </el-button>
            </template>
          </el-popover>
        </div>
        <!-- 横线 -->
        <el-divider></el-divider>
        <!-- 标签 -->
        <div class="row m-padded-tb-no">
          <div class="column m-padding-left-no">
            <router-link :to="`/tag/${tag.tag_name}`" class="ui tag label m-text-500 m-margin-small" :class="tag.color" v-for="(tag, index) in blog.tags" :key="index">{{ tag.tag_name }}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 博客信息 -->
  <div class="ui attached positive message">
    <ul class="list">
      <li>
        作者：{{ store.state.introduction.name }}
        <router-link to="/about">（联系作者）</router-link>
      </li>
      <li>发表时间：{{ $filters.dateFormat(blog.createdAt, 'YYYY-MM-DD HH:mm') }}</li>
      <li>最后修改：{{ $filters.dateFormat(blog.updatedAt, 'YYYY-MM-DD HH:mm') }}</li>
      <li>本站点采用<a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">著名 4.0 国际 (CC BY 4.0) </a>创作共享协议。可自由转载、引用，并且允许商业性使用。但需署名作者且注明文章出处。</li>
      <li></li>
    </ul>
  </div>
  <!-- 评论 -->
  <div class="ui bottom teal attached segment threaded comments">
    <CommentList :page="0" :blogId="blogId" v-if="blog.is_comment_enabled" />
    <h3 class="ui header" v-else>评论已关闭</h3>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, getCurrentInstance, nextTick, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { SET_FOCUS_MODE, SET_IS_BLOG_RENDER_COMPLETE } from '@/store/mutations-types'
// 引入组件
import CommentList from '@/components/comment/CommentList.vue'

import { getBlogById } from '@/api/blog'

// 定义变量
const route = useRoute()
const store = useStore()
const { proxy } = getCurrentInstance() as any
const { $filters, $msgTip } = proxy
const blogId = computed(() => route.params.id)

const blog = ref<any>({})
const bigFontSize = ref<boolean>(false)
// const { siteInfo, focusMode } = toRefs(store.state)
const siteInfo = computed(() => store.state.siteInfo)
const focusMode = computed(() => store.state.focusMode)
// 逻辑处理
const useBlog: Function = () => {
  const getBlog: Function = async (id = blogId.value) => {
    // 密码保护的文章，需要发送密码验证通过后，保存在localStorage的Token
    const blogToken = window.localStorage.getItem(`blog${id}`)
    // 如果有则发送博主身份Token
    const adminToken = window.localStorage.getItem('adminToken')
    const token = adminToken ? adminToken : blogToken ? blogToken : ''
    try {
      const res = await getBlogById(token, id)
      console.log('博客详情：', res)
      if (res.success) {
        blog.value = res.result
        document.title = blog.value.title + siteInfo.value.webTitleSuffix
        // v-html 渲染完毕后，渲染代码块样式
        nextTick(() => {
          Prism.highlightAll()
          // 将文章渲染完成状态置为true
          store.commit(SET_IS_BLOG_RENDER_COMPLETE, true)
        })
      } else $msgTip(res.message, 'error')
    } catch (err) {
      $msgTip('数据获取失败', 'error')
    }
  }
  const changeFocusMode: Function = () => {
    store.commit(SET_FOCUS_MODE, !focusMode.value)
  }
  return { getBlog, changeFocusMode }
}
const { getBlog, changeFocusMode } = useBlog()
// 路由
onBeforeRouteLeave((to, from, next) => {
  store.commit(SET_FOCUS_MODE, false)
  /**
   * 从文章页面路由到其它页面时，销毁当前组件的同时，要销毁tocbot实例；
   * 否则，tocbot一直在监听页面滚动事件，而文章页面的锚点已经不存在了，
   * 会报 "Uncaugh TypeError: Cannot read property 'className' of null"
   */
  tocbot.destroy()
  next()
})
onBeforeRouteUpdate((to, from, next) => {
  /**
   * 一般会有2种情况触发这个钩子
   *    1. 当前文章页面跳转到其它文章页面
   *    2. 点击目录跳转锚点时，路由hash值会改变，导致当前页面会重新加载，这种情况是不希望出现的
   * 在路由 onBeforeRouteUpdate 中判断路径是否改变
   * 如果跳转到其它页面，to.path !== from.path 就方行 next()
   * 如果是跳转锚点，path骨灰改变，hash会改变，to.path === from.path, to.hash !== from.path
   * 不放行路由跳转，就能让锚点正常跳转
   */
  if (to.path !== from.path) {
    store.commit(SET_FOCUS_MODE, false)
    // 在当前组件内部路由到其它博客文章时，要重新获取文章
    getBlog(to.params.id)
    // 只要路由路径有改变，且停留在当前Blog组件内，就把文章的渲染完成状态置为 false
    store.commit(SET_IS_BLOG_RENDER_COMPLETE, false)
    next()
  }
})

// 生命周期
onBeforeMount(() => {
  getBlog()
})
</script>

<style lang="less" scoped>
.el-divider {
  margin: 1rem 0;
}
h1::before,
h2::before,
h3::before,
h4::before,
h5::before,
h6::before {
  display: block;
  content: '';
  height: 55px;
  margin-top: -55px;
  visibility: hidden;
}
</style>
