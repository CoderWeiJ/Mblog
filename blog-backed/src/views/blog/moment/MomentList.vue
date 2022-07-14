<template>
  <div>
    <el-table :data="momentList">
      <el-table-column label="序号" type="index" width="50"></el-table-column>
      <el-table-column label="内容" prop="content" show-overflow-tooltip></el-table-column>
      <el-table-column label="发布状态" width="80">
        <template v-slot="scope">
          <el-switch v-model="scope.row.is_published" @change="momentPublishedChanged(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="点赞数" prop="likes" width="80"></el-table-column>
      <el-table-column label="创建时间" width="170">
        <template v-slot="scope">{{ scope.row.createdAt | dateFormat }}</template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template v-slot="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="goEditMomentPage(scope.row.id)">编辑
          </el-button>
          <el-popconfirm title="确定删除吗？" icon="el-icon-delete" iconColor="red"
            @onConfirm="deleteMomentById(scope.row.id)">
            <el-button size="mini" type="danger" icon="el-icon-delete" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="queryInfo.pageNum" :page-sizes="[10, 20, 30, 50]" :page-size="queryInfo.pageSize" :total="total"
      layout="total, sizes, prev, pager, next, jumper" background>
    </el-pagination>
  </div>
</template>

<script>
import { getMomentListByQuery, updatePublished, deleteMomentById } from '@/api/moment.js'
export default {
  name: 'MomentList',
  data() {
    return {
      queryInfo: {
        pageNum: 1,
        pageSize: 10
      },
      momentList: [],
      total: 0
    }
  },
  created() {
    this.getMomentList()
  },
  methods: {
    // 获取动态列表
    async getMomentList() {
      try {
        const { data } = await getMomentListByQuery(this.queryInfo)
        console.log('data: ', data)
        if (data.success) {
          this.momentList = data.result.moments
          this.total = data.result.total
        }
      } catch (error) {
        console.error('MomentList [getMomentList] Error: ', error.message)
      }
    },
    // 监听pageSize改变
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getMomentList()
    },
    // 监听页码改变
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage
      this.getMomentList()
    },
    async momentPublishedChanged(row) {
      try {
        const { data } = await updatePublished(row.id, row.is_published)
        this.$msg(data.message, 'success')
      } catch (error) {
        console.error('MomentList [updatePublished] Error: ', error.message)
      }
    },
    goEditMomentPage(id) {
      console.log('ididi: ', id)
      this.$router.push(`/blog/moment/edit/${id}`)
    },
    async deleteMomentById(id) {
      try {
        const res = await deleteMomentById(id)
        if (res.success) {
          this.$msg(res.message, 'success')
          this.getMomentList()
        }
      } catch (error) {
        console.error('MomentList [deleteMomentById] Error: ', error.message)
      }
    }
  }
}
</script>

<style scoped>
.el-button + span {
  margin-left: 10px;
}
.el-pagination {
  display: flex;
  justify-content: center;
}
</style>
