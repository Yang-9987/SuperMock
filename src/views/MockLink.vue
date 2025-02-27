<script setup lang="ts">
import {ref} from "vue";
import MockLinkList from "@/components/Link/MockLinkList.vue";

const activeTab = ref('list')
</script>

<template>
  <div class="p-4 h-full">
    <h1 class="text-2xl font-bold mb-4">Mock 链接</h1>
    <el-tabs v-model="activeTab" class="h-full">
      <!-- 页签 -->
      <el-tab-pane label="链接列表" name="list" class="h-full" :lazy="true">
        <MockLinkList />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>

</style>
