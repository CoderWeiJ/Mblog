<template>
  <!-- 评论输入表单 -->
  <div class="form">
    <h3>
      发表评论
      <el-button class="m-small" size="mini" type="primary" @click="store.commit(SET_PARENT_COMMENT_ID, -1)" v-show="parentCommentId !== -1">取消回复</el-button>
    </h3>
    <el-form :inline="true" :model="commentForm" :rules="formRules" ref="formRef" size="small">
      <el-input class="textarea" type="textarea" :rows="5" v-model="commentForm.content" placeholder="评论千万条，友善第一条" maxlength="250" show-word-limit :validate-event="false" />
      <div class="el-form-item el-form-item--small emoji">
        <img src="https://cdn.jsdelivr.net/gh/Naccl/blog-resource/img/paopao/1.png" @click="showEmojiBox" />
        <div class="mask" v-show="emojiShow" @click="hideEmojiBox"></div>
        <div class="emoji-box" v-show="emojiShow">
          <div class="emoji-title">
            <span>{{ activeEmojiTab === 0 ? 'tv_小电视' : activeEmojiTab === 1 ? '阿鲁' : '泡泡' }}</span>
          </div>
          <div class="emoji-wrap" v-show="activeEmojiTab === 0">
            <div class="emoji-list" v-for="(img, index) in tvMapper" :key="index" @click="insertEmoji(img.name)">
              <img :src="img.src" :title="img.name" />
            </div>
          </div>
          <div class="emoji-wrap" v-show="activeEmojiTab === 1">
            <div class="emoji-list" v-for="(img, index) in aruMapper" :key="index" @click="insertEmoji(img.name)">
              <img :src="img.src" :title="img.name" />
            </div>
          </div>
          <div class="emoji-wrap" v-show="activeEmojiTab === 2">
            <div class="emoji-list" v-for="(img, index) in paopaoMapper" :key="index" @click="insertEmoji(img.name)">
              <img :src="img.src" :title="img.name" />
            </div>
          </div>

          <div class="emoji-tabs">
            <a class="tab-link" :class="{ on: activeEmojiTab === 0 }" @click="activeEmojiTab = 0">
              <img src="https://cdn.jsdelivr.net/gh/Naccl/blog-resource/img/tv/1.png" />
            </a>
            <a class="tab-link" :class="{ on: activeEmojiTab === 1 }" @click="activeEmojiTab = 1">
              <img src="https://cdn.jsdelivr.net/gh/Naccl/blog-resource/img/aru/1.png" />
            </a>
            <a class="tab-link" :class="{ on: activeEmojiTab === 2 }" @click="activeEmojiTab = 2">
              <img src="https://cdn.jsdelivr.net/gh/Naccl/blog-resource/img/paopao/1.png" />
            </a>
          </div>
        </div>
      </div>
      <el-form-item prop="nickname">
        <el-popover ref="nicknamePopover" width="235px" :show-arrow="true" :visible="nameHandle" placement="bottom" trigger="focus" content="输入QQ号将自动拉取昵称和头像">
          <template #reference>
            <el-input virtual-ref="nicknamePopover" @focus="nameHandle = true" @blur="nameHandle = false" v-model="commentForm.nickname" placeholder="昵称（必填）" :validate-event="false" :prefix-icon="User"></el-input>
          </template>
        </el-popover>
      </el-form-item>

      <el-form-item prop="email">
        <el-popover ref="emailPopover" :show-arrow="true" :visible="emailHandle" placement="bottom" trigger="focus" content="用于接收回复邮件">
          <template #reference>
            <el-input virtual-ref="emailPopover" @focus="emailHandle = true" @blur="emailHandle = false" v-model="commentForm.email" placeholder="邮箱（必填）" :validate-event="false" :prefix-icon="Message"></el-input>
          </template>
        </el-popover>
      </el-form-item>
      <el-form-item label="订阅回复">
        <el-switch v-model="commentForm.notice"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="postForm">发表评论</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick, getCurrentInstance, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { SET_PARENT_COMMENT_ID, SET_COMMENT_QUERY_BLOG_ID } from '@/store/mutations-types'
import { checkEmail } from '@/utils/utils'
// 引入表情包文件
import tvMapper from '@/plugins/tvMapper'
import aruMapper from '@/plugins/aruMapper'
import paopaoMapper from '@/plugins/paopaoMapper'

// 引入图标
import { User, Message } from '@element-plus/icons-vue'

const route = useRoute()
const store = useStore()
const { proxy } = getCurrentInstance() as any
const { $notify } = proxy
// 定义变量
const blogId = ref(parseInt(route.params.id as string))
store.commit(SET_COMMENT_QUERY_BLOG_ID, blogId.value) 

const parentCommentId = computed(() => store.state.parentCommentId)
const commentForm = computed(() => store.state.commentForm)
const commentQuery = computed(() => store.state.commentQuery)

