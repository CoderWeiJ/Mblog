<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <div slot="header">
            <span>基础设置</span>
          </div>
          <el-form label-position="right" label-width="100px">
            <el-form-item :label="item.name_zh" v-for="item in typeMap.type1" :key="item.id">
              <el-input v-model="item.value" size="mini"></el-input>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div slot="header">
            <span>资料卡</span>
          </div>
          <el-form label-position="right" label-width="100px">
            <el-form-item :label="item.name_zh" v-for="item in typeMap.type3" :key="item.id">
              <div v-if="item.name_en=='favorite'">
                <el-col :span="20">
                  <el-input v-model="item.value" size="mini"></el-input>
                </el-col>
                <el-col :span="4">
                  <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteFavorite(item)">删除
                  </el-button>
                </el-col>
              </div>
              <div v-else>
                <el-input v-model="item.value" size="mini"></el-input>
              </div>
            </el-form-item>
            <el-button type="primary" size="mini" icon="el-icon-plus" @click="addFavorite">添加自定义</el-button>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

    <el-row style="margin-top: 20px">
      <el-card>
        <div slot="header">
          <span>页脚徽标</span>
        </div>
        <el-form :inline="true" v-for="badge in typeMap.type2" :key="badge.id">
          <el-form-item label="title">
            <el-input v-model="badge.value.title" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="url">
            <el-input v-model="badge.value.url" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="subject">
            <el-input v-model="badge.value.subject" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="value">
            <el-input v-model="badge.value.value" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="color">
            <el-input v-model="badge.value.color" size="mini"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteBadge(badge)">删除</el-button>
          </el-form-item>
        </el-form>
        <el-button type="primary" size="mini" icon="el-icon-plus" @click="addBadge">添加 badge</el-button>
      </el-card>
    </el-row>

    <div style="text-align: right;margin-top: 30px">
      <el-button type="primary" icon="el-icon-check" @click="submit">保存</el-button>
    </div>
  </div>
</template>


<script>
// import Breadcrumb from '@/components/Breadcrumb'
import { getSiteSettingData, update } from '@/api/siteSetting.js'
export default {
  name: 'SiteSetting',
  data() {
    return {
      deleteIds: [],
      typeMap: {},
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    // 获取站点信息
    async getData() {
      try {
        const { data } = await getSiteSettingData()

        if (data.success) {
          this.typeMap = data.result
          this.typeMap['type2'].forEach(item => item.value = JSON.parse(item.value))
        }
      } catch (error) {
        console.error('站点信息获取失败: ', error)
      }
    },
    // 添加爱好
    addFavorite() {
      this.typeMap.type3.push({
        key: Date.now(),
        name_en: 'favorite',
        name_zh: '自定义',
        type: 3,
        value: `{"title": "", "content": ""}`
      })
    },
    // 添加徽章
    addBadge() {
      this.typeMap.type2.push({
        key: Date.now(),
        name_en: 'badge',
        name_zh: '徽标',
        type: 2,
        value: {
          color: '',
          subject: '',
          title: '',
          url: '',
          value: ''
        }
      })
    },
    // 删除爱好
    deleteFavorite(favorite) {
      const arr = this.typeMap.type3
      if (favorite.id) {
        this.deleteIds.push(favorite.id)
        arr.forEach((item, index) => {
          if (item.id === favorite.id) {
            arr.splice(index, 1)
            return
          }
        })
      } else {
        arr.forEach((item, index) => {
          if (item.key === favorite.key) {
            arr.splice(index, 1)
            return
          }
        })
      }
    },
    // 删除徽标
    deleteBadge(badge) {
      const arr = this.typeMap.type2
      if (badge.id) {
        this.deleteIds.push(badge.id) // 数据库已有的数据
        arr.forEach((item, index) => {
          if (item.id === badge.id) {
            arr.splice(index, 1)
            return
          }
        })
      } else {
        arr.forEach((item, index) => {
          if (item.key === badge.key) { // 网页后来添加的数据，还没存进数据库
            arr.splice(index, 1)
            return
          }
        })
      }
    },
    // 提交保存
    async submit() {
      const result = Object.assign({}, this.typeMap) // 深拷贝
      result.type2.forEach(item => item.value = JSON.stringify(item.value))
      const updateArr = []
      updateArr.push(...result.type1, ...result.type2, ...result.type3)
      try {        
        const { data } = await update(updateArr, this.deleteIds)
        if (data.success) {
          this.deleteIds.length = 0
          this.getData()
          this.$msg(data.message, 'success')
        } else this.$msg(data.message, 'error')
      } catch (error) {
        console.error('站点更新失败: ', error.message)
        this.$msg('更新失败', 'error')
      }
    }
  },
}
</script>

<style scoped>
</style>
