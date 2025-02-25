<template>
  <div>
    <el-container class="common-layout">
      <!-- 顶部 Header -->
      <el-header class="bg-blue-500 text-white flex items-center justify-between">
        <span class="text-lg font-bold">Mock 数据平台</span>
        <div>
          <div v-if="clerkStore.user" class="flex items-center">
            <div class="mr-4">欢迎, {{ clerkStore.user.primaryEmailAddress }}</div>
            <el-button  @click="clerkStore.signOut">退出</el-button>
          </div>
          <div v-else>
            <el-button  @click="clerkStore.openSignIn()">登录</el-button>
          </div>
        </div>
      </el-header>

      <!-- 主体部分 -->
      <el-container>
        <!-- 左侧 Aside -->
        <el-aside width="200px" v-if="clerkStore.user">
          <el-menu
              :default-active="activeMenu"
              class="h-full bg-gray-300"
              @select="handleMenuSelect">
            <el-menu-item index="model-management">
              <el-icon><Setting /></el-icon>
              <span>模型管理</span>
            </el-menu-item>
            <el-menu-item index="mock-rules">
              <el-icon><Edit /></el-icon>
              <span>Mock 规则</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-aside width="200px" v-else>
          <el-menu
              :default-active="activeMenu"
              class="h-full bg-gray-300"
              @select="handleMenuSelect">
            <div class="flex items-center justify-center h-full">
              <el-tag type="info" size="large">登录后查看更多内容</el-tag>
            </div>
          </el-menu>
        </el-aside>

        <!-- 右侧 Main -->
        <el-main class="p-4">
          <router-view v-if="clerkStore.user" />
          <div class="flex items-center justify-center h-full" v-else>
            <el-tag type="info" size="large">登录后查看更多内容</el-tag>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { Edit, Setting } from "@element-plus/icons-vue";
import {ref, watch} from 'vue';

const router = useRouter()
const route = useRoute()
const activeMenu = ref(route.name)

const handleMenuSelect = (index) => {
  router.push({ name: index })
}

watch(route, (newRoute) => {
  activeMenu.value = newRoute.name
})

import { useClerkStore } from '@/stores/clerk';
const clerkStore = useClerkStore();
</script>

<style>
.common-layout {
  min-height: 100vh;
  width: 100%;
}
/* 移除 el-aside 的默认内边距 */
.el-aside {
  padding: 0 !important;
}

/* 移除 el-menu 的默认内边距 */
.el-menu {
  border-right: none !important;
}

/* 确保 el-menu-item 紧贴左侧 */
.el-menu-item {
  padding-left: 20px !important;
}

/* 调整 el-header 的默认样式 */
.el-header {
  padding: 0 20px !important;
}
</style>
