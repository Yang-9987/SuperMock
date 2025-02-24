<template>
  <div class="p-4 h-full">
    <h1 class="text-2xl font-bold mb-4">Mock 规则</h1>
    <!-- 这里可以放置自定义 Mock 规则的功能 -->
    <el-tabs v-model="activeTab" class="h-full">
      <!-- 模型列表页签 -->
      <el-tab-pane label="规则列表" name="list" class="h-full">
        <MockRuleList />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import MockRuleList from "@/components/Mock/MockRuleList.vue";

const activeTab = ref('list')
</script>