const formRules = ref({
  // 规则校验
  nickname: [
    { required: true, message: '请输入评论昵称' },
    { max: 15, message: '昵称不可多于15个字符' },
  ],
  email: [{ required: true, message: '请输入评论邮箱' }, { validator: checkEmail }],
})
const emojiShow = ref<boolean>(false)
const activeEmojiTab = ref<number>(0)
const tvmapper = ref(tvMapper)
const arumapper = ref(aruMapper)
const paopaomapper = ref(paopaoMapper)
// $refs
const textarea = ref<HTMLElement | null | any>(null)
const formRef = ref<HTMLElement | null | any>(null)
const emailPopover = ref<HTMLElement | null | any>(null)
const nicknamePopover = ref<HTMLElement | null | any>(null)
const nameHandle = ref<Boolean>(false)
const emailHandle = ref<Boolean>(false)

const start = ref<number>(0)
const end = ref<number>(0)
// 逻辑处理
const useCommentForm: Function = () => {
  const showEmojiBox: Function = () => {
    start.value = textarea.value.selectionStart
    end.value = textarea.selecticonEnd
    textarea.value.focus()
    textarea.value.setSelectionRange(start.value, end.value)
    emojiShow.value = !emojiShow.value
  }

  const insertEmoji: Function = (name: string) => {
    let str = commentForm.value.content
    commentForm.value.content = str.substring(0, start) + name + str.substring(end)
    start.value += name.length
    end.value = start.value
    textarea.value.focus()
    nextTick(() => {
      textarea.value.setSelectionRange(start.value, end.value)
    })
  }
  const hideEmojiBox: Function = () => {
    emojiShow.value = false
    textarea.value.focus()
    textarea.value.setSelectionRange(start.value, end.value)
  }

  const postForm: Function = () => {
    const adminToken = window.localStorage.getItem('adminToken')
    if (adminToken) {
      // 博主登录后，localStorage 中会存储 token，在后端设置属性，可以不校验昵称，邮箱
      if (commentForm.value.content === '' || commentForm.value.content.length > 250) {
        return $notify('评论失败', '评论内容有误', 'warning')
      } else {
        store.dispatch('submitCommentForm', adminToken)
      }
    }

    const blogToken = window.localStorage.getItem(`blog${commentQuery.value.blogId}`)
    formRef.value.validate((valid: any) => {
      if (!valid || commentForm.value.content === '' || commentForm.value.content.length > 250) {
        $notify('评论失败', '请正确填写评论', 'warning')
      } else {
        store.dispatch('submitCommentForm', blogToken ? blogToken : '')
      }
    })
  }

  return { showEmojiBox, insertEmoji, hideEmojiBox, postForm }
}
const { showEmojiBox, insertEmoji, hideEmojiBox, postForm } = useCommentForm()
// 生命周期
onMounted(() => {
  textarea.value = document.querySelector('.el-form textarea')
})
</script>

<style lang="less" scoped>
.form {
  background: #fff;
  position: relative;
}

.form h3 {
  margin: 5px;
  font-weight: 500 !important;
}

.form .m-small {
  margin-left: 5px;
  padding: 4px 5px;
}

.el-form .textarea {
  margin-top: 5px;
  margin-bottom: 15px;
}

.el-form textarea {
  padding: 6px 8px;
}

.el-form textarea,
.el-form input {
  color: black;
}

.el-form .el-form-item__label {
  padding-right: 3px;
}

.emoji {
  margin-right: 5px;
  position: relative;
  user-select: none;
}

.emoji > img {
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
}

.emoji > img:hover {
  transform: rotate(360deg);
  -webkit-transform: rotate(360deg);
  -moz-transform: rotate(360deg);
  -o-transform: rotate(360deg);
}

.emoji-box {
  color: #222;
  overflow: visible;
  background: #fff;
  border: 1px solid #e5e9ef;
  box-shadow: 0 11px 12px 0 rgba(106, 115, 133, 0.3);
  border-radius: 8px;
  width: 340px;
  position: absolute;
  top: 40px;
  z-index: 100;
}

.emoji-box * {
  box-sizing: content-box;
}

.emoji-box .emoji-title {
  font-size: 12px;
  line-height: 16px;
  margin: 13px 15px 0;
  color: #757575;
}

.emoji-box .emoji-wrap {
  margin: 6px 11px 0 11px;
  height: 185px;
  overflow: auto;
  word-break: break-word;
}

.emoji-box .emoji-wrap .emoji-list {
  height: 33px;
  color: #111;
  border-radius: 4px;
  transition: background 0.2s;
  display: inline-block;
  outline: 0;
  cursor: pointer;
}

.emoji-box .emoji-wrap .emoji-list:hover {
  background-color: #ddd;
}

.emoji-box .emoji-wrap .emoji-list img {
  margin: 4px;
  width: 25px;
  height: 25px;
}

.emoji-box .emoji-tabs {
  position: relative;
  height: 36px;
  overflow: hidden;
  background-color: #f4f4f4;
  border-radius: 0 0 4px 4px;
}

.emoji-box .emoji-tabs .tab-link {
  cursor: pointer;
  float: left;
  padding: 7px 18px;
  width: 22px;
  height: 22px;
}

.emoji-box .emoji-tabs .tab-link.on {
  background-color: #fff;
}

.emoji-box .emoji-tabs .tab-link img {
  width: 22px;
}

.emoji-box .emoji-tabs .tab-link:hover {
  background: #e7e7e7;
}

.mask {
  pointer-events: auto;
  position: fixed;
  z-index: 99;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
