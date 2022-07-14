<template>
  <!-- 标签云 -->
  <div class="ui segments m-box">
    <div class="ui secondary segment"><i class="tags icon"></i>标签云</div>
    <div class="ui yellow segment m-padding-small">
      <router-link :to="`/tag/${tag.tag_name}`" class="ui label m-text-500" :class="tag.color" v-for="(tag, index) in tagList" :key="index">
        {{ tag.tag_name }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    tagList: Array,
  },
  // mounted() {
  //   console.log('Tag组件：', this.tagList)
  // },
  setup() {},
})
</script>

<style lang="less" scoped>
	.secondary.segment {
		padding: 10px;
	}

	.m-padding-small {
		padding: 7px;
	}

	.label {
		margin: 3px !important;
	}
</style>
