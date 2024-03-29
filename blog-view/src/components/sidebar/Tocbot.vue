<template>
  <!--文章目录-->
  <div class="ui segments m-toc toc-wrapper m-box">
    <div class="ui secondary segment"><i class="list ul icon"></i>本文目录</div>
    <div class="ui yellow segment">
      <div class="js-toc"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, watch, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const isBlogRenderComplete = computed(() => store.state.isBlogRenderComplete)

const useTocbotEffect: Function = () => {
  const initTocbot: Function = () => {
    tocbot.init({
      // Where to render the table of contents.
      tocSelector: '.js-toc',
      // Where to grab the headings to build the table of contents.
      contentSelector: '.js-toc-content',
      // Which headings to grab inside of the contentSelector element.
      headingSelector: 'h1,h2,h3,h4, h5, h6',
      // Element to add the positionFixedClass to.
      positionFixedSelector: '.m-toc',
      // Smooth scrolling enabled.
      scrollSmooth: true,
      // Smooth scroll duration.
      scrollSmoothDuration: 420,
      //到顶部导航条的距离
      scrollSmoothOffset: -55,
      // Headings offset between the headings and the top of the document (this is meant for minor adjustments).
      // Can also be used to account for scroll height discrepancies from the use of css scroll-padding-top
      headingsOffset: -18,
    })
  }
  return { initTocbot }
}
const { initTocbot } = useTocbotEffect()

// 监视属性
watch(
  // 文章渲染完成时，生成目录
  [isBlogRenderComplete],
  () => {
    // console.log('watch属性：', isBlogRenderComplete.value)

    if (isBlogRenderComplete.value) initTocbot()
  },
  { immediate: true },
)
onMounted(() => {
  /** 有可能组件创建比较慢，文章渲染已经完成，watch的时候，isBlogRenderComplete已经是true，
   * 监听不到 isBlogRenderComplete 的改变，也就不会执行watch中的方法就需要在 mounted 中init
   */
  if (window.document.querySelector('.js-toc-content')) initTocbot()
})
</script>

<style>
.m-toc {
  z-index: 10 !important;
}

.toc {
  overflow-y: auto;
}

.toc > ul {
  overflow: hidden;
  position: relative;
}

.toc > ul li {
  list-style: none;
}

.toc-list {
  list-style-type: none;
  margin: 0;
  padding-left: 10px;
}

.toc-list li a {
  display: block;
  padding: 4px 0;
  font-weight: 300;
}

.toc-list li a:hover {
  color: #fbbd08;
}

a.toc-link {
  color: currentColor;
  height: 100%;
}

.is-collapsible {
  max-height: 1000px;
  overflow: hidden;
  transition: all 300ms ease-in-out;
}

.is-collapsed {
  max-height: 0;
}

.is-position-fixed {
  position: sticky !important;
  top: 60px;
}

.is-active-link {
  font-weight: 700;
  color: #fbbd08 !important;
}

.toc-link::before {
  background-color: #eee;
  content: ' ';
  display: inline-block;
  height: 0;
  left: 0;
  margin-top: -1px;
  position: absolute;
  width: 2px;
}

.is-active-link::before {
  background-color: #54bc4b;
}
</style>
