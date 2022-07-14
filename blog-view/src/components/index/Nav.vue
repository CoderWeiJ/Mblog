<template>
  <div ref="nav" class="ui-wrapper ui fixed inverted stackable pointing menu" :class="{
      transparent: route.name === 'home' && clientSize.clientWidth > 768,
    }">
    <div class="ui container">
      <router-link to="/">
        <h3 class="ui header item m-blue">{{ blogName }}</h3>
      </router-link>

      <router-link to="/home" class="item" :class="{
          'm-mobile-hide': mobileHide,
          active: route.name === 'home',
        }">
        <el-icon :size="16">
          <HomeFilled />
        </el-icon>&nbsp;首页
      </router-link>
      <el-dropdown trigger="click" @command="categoryRoute">
        <span class="el-dropdown-link item" :class="{
            'm-mobile-hide': mobileHide,
            active: route.name === 'category',
          }">
          <el-icon :size="15">
            <opportunity />
          </el-icon>&nbsp;分类&nbsp;<el-icon :size="15">
            <caret-bottom />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :command="category.category_name" v-for="category in categoryList" :key="category.id">
              {{ category.category_name }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <router-link to="/archives" class="item" :class="{
          'm-mobile-hide': mobileHide,
          active: route.name === 'archives',
        }">
        <el-icon :size="15">
          <document-copy />
        </el-icon>&nbsp;归档
      </router-link>
      <router-link to="/moments" class="item" :class="{
          'm-mobile-hide': mobileHide,
          active: route.name === 'moments',
        }">
        <el-icon :size="15">
          <comment />
        </el-icon>&nbsp;动态
      </router-link>
      <router-link to="/friends" class="item" :class="{
          'm-mobile-hide': mobileHide,
          active: route.name === 'friends',
        }">
        <el-icon :size="15">
          <user />
        </el-icon>&nbsp;友人帐
      </router-link>
      <router-link to="/about" class="item" :class="{
          'm-mobile-hide': mobileHide,
          active: route.name === 'about',
        }">
        <el-icon :size="15">
          <info-filled />
        </el-icon>&nbsp;关于我
      </router-link>
      <el-autocomplete v-model="queryString" :fetch-suggestions="debounceQuery" placeholder="Search..."
        class="right item m-search" :class="{ 'm-mobile-hide': mobileHide }" popper-class="m-search-item"
        :suffix-icon="Search" @select="handleSelect">
        <!-- <template #suffix>
					<el-icon class="el-input__icon" style="color: gray">
						<search />
					</el-icon>
				</template> -->
        <template #default="{ item }">
          <div class="title">{{ item.title }}</div>
          <span class="content">{{ item.content }}</span>
        </template>
      </el-autocomplete>
      <button class="ui menu black icon button m-right-top m-mobile-show" @click="handleMobile">
        <i class="sidebar icon"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 在setup语法糖里，引入组件后不需要注册，直接使用即可
