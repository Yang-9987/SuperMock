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

        <!-- 右侧 Main -->
        <el-main class="p-0">
          <SignedIn>
            <router-view class="p-8"/>
          </SignedIn>
          <SignedOut>
            <!-- 主展示区 -->
            <div class="h-[calc(100vh-60px)] bg-gray-50">
              <!-- 产品主推区 -->
              <div class="pt-20 px-4 max-w-7xl mx-auto text-center">
                <el-card shadow="never" class="border-0 bg-transparent">
                  <h1 class="text-4xl font-bold mb-6">
                    新一代
                    <span class="text-blue-600">Mock数据管理平台</span>
                  </h1>
                  <p class="text-lg text-gray-600 mb-8">
                    基于Vue3构建，提供可视化接口配置与安全团队协作能力
                  </p>
                  <div class="flex justify-center gap-4 mb-12">
                    <SignUpButton mode="modal">
                      <el-button type="primary" size="large">注册账户</el-button>
                    </SignUpButton>
                  </div>
                </el-card>

                <!-- 核心功能 -->
                <div id="features" class="py-16 grid md:grid-cols-3 gap-8">
                  <el-card
                      v-for="(feat,index) in features"
                      :key="index"
                      shadow="hover"
                      class="h-full transition-all">
                    <div class="flex flex-col items-center text-center">
                      <component :is="feat.icon" class="w-12 h-12 text-blue-600 mb-4"/>
                      <h3 class="text-xl font-bold mb-2">{{ feat.title }}</h3>
                      <p class="text-gray-600">{{ feat.desc }}</p>
                    </div>
                  </el-card>
                </div>

                <!-- 技术栈展示 -->
                <el-card>
                  <div class="text-center">
                    <h2 class="text-2xl font-bold mb-6">技术架构</h2>
                    <div class="flex flex-wrap justify-center gap-4">
                      <el-tag
                          v-for="tech in technologies"
                          :key="tech"
                          type="info"
                          size="large"
                          class="px-6 py-3"
                      >
                        {{ tech }}
                      </el-tag>
                    </div>
                  </div>
                </el-card>
              </div>
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
import {SignUpButton} from '@clerk/vue'
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
  // 判断登录状态
  if (newUser == null) {
    // 未登录
    removeUserFromLocalStorage()
  } else {
    // 已登录
    setUserToLocalStorage(newUser)
  }
})

import {Monitor, MagicStick, DataAnalysis} from '@element-plus/icons-vue'

const features = [
  {
    icon: MagicStick,
    title: '可视化配置',
    desc: '实时预览数据结构'
  },
  {
    icon: Connection,
    title: '团队协作',
    desc: '基于Clerk的权限管理系统'
  },
  {
    icon: DataAnalysis,
    title: '数据洞察',
    desc: '请求日志分析，响应时间监控'
  }
]

const technologies = [
  'Vue 3',
  'TypeScript',
  'Supabase',
  'Element Plus',
  'Clerk Auth',
  'Vite'
]
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

.el-card {
  transition: transform 0.3s, box-shadow 0.3s;
}

.el-card:hover {
  transform: translateY(-5px);
}
</style>
