<template>
  <div>
    <div class="ui top attached segment" style="text-align: center">
      <h2 class="m-text-500">我的动态</h2>
    </div>
    <div class="ui attached segment m-padding-bottom-large">
      <div class="moments">
        <div class="moment" v-for="(moment, index) in momentList" :key="index">
          <div class="avatar">
            <img :src="store.state.introduction.avatar" />
          </div>
          <div class="ui card">
            <div class="content m-top">
              <span style="font-weight: 700">{{ store.state.introduction.name }}</span>
              <span class="right floated">{{ $filters.dateFormatNow(moment['createdAt']) }}</span>
            </div>
            <div class="content typo" v-if="moment['is_published']" v-viewer v-html="moment['content']"></div>
            <div class="content typo privacy" v-else v-viewer v-html="`此动态为私密动态`"></div>
            <div class="extra content">
              <a class="left floated" @click.prevent="like(moment['id'])"> <i class="heart icon" :class="!!isLike(moment['id']) ? 'red' : 'outline'"></i>{{ moment['likes'] }} </a>
            </div>
          </div>
        </div>
      </div>
      <!-- 只有一页时隐藏 -->
      <el-pagination @current-change="handleCurrentChange" :current-page="pageNum" :total="totalPage" :page-size="5" layout="prev,pager,next" background hide-on-single-page class="pagination"></el-pagination>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ref, reactive, onMounted, computed, watch } from 'vue'
import { useStore } from 'vuex'
// 引入api
import { getMomentListByPageNum, likeMoment } from '@/api/moment'

// 定义变量
const store = useStore()

const { proxy } = getCurrentInstance() as any
const { $filters, $msgTip, $notify, scrollToTop } = proxy
console.log('$filters', $filters)
// 用 localStorage 本地存储已点赞的动态id数组
const likeMomentIds = reactive(JSON.parse(window.localStorage.getItem('likeMomentIds') || '[]'))

const momentList = ref([])
const pageNum = ref(1)
const totalPage = ref(0)

// computed与watch
const isLike = computed(() => (id: any) => likeMomentIds.indexOf(id) > -1) // 是否点了赞
console.log(isLike.value(1), '点赞情况');

watch(
  () => likeMomentIds,
  (newValue: any) => {
    // 将 likeMomentIds 最新值的json数据保存到localStorage
    window.localStorage.setItem('likeMomentIds', JSON.stringify(newValue))
  },
  { deep: true },
)
// 逻辑处理
const useMoments: Function = () => {
  // 获取动态列表数据
  const getMomentList: Function = async () => {
    // 如果有，则发送博主身份token
    const adminToken = window.localStorage.getItem('adminToken')
    const token = adminToken ? adminToken : ''
    try {
      const res = await getMomentListByPageNum(token, pageNum.value)   
      console.log('哈哈哈：', res)
      if (res.success) {
        momentList.value = res.result.moments
        totalPage.value = res.result.total
        console.log('哪里不对：', totalPage.value)
      } else $msgTip(res.data.message, 'error')
    } catch (error) {
      console.error('数据请求失败', error)
      $msgTip('数据请求失败', 'error')
    }
  }
  // 翻页时触发
  const handleCurrentChange: Function = (newPage: number) => {
    scrollToTop()
    pageNum.value = newPage
    getMomentList()
  }
  // 点赞逻辑
  const like: Function = async (id: any) => {
    // 重复点赞提示
    if (likeMomentIds.indexOf(id) > -1) {
      $notify('不可以重复点赞哦', '', 'warning')
      return
    }
    try {
      const res = await likeMoment(id)
      if (res.success) {
        $notify(res.message, '', 'success')
        likeMomentIds.push(id)
        momentList.value.forEach((item: any) => {
          if (item.id === id) return item.likes++
        })
      } else {
        $notify(res.message, '', 'warning')
      }
    } catch (error) {
      $notify('点赞失败', '', 'error')
    }
  }
  return { getMomentList, handleCurrentChange, like }
}
const { getMomentList, handleCurrentChange, like } = useMoments()

// 生命周期
onMounted(() => {
  getMomentList()
})
</script>

<style lang="less" scoped>
.moments {
  margin-left: 26px;
  padding-left: 40px;
  border-left: 1px solid #dee5e7;
  .moment {
    margin-top: 30px;
    &:first-child {
      margin-top: 0;
    }
    .avatar {
      margin-left: -52.5px;
      img {
        width: 45px;
        height: 45px;
        border-radius: 500px;
      }
    }
    .card {
      width: 100%;
      &::before {
        width: 12px;
        height: 12px;
        border-width: 0 0 1px 1px;
        transform: translate(-50%, -50%) rotate(45deg);
        bottom: auto;
        right: auto;
        top: 22px;
        left: 0;
        position: absolute;
        content: '';
        background-image: none;
        z-index: 2;
        transition: background 0.1s ease;
        background-color: inherit;
        border-style: solid;
        border-color: #d4d4d5;
      }
      .content.m-top {
        padding: 10px 14px;
        .right.floated {
          font-size: 12px;
        }
      }
      .content.typo {
        font-size: 14px;
        &.privacy {
          background: repeating-linear-gradient(145deg, #f2f2f2, #f2f2f2 15px, #fff 0, #fff 30px) !important;
        }
        .extra.content {
          padding: 5px 14px;
          a {
            color: rgba(0, 0, 0, 0.7);
            font-size: 12px;
            &:hover {
              color: red;
            }
            i {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 3em;
}
</style>
