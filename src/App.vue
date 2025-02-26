<template>
  <div>
    <el-container class="common-layout">
      <!-- 顶部 Header -->
      <el-header class="bg-blue-500 text-white flex items-center justify-between">
        <span class="text-lg font-bold">Mock 数据平台</span>
        <div>
          <SignedIn>
            <div class="flex items-center">
              <div class="mr-4">{{ "欢迎，" + user.username }}</div>
              <UserButton/>
            </div>

          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button>登录</button>
            </SignInButton>
          </SignedOut>
        </div>
      </el-header>

      <!-- 主体部分 -->
      <el-container>
        <!-- 左侧 Aside -->
        <SignedIn>
          <el-aside width="200px">
            <el-menu
                :default-active="activeMenu"
                class="h-full bg-gray-300"
                @select="handleMenuSelect">
              <el-menu-item index="model-management">
                <el-icon>
                  <Setting/>
                </el-icon>
                <span>模型管理</span>
              </el-menu-item>
              <el-menu-item index="mock-rules">
                <el-icon>
                  <Edit/>
                </el-icon>
                <span>Mock 规则</span>
              </el-menu-item>
              <el-menu-item index="mock-link">
                <el-icon>
                  <Connection/>
                </el-icon>
                <span>Mock 链接</span>
              </el-menu-item>
            </el-menu>
          </el-aside>
        </SignedIn>
        <SignedOut>
          <el-aside width="200px">
            <el-menu
                :default-active="activeMenu"
                class="h-full bg-gray-300"
                @select="handleMenuSelect">
              <div class="flex items-center justify-center h-full">
                <el-tag type="info" size="large">登录后查看更多内容</el-tag>
              </div>
            </el-menu>
          </el-aside>
        </SignedOut>


        <!-- 右侧 Main -->
        <el-main class="p-4">
          <SignedIn>
            <router-view/>
          </SignedIn>
          <SignedOut>
            <div class="flex items-center justify-center h-full">
              <el-tag type="info" size="large">登录后查看更多内容</el-tag>
            </div>
          </SignedOut>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import {useRouter, useRoute} from 'vue-router'
import {Connection, Edit, Setting} from "@element-plus/icons-vue";
import {ref, watch} from 'vue';
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/vue";
import {useUser} from '@clerk/vue'
import {removeUserFromLocalStorage, setUserToLocalStorage} from "@/utils/clerkUser.js";

const {user} = useUser()
const router = useRouter()
const route = useRoute()
const activeMenu = ref(route.name)

const handleMenuSelect = (index) => {
  router.push({name: index})
}
watch(route, (newRoute) => {
  activeMenu.value = newRoute.name
}, {immediate: true})
watch(user, (newUser) => {
  console.log('newUser', newUser)
  // 判断登录状态
  if (newUser == null) {
    // 未登录
    removeUserFromLocalStorage()
  } else {
    // 已登录
    setUserToLocalStorage(newUser)
  }
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
