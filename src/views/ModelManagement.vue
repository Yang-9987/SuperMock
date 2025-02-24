<template>
  <div class="p-4 h-full">
    <h1 class="text-2xl font-bold mb-4">模型管理</h1>
    <el-tabs v-model="activeTab" class="h-full">
      <!-- 模型列表页签 -->
      <el-tab-pane label="模型列表" name="list" class="h-full">
        <ModelList />
      </el-tab-pane>
      <!-- Mock 数据页签 -->
      <el-tab-pane label="生成 Mock 数据" name="mock" class="h-full">
        <GenerateMockData class="h-full pb-4" />
      </el-tab-pane>
    </el-tabs>


  </div>
</template>

<script setup>
import {ref} from 'vue'
import ModelList from '@/components/Model/ModelList.vue'
import GenerateMockData from '@/components/Model/GenerateMockData.vue'

const activeTab = ref('list')

</script>