import { ref, reactive, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
// 引入element-ui组件
import {
  Search,
  HomeFilled,
  Opportunity,
  DocumentCopy,
  CaretBottom,
  Comment,
  User,
  InfoFilled,
} from "@element-plus/icons-vue";
// 自定义包
import { getSearchBlogList } from "@/api/blog";

// 获取props
const {blogName, categoryList} = defineProps({
  blogName: {
    type: String,
    required: true,
    // default: 'WeiJ\'s blog',
  },
  categoryList: {
    type: Array,
    required: true,
  },
});
// const { proxy } = getCurrentInstance() as any // 获取全局变量

const router = useRouter();
const store = useStore();
const route = useRoute();

// 定义数据类型
type BlogContent = {
  id?: number;
  title: string;
  content?: string;
}

// 声明响应式变量
let mobileHide = ref<boolean>(true); // 移动端显示/隐藏
let nav = ref<HTMLElement | null>(null); // nav(DOM元素)

let timer = ref<number | null | any>(null);
let queryString = ref<string>("");
let queryResult = reactive<Array<BlogContent>>([]); // 搜索框的搜索结果

// 导航栏逻辑
const useCategoryEffect: Function = () => {
  // 分类导航栏跳转
  const categoryRoute: Function = (name: string) => {
    router.push(`/category/${name}`);
  };
  // 控制移动端样式
  const handleMobile: Function = () => {
    mobileHide.value = !mobileHide.value;
  };
  // 搜索框-防抖
  const debounceQuery: Function = (
    queryString: string | any,
    callback: Function | any
  ) => {
    timer && clearTimeout(timer);
    timer = setTimeout(() => queryBlogList(queryString, callback), 1000);
  };
  // 获取博客信息
  const queryBlogList: Function = async (
    queryString: string | any,
    callback: Function | any
  ) => {
    // 搜索关键词过滤
    if (
      queryString == null ||
      queryString.trim() === "" ||
      queryString.indexOf("%") !== -1 ||
      queryString.indexOf("_") !== -1 ||
      queryString.indexOf("[") !== -1 ||
      queryString.indexOf("#") !== -1 ||
      queryString.indexOf("*") !== -1 ||
      queryString.trim().length > 20
    ) {
      return;
    }
    // 获取搜索结果
    let data: Array<BlogContent> | any = await getSearchBlogList(queryString);
    queryResult = data;
    if (data.length === 0) queryResult.push({ title: "无相关搜索结果" });
  };

  const handleSelect: Function = (item: BlogContent) => {
    if (item.id) router.push(`/blog/${item.id}`);
  };

  return { categoryRoute, handleMobile, debounceQuery, handleSelect };
};

// 方法
const { categoryRoute, handleMobile, debounceQuery, handleSelect } =
  useCategoryEffect();

// computed和watch
const clientSize = computed(() => store.state["clientSize"]);
watch(
  () => route.path,
  () => (mobileHide.value = true)
  // { immediate: true }
);
// 生命周期
onMounted(() => {
  //监听页面滚动位置，改变导航栏的显示

  let navDom: HTMLElement | any = nav.value;
  window.addEventListener("scroll", () => {
    // 首页且不是移动端
    if (route.name === "home" && clientSize.value.clientWidth > 768) {
      if (window.scrollY > clientSize.value.clientHeight / 2) {
        navDom.classList.remove("transparent");
      } else {
        // 导航栏首页透明效果
        navDom.classList.add("transparent");
      }
    }
  });

  //监听点击事件，收起导航菜单
  document.addEventListener("click", (e: PointerEvent | any) => {
    //遍历冒泡
    let flag = e.path.some((item: any) => {
      if (item === nav) return true;
    });
    //如果导航栏是打开状态，且点击的元素不是Nav的子元素，则收起菜单
    if (mobileHide.value && !flag) {
      mobileHide.value = true;
    }
  });
});
</script>

<style lang="less" scoped>
.ui.fixed.menu .container {
  width: 1400px !important;
  margin-left: auto !important;
  margin-right: auto !important;
}

.ui.fixed.menu {
  transition: 0.3s ease-out;
}

.ui.inverted.pointing.menu.transparent {
  background: transparent !important;
}

.ui.inverted.pointing.menu.transparent .active.item:after {
  background: transparent !important;
  transition: 0.3s ease-out;
}

.ui.inverted.pointing.menu.transparent .active.item:hover:after {
  background: transparent !important;
}




.el-dropdown-link {
  outline-style: none !important;
  outline-color: unset !important;
  height: 100% !important;
  cursor: pointer;
}
.el-dropdown-menu {
  height: 100% !important;
  /* margin: 7px 0 0 0 !important; */
  padding: 0 !important;
  border: 0 !important;
  /* background: #1b1c1d !important; */
}

.el-dropdown-menu__item {
  height: 100% !important;
  padding: 0 15px !important;
  margin: 7px 0 !important;
  color: rgba(255, 255, 255, 0.9) !important;
  background: transparent !important;
}

.el-dropdown-menu__item:hover {
  background: rgba(255, 255, 255, 0.08) !important;
}


:deep(span.el-popper__arrow) {
  display: none !important;  
}


.m-search {
  min-width: 220px;
  padding: 0 !important;
}

.m-search input {
  color: rgba(255, 255, 255, 0.9);
  border: 0px !important;
  background-color: inherit;
  padding: 0.67857143em 2.1em 0.67857143em 1em;
}

.m-search i {
  color: rgba(255, 255, 255, 0.9) !important;
}

.m-search-item {
  min-width: 350px !important;
}

.m-search-item li {
  line-height: normal !important;
  padding: 8px 10px !important;
}

.m-search-item li .title {
  text-overflow: ellipsis;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.87);
}

.m-search-item li .content {
  text-overflow: ellipsis;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.7);
}
</style>
