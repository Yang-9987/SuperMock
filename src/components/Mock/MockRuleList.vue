<template>
  <div>
    <div>
      <div style="display:flex; justify-content: flex-end;">
        <el-button type="primary" class="mb-4" @click="editRule('add', null)">添加规则</el-button>
      </div>
    </div>
    <div>
      <el-table :data="models" stripe border v-loading="refreshLoading">
        <el-table-column prop="name" label="规则名称" />
        <el-table-column prop="value" label="mock值" />
        <el-table-column prop="note" label="备注" />
        <el-table-column prop="enabled" label="启用状态">
          <template #default="{ row }">
            <el-switch v-model="row.enabled" active-color="#13ce66" inactive-color="#ff4949" @change="saveEnableStatus(row)" />
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间">
          <template #default="{ row }">
            {{ formatDate(row.created_at) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="{ row }">
            <el-button type="primary" @click="deleteRule(row)" :loading="row.deleteLoading" link>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog v-model="editDialogVisible" title="编辑规则" width="50%" :visible.sync="editDialogVisible">
      <el-form ref="ruleFormRef" :model="newRule" :rules="formRule" label-position="right" label-width="100px">
        <el-form-item prop="name" label="规则名称">
          <el-input v-model="newRule.name" placeholder="请输入规则名称" clearable />
        </el-form-item>
        <el-form-item prop="value" label="mock值">
          <el-input v-model="newRule.value" placeholder="请输入mock值" clearable />
        </el-form-item>
        <el-form-item prop="note" label="备注">
          <el-input v-model="newRule.note" placeholder="请输入备注" clearable />
        </el-form-item>
        <el-form-item prop="enabled" label="启用状态">
          <el-switch v-model="newRule.enabled" active-color="#13ce66" inactive-color="#ff4949" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRule" :loading="saveLoading">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue'
import {deleteData, getList, insertData, updateData} from "@/requests/SupaReq";
import {ElMessage, ElMessageBox} from "element-plus";
import {MockRuleType} from "@/requests/Types";
import {formatDateTimeNow, formatDate} from "@/utils/Time";

// 展示数据
let models = reactive([])
// 刷新loading
const refreshLoading = ref(false)

// 渲染
onMounted(async () => {
  await refreshList()
})

// 获取数据
const refreshList = async () => {
  refreshLoading.value = true
  // 使用getList获取数据
  const res = await getList("MockRule")
  if (res) {
    models.splice(0, models.length, ...res.map(model => ({ ...model, deleteLoading: false })))
  } else {
    ElMessage.error('获取数据失败')
  }
  refreshLoading.value = false
}

// 编辑/新增规则
const ruleFormRef = ref()
const newRule = ref<MockRuleType>({
  id: '',
  name: '',
  value: '',
  note: '',
  enabled: true,
  created_at: ''
});
const editDialogVisible = ref(false)
const formRule = {
  name: [{ required: true, message: '请输入规则名称', trigger: 'blur' }],
  value: [{ required: true, message: '请输入mock值', trigger: 'blur' }],
  note: [{ required: false, message: '请输入备注', trigger: 'blur' }],
  enabled: [{ required: true, message: '请选择启用状态', trigger: 'blur' }],
}
const editRule = (type: string, row: MockRuleType) => {
  if (type === 'add') {
    // 新增规则
    newRule.value = {
      id: '',
      name: '',
      value: '',
      note: '',
      enabled: true,
      created_at: formatDateTimeNow(),
    }
    editDialogVisible.value = true
  } else if (type === 'edit') {
    // 编辑规则
    newRule.value = Object.assign({}, row)
  } else {
    ElMessage.error('未知操作')
  }
}

// 保存启用状态
const saveEnableStatus = async (row: MockRuleType) => {
  const res = await updateData("MockRule", row.id, [{ enabled: row.enabled }])
  if (res) {
    ElMessage.success('保存成功')
  } else {
    ElMessage.error('保存失败')
  }
}
// 保存规则
const saveLoading = ref(false)
const saveRule = async () => {
  saveLoading.value = true
  await ruleFormRef.value.validate(async valid => {
    if (valid) {
      let res;
      let paramArray: MockRuleType[] = []
      if (newRule.value.id !== ''){
        // 编辑
        res = await updateData("MockRule", newRule.value.id, paramArray)
      } else {
        // 去除
        delete (newRule.value as Partial<MockRuleType>).id;
        // 添加
        paramArray.push(newRule.value)
        res = await insertData("MockRule", paramArray)
      }
      if (res) {
        ElMessage.success('保存成功')
        editDialogVisible.value = false
        await refreshList()
      } else {
        ElMessage.error('保存失败')
      }
    } else {
      ElMessage.error('请检查输入是否正确')
    }
  })
  saveLoading.value = false
}
// 删除规则
const deleteRule = async (row: MockRuleType) => {
  row.deleteLoading = true
  await ElMessageBox.confirm('确认删除该规则吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    let res = await deleteData("MockRule", row.id)
    if (res) {
      ElMessage.success('删除成功')
      await refreshList()
    } else {
      ElMessage.error('删除失败')
    }
  }).finally(() => {
    row.deleteLoading = false
  })
}
</script>

<style scoped>
</style>
