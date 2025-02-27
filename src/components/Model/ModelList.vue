<template>
  <div v-if="!editFlag" v-loading="refreshLoading">
    <!-- 搜索栏 -->
    <el-form :inline="true" class="mb-4">
      <el-form-item label="名称">
        <el-input v-model="searchParams.name" placeholder="请输入名称" clearable />
      </el-form-item>
      <el-form-item label="项目">
        <el-input v-model="searchParams.project" placeholder="请输入项目" clearable />
      </el-form-item>
      <el-form-item label="类别">
        <el-input v-model="searchParams.category" placeholder="请输入类别" clearable />
      </el-form-item>
      <el-form-item>
        <GlowButton round type="primary" @click="handleSearch">搜索</GlowButton>
      </el-form-item>
    </el-form>

    <!-- 操作按钮 -->
    <div style="display:flex; justify-content: flex-end;">
      <GlowButton round type="primary" class="mb-4" @click="editModel('add', null)">添加模型</GlowButton>
    </div>


    <!-- 模型表格 -->
    <el-table :data="models" stripe border>
      <!-- 展开行 -->
      <el-table-column type="expand">
        <template #default="{ row }">
          <div class="p-4">
            <h3 class="text-lg font-bold mb-2">模型详情</h3>
            <el-descriptions :column="2" border>
              <el-descriptions-item label="名称">{{ row.name }}</el-descriptions-item>
              <el-descriptions-item label="项目">{{ row.project }}</el-descriptions-item>
              <el-descriptions-item label="类别">{{ row.category }}</el-descriptions-item>
              <el-descriptions-item label="创建时间">{{ formatDate(row.created_at) }}</el-descriptions-item>
              <el-descriptions-item label="更新时间">{{ formatDate(row.updated_at) }}</el-descriptions-item>
            </el-descriptions>

            <h3 class="text-lg font-bold mt-4 mb-2">字段配置</h3>
            <el-table v-if="row.fields && row.fields.length > 0" :data="row.fields" row-key="name" :tree-props="{ children: 'children' }">
              <el-table-column prop="name" label="字段名" />
              <el-table-column prop="type" label="字段类型" />
              <el-table-column prop="rule" label="Mock 规则" />
            </el-table>
            <p v-else class="text-gray-500">暂无字段配置</p>
          </div>
        </template>
      </el-table-column>

      <!-- 常规列 -->
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="project" label="项目" />
      <el-table-column prop="category" label="类别" />
      <el-table-column prop="created_at" label="创建时间">
        <template #default="{ row }">
          {{ formatDate(row.created_at) }}
        </template>
      </el-table-column>
      <el-table-column prop="updated_at" label="更新时间">
        <template #default="{ row }">
          {{ formatDate(row.updated_at) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button link @click="editModel('edit', row)" v-if="row.user_id == user_id">编辑</el-button>
          <el-button link @click="deleteRow(row.id)" :loading="row.deleteLoading" v-if="row.user_id == user_id">删除</el-button>
          <el-tag v-else type="warning">不属于当前用户无法操作</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div v-else>
    <ModelEdit :model="editingModel" @cancel="handleEditCancel" @save="handleEditSave" />
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, onMounted} from 'vue'
import {ElMessage, ElMessageBox} from "element-plus";
import ModelEdit from "@/components/Model/ModelEdit.vue";
import {deleteData, getList} from "@/requests/SupaReq"
import {formatDateTimeNow, formatDate} from "@/utils/Time";
import {USER_ID_KEY} from "@/utils/clerkUser";
import GlowButton from "@/components/Custom/GlowButton.vue";


// 展示数据
let models = reactive([])
const user_id = localStorage.getItem(USER_ID_KEY)

// 搜索参数
const searchParams = ref({
  name: '',
  project: '',
  category: ''
})
const refreshLoading = ref(false)

// 分页参数
const currentPage = ref(1)
const pageSize = ref(10)

// 处理搜索
const handleSearch = () => {
  console.log('searchParams', searchParams)
}

// 渲染
onMounted(async () => {
  await refreshList()
})

// 获取数据
const refreshList = async () => {
  refreshLoading.value = true
  // 使用getList获取数据
  const res = await getList({ tableName: "Model" })
  if (res) {
    models.splice(0, models.length, ...res.map(model => ({ ...model, deleteLoading: false })))
  } else {
    ElMessage.error('获取数据失败')
  }
  refreshLoading.value = false
}

// 添加/编辑模型
const editFlag = ref(false)
const editingModel = ref(null)
const editModel = (flag: string, data: any) => {
  editFlag.value = true
  if (flag === 'add') {
    // 添加模型
    editingModel.value = {
      id: '',
      name: '',
      project: '',
      category: '',
      created_at: formatDateTimeNow(),
      updated_at: formatDateTimeNow(),
      fields: []
    }
  } else if (flag === 'edit') {
    // 编辑模型
    editingModel.value = data
  } else {
    ElMessage.error('未知操作')
  }
  console.log('editingModel', editingModel)
  editFlag.value = true
}

const handleEditSave = async (res) => {
  if (res.status) {
    if (res.model.id) {
      // 编辑
      ElMessage.success('编辑成功')
    } else {
      // 添加
      models.push(res.model)
      ElMessage.success('添加成功')
    }
    editFlag.value = false
    editingModel.value = null
    await refreshList()
  } else {
    ElMessage.error('保存异常')
  }
}

// 处理取消编辑
const handleEditCancel = (res) => {
  editFlag.value = false
  editingModel.value = null
  ElMessage.info('取消编辑')
}

// 删除模型
const deleteLoading = ref(false)
const deleteRow = async (id) => {
  const model = models.find(m => m.id === id)
  if (model) {
    model.deleteLoading = true
    await ElMessageBox.confirm('确认删除该模型吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      let res = await deleteData("Model", id)
      if (res) {
        ElMessage.success('删除成功')
        await refreshList()
      } else {
        ElMessage.error('删除失败')
      }
    }).catch(() => {
      ElMessage.info('已取消删除')
    })
    model.deleteLoading = false
  }
}
</script>

<style scoped>
.mb-4 {
  margin-bottom: 1rem;
}
.mt-4 {
  margin-top: 1rem;
}
.p-4 {
  padding: 1rem;
}
</style>
