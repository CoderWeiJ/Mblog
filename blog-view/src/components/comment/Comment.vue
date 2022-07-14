<template>
  <!-- 评论列表 -->
  <!-- 组件 -->
  <CommentForm v-if="parentCommentId === -1" />
  <h3 class="ui dividing header">
    Comments | 共 {{ allComment }} 条评论<span v-if="closeComment !== 0">（{{ closeComment }} 条评论被隐藏）</span>
  </h3>
  <h3 class="ui header" v-if="allComment === 0">快来抢沙发！</h3>
  <div class="comment" v-for="comment in comments" :key="comment.id">
    <span class="anchor" :id="`comment-${comment.id}`"></span>
    <!-- 头像 -->
    <a class="ui circular image avatar">
      <img :src="comment.avatar" alt="" />
    </a>
    <!-- 评论 -->
    <div class="content">
      <!-- 昵称 -->
      <a class="nickname" :href="!['', null].includes(comment.website) ? comment.website : null" target="_blank" rel="external nofollow noopener">{{ comment.nickname }}</a>
      <div class="ui black left pointing label" v-if="comment.adminComment">{{ store.state.siteInfo.commentAdminFlag }}</div>
      <!-- 发表时间 -->
      <div class="metadata">
        <strong class="date">{{ $filters.dateFormat(comment.createdAt) }}</strong>
      </div>
      <!-- 回复按钮 -->
      <el-button size="mini" type="primary" @click="setReply(comment.id)">回复</el-button>
      <div class="text" v-html="comment.content"></div>
    </div>
    <!-- 子评论 -->
    <div class="comments" v-if="comment.replyComments.length > 0">
      <div class="comment" v-for="reply in comment.replyComments" :key="reply.id">
        <span class="anchor" :id="`comment-${reply.id}`"></span>
        <a class="ui circular image avatar">
          <img :src="reply.avatar" />
        </a>
        <!--  -->
        <div class="content">
          <a class="nickname" :href="!['', null].includes(reply.website) ? reply.website : null" target="_blank" rel="external nofollow noopener">{{ reply.nickname }}</a>
          <div class="ui black left pointing label" v-if="reply.adminComment">{{ store.state.siteInfo.commentAdminFlag }}</div>
          <div class="metadata">
            <strong class="date">{{ $filters.dateFormat(reply.createdAt) }}</strong>
          </div>
          <div class="text">
            <a :href="`#comment-${reply.parentCommentId}`">@{{ reply.parentCommentNickname }}</a>
          </div>
          <div class="actions">
            <el-button size="mini" type="primary" @click="setReply(reply.id)">回复</el-button>
          </div>
        </div>
        <!-- 组件 -->
      </div>
    </div>
    <div class="border"></div>
    <!-- 组件 -->
  </div>
</template>

<script lang="ts" setup>
// 引入组件
import CommentForm from './CommentForm.vue'
import { ref, reactive, toRefs, getCurrentInstance, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { SET_PARENT_COMMENT_ID } from '@/store/mutations-types'
const store = useStore()
const { proxy } = getCurrentInstance() as any
const { $filters } = proxy
// 定义变量
const allComment = computed(() => store.state.allComment)
const closeComment = computed(() => store.state.closeComment)
const comments = computed(() => store.state.comments)
const parentCommentId = computed(() => store.state.parentCommentId)
// 逻辑处理
const useComment: Function = () => {
  const setReply: Function = (id: number) => {
    store.commit(SET_PARENT_COMMENT_ID, id)
  }

  return { setReply }
}

const { setReply } = useComment()
</script>

<style lang="less" scoped>
.comments + .border {
  position: absolute;
  left: 34px;
  top: 47px;
  bottom: 0;
  border-style: solid;
  border-width: 0 0 0 1px;
  border-color: #e0e0e0;
}

.ui.threaed.comments .comment .comments {
  box-shadow: none;
  margin-top: -2rem;
}
.comment {
  padding-right: 2em !important;
  padding-left: 1em !important;
}
.nickname {
  margin-left: 5px;
  padding: 4px 5px;
}
.comment .el-button {
  margin-left: 5px;
  padding: 4px 5px;
}
.comment > .anchor {
  position: absolute;
  left: 0;
  top: -48px;
}
.comment .comments .comment > .anchor {
  top: -55px;
}
.ui.comments .comment .avatar {
  width: 40px !important;
  margin: 0;
}
.ui.comments .comment .text {
  white-space: pre-wrap !important;
  margin-top: 7px;
  line-height: 1.5;
  a {
    cursor: pointer;
    margin-right: 8px;
    font-weight: bolder;
    color: rgba(0, 0, 0, 0.87);
  }
  div {
    display: inline;
  }
}
.label {
  cursor: default;
  padding: 4px 6px !important;
  font-weight: 500 !important;
}
.comment .form {
  margin-top: 20px;
}
</style>
