<template>
  <footer class="ui inverted vertical segment m-padded-tb-large m-opacity">
    <div class="ui center aligned container">
      <div class="ui inverted divided stackable grid">
        <div class="three wide column">
          <div class="ui link list">
            <div class="ui inverted header m-text-thin m-text-spaced">{{ siteInfo.footerImgTitle }}</div>
            <div class="item">
              <img src="@a/img/reward.png" alt="" class="ui rounded image" style="width: 100px" />
            </div>
          </div>
        </div>

        <div class="six wide column">
          <h4 class="ui inverted header m-text-thin m-text-spaced">最新博客</h4>
          <div class="ui inverted link list">
            <a href="javascript:;" @click.prevent="toBlog(item)" v-for="item in newBlogList" :key="item.id" class="item m-text-thin m-padded-tb-small">{{ item.title }}</a>
          </div>
        </div>

        <div class="seven wide column">
          <p id="hitokotoText" class="m-text-thin m-text-spaced m-opacity-mini">{{ hitokoto.hitokoto }}</p>
          <p id="hitokotoFrom" class="m-text-thin m-text-spaced m-opacity-mini" style="float: right" v-text="hitokoto.from ? `——《${hitokoto.from}》` : ''"></p>
        </div>
      </div>

      <div class="ui inverted section divider"></div>

      <p class="m-text-thin m-text-spaced m-opacity-tiny">
        <span style="margin-right: 10px" v-if="siteInfo.copyright">{{ siteInfo.copyright.title }}</span>
        <router-link to="/" style="color: #ffe500" v-if="siteInfo.copyright">{{ siteInfo.copyright.siteName }}</router-link>
        <span style="margin: 0 15px" v-if="siteInfo.copyright && siteInfo.beian">|</span>
        <img src="@a/img/beian.png" alt="" class="beian" v-if="siteInfo.beian" />
        <a rel="external nofollow noopener" target="_blank" style="color: #ffe500" href="https://beian.miit.gov.cn/">{{ siteInfo.beian }}</a>
      </p>

      <div class="github-badge" v-for="item in badges" :key="item.id">
        <a rel="external nofollow noopener" :href="item.url" target="_blank" :title="item.title">
          <span class="badge-subject">{{ item.subject }}</span>
          <span class="badge-value" :class="`bg-${item.color}`">{{ item.value }}</span>
        </a>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
// import { onMounted, ref, toRefs } from 'vue'
import { useStore } from 'vuex'

// 接收props
const props = defineProps({
  siteInfo: {
    type: Object,
    required: true,
  },
  badges: {
    type: Array,
    required: true,
  },
  newBlogList: {
    type: Array,
    required: true,
  },
  hitokoto: {
    type: Object,
    required: false,
  },
})

const store = useStore()
// 逻辑处理
const useFooter: Function = () => {
  const toBlog: Function = (blog: any) => {
    store.dispatch('goBlogPage', blog)
  }
  return { toBlog }
}
const { toBlog } = useFooter()

</script>

<style lang="less" scoped>
@import '../../assets/css/badge.css';

.github-badge a {
  color: #fff;
}
.beian {
  width: 17px;
  height: 17px;
  margin-bottom: -4px;
  margin-right: 5px;
}
</style>
