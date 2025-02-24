<template>
  <div>
    <el-container class="common-layout">
      <!-- 顶部 Header -->
      <el-header class="bg-blue-500 text-white flex items-center">
        <span class="text-lg font-bold">Mock 数据平台</span>
      </el-header>

      <!-- 主体部分 -->
      <el-container>
        <!-- 左侧 Aside -->
        <el-aside width="200px">
          <el-menu
              :default-active="activeMenu"
              class="h-full bg-gray-300"
              @select="handleMenuSelect"
          >
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

        <!-- 右侧 Main -->
        <el-main class="p-4">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { DataAnalysis, Edit, Setting } from "@element-plus/icons-vue";
import { ref, watch } from 'vue';

const router = useRouter()
const route = useRoute()
const activeMenu = ref(route.name)

const handleMenuSelect = (index) => {
  router.push({ name: index })
}

watch(route, (newRoute) => {
  activeMenu.value = newRoute.name
})
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
