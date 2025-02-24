<template>
  <div class="p-4">
    <div class="mb-4">
      <h1 class="text-2xl font-bold">生成模拟数据</h1>
    </div>
    <el-row :gutter="20" class="h-3/4">
      <!-- Left side: Model list -->
      <el-col :span="10" class="h-3/4">
        <h2 class="text-xl font-bold mb-4">模型列表 <el-icon size="15" @click="refreshList"><Refresh /></el-icon></h2>
        <el-scrollbar class="h-full" v-loading="refreshLoading">
          <el-button v-for="item in models" @click="handleClick(item)" :class="btnClass(item.id)">{{ item.project + "-" + item.name }}</el-button>
        </el-scrollbar>
      </el-col>

      <!-- Middle: Generate Data button -->
      <el-col :span="4" class="h-3/4">
        <div class="flex h-full justify-center items-center">
          <el-button type="primary" @click="generateData">生成数据</el-button>
        </div>
      </el-col>

      <!-- Right side: Display generated JSON data -->
      <el-col :span="10" class="h-3/4">
        <h2 class="text-xl font-bold mb-4">生成的数据 <el-icon size="15" @click="copyToClipboard"><CopyDocument /></el-icon></h2>
        <pre class="h-full border border-gray-300 overflow-auto">{{ generatedDataShow }}</pre>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import {reactive, ref, onMounted} from 'vue'
import {getList} from "@/requests/SupaReq.ts"
import {CopyDocument, Refresh} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import Mock from "mockjs";

const models = reactive([])

//渲染
onMounted(async () => {
  await refreshList()
})

const refreshLoading = ref(false)
// 获取数据
const refreshList = async () => {
  refreshLoading.value = true
  // 使用getList获取数据
  const res = await getList("Model")
  if (res) {
    models.splice(0, models.length, ...res.map(model => ({ ...model, deleteLoading: false })))
  } else {
    ElMessage.error('获取数据失败')
  }
  refreshLoading.value = false
}
const activeBtn = ref(null)
// Tab样式
const btnClass = (id) => {
  if (!activeBtn.value) {
    return ''
  }
  return id === activeBtn.value.id ? 'btn-active' : '';
}
// 选取item
const handleClick = (item) => {
  activeBtn.value = item
}
// 生成数据
const generatedDataShow = ref('')
const generateMockTemplate = (fields) => {
  return fields.reduce((template, field) => {
    if (field.type === 'object' && field.children) {
      template[field.name] = generateMockTemplate(field.children)
    } else if (field.type === 'array' && field.children) {
      template[field.name + '|1-10'] = [generateMockTemplate(field.children)]
    } else {
      template[field.name] = field.rule
    }
    return template
  }, {})
}
const generateData = () => {
  // 根据activeBtn.value.fields,使用Mock.js生成数据
  if (activeBtn.value && activeBtn.value.fields) {
    const mockTemplate = generateMockTemplate(activeBtn.value.fields)
    console.log('mockTemplate', mockTemplate)
    const generatedData = Mock.mock(mockTemplate)
    generatedDataShow.value = JSON.stringify(generatedData, null, 2)
  } else {
    ElMessage.warning('请先选择一个模型')
  }
}
// 复制到剪贴板
const copyToClipboard = () => {
  navigator.clipboard.writeText(generatedDataShow.value).then(() => {
    ElMessage.success('复制成功')
  }).catch(() => {
    ElMessage.error('复制失败')
  })
}
</script>
<style scoped>
.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}
</style>
