<template>
  <div class="p-4">
    <div style="display: flex; flex-direction: row; align-content: center;" class="mb-6">
      <h1 class="text-2xl font-bold">{{ model.id ? '编辑模型' : '添加模型' }}</h1>
      <el-button @click="handleCancel" style="margin: 0 10px" link>返回</el-button>
    </div>

    <el-form ref="formRef" :model="model" :rules="rules" label-width="100px">
      <el-form-item label="名称" prop="name" required>
        <el-input v-model="model.name" placeholder="请输入模型名称" />
      </el-form-item>
      <el-form-item label="项目" prop="project" required>
        <el-input v-model="model.project" placeholder="请输入项目名称" />
      </el-form-item>
      <el-form-item label="类别" prop="category" required>
        <el-input v-model="model.category" placeholder="请输入类别" />
      </el-form-item>
      <el-form-item label="模型结构">
        <el-input
            v-model="jsonInput"
            type="textarea"
            :rows="10"
            placeholder="粘贴 JSON 数据"
            @input="handleInput"
            @keydown.enter.prevent="handleEnter"
            @keydown.tab.prevent="handleTab"
        />
        <el-button type="primary" class="mt-2" @click="parseJson">解析 JSON</el-button>
      </el-form-item>
      <el-form-item label="字段配置">
        <el-table :data="model.fields" row-key="name" :tree-props="{ children: 'children' }">
          <el-table-column prop="name" label="字段名" />
          <el-table-column prop="type" label="字段类型" />
          <el-table-column prop="rule" label="Mock 规则">
            <template #default="{ row }">
              <el-select v-model="row.rule" placeholder="请选择 Mock 规则" filterable>
                <el-option
                    v-for="option in mockOptions(row.type)"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                />
              </el-select>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSave" :loading="saveLoading">保存</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {ElMessage, ElMessageBox} from 'element-plus'
import {insertData, updateData} from "@/requests/SupaReq.js";

// 回调函数
const emit = defineEmits(['cancel','save'])
// 属性
const props = defineProps({
  model: {
    type: Object,
    required: true
  }
})
// 渲染
onMounted(() => {
  // 去除deleteLoading属性
  delete model.value.deleteLoading
  // 将原始数据备份，以便在返回或保存时进行比对
  editModel.value = Object.assign({}, model.value)

})

const model = ref({ ...props.model })
const formRef = ref()
const rules = {
  name: [{ required: true, message: '请输入模型名称', trigger: 'blur' }],
  project: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
  category: [{ required: true, message: '请输入类别', trigger: 'blur' }]
}
const editModel = ref(null)
const jsonInput = ref('')

// 自动补全逻辑
const handleInput = () => {
  const input = jsonInput.value
  const lastChar = input[input.length - 1]

  if (lastChar === '{') {
    jsonInput.value += '}'
  } else if (lastChar === '[') {
    jsonInput.value += ']'
  } else if (lastChar === '"') {
    jsonInput.value += '"'
  }
}
// 回车换行逻辑
const handleEnter = (event) => {
  const textarea = event.target
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const value = jsonInput.value
  // 获取当前行的缩进
  const currentLineStart = value.lastIndexOf('\n', start - 1) + 1
  const currentLine = value.substring(currentLineStart, start)
  const indent = currentLine.match(/^\s*/)[0]
  // 判断是否需要增加缩进
  const lastChar = value[start - 1]
  const nextChar = value[start]
  let newIndent = indent
  if (lastChar === '{' || lastChar === '[') {
    newIndent += '    ' // 增加 4 个空格
  } else if (nextChar === '}' || nextChar === ']') {
    newIndent = indent.slice(0, -4) // 减少 4 个空格
  }
  // 插入换行和缩进
  jsonInput.value =
      value.substring(0, start) +
      '\n' +
      newIndent +
      value.substring(end)
  // 移动光标位置
  setTimeout(() => {
    textarea.selectionStart = textarea.selectionEnd = start + 1 + newIndent.length
  }, 0)
}
// Tab 键缩进逻辑
const handleTab = (event) => {
  const textarea = event.target
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  // 插入 4 个空格
  jsonInput.value =
      jsonInput.value.substring(0, start) +
      '    ' +
      jsonInput.value.substring(end)
  // 移动光标位置
  setTimeout(() => {
    textarea.selectionStart = textarea.selectionEnd = start + 4
  }, 0)
}


// 处理保存模型
const saveLoading = ref(false)
const handleSave = async () => {
  saveLoading.value = true
  await formRef.value.validate(async valid => {
    if (valid) {
      let res;
      if (model.value.id !== ''){
        // 编辑
        res = await updateData("Model", model.value.id, model.value)
      } else {
        // 添加
        res = await insertData("Model", model.value)
      }
      if (res) {
        emit('save', {status: true, model: model.value})
      } else {
        ElMessage.error('保存失败')
      }
    } else {
      ElMessage.error('请检查输入是否正确')
    }
  })
  saveLoading.value = false
}
// 处理取消
const handleCancel = () => {
  // 需要判断是否有修改
  if (JSON.stringify(model.value) !== JSON.stringify(editModel.value)) {
    ElMessageBox.confirm('确定取消编辑吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      emit('cancel', { status: false, model: model.value })
    })
  } else {
    emit('cancel', { status: false, model: model.value })
  }
}

// Mock 规则预设值
const mockOptions = (type) => {
  const options = [
    { value: '@cname', label: '中文姓名' },
    { value: '@name', label: '英文姓名' },
    { value: '@integer(1, 100)', label: '1-100 的整数' },
    { value: '@float(0, 100, 2, 2)', label: '0-100 的浮点数' },
    { value: '@date', label: '日期' },
    { value: '@datetime', label: '日期时间' },
    { value: '@image("200x100")', label: '图片 URL' },
    { value: '@title', label: '标题' },
    { value: '@sentence', label: '句子' },
    { value: '@paragraph', label: '段落' }
  ]
  // 根据字段类型过滤选项
  return options
}

// 处理 JSON 解析
const parseJson = () => {
  try {
    const parsed = JSON.parse(jsonInput.value)
    const fields = parseObject(parsed)
    model.value.fields = fields
  } catch (error) {
    ElMessage.error('JSON 解析失败，请检查格式是否正确')
  }
}

// 递归解析对象或数组
const parseObject = (obj, prefix = '') => {
  if (typeof obj !== 'object' || obj === null) {
    // 如果不是对象或数组，直接返回
    return []
  }
  return Object.keys(obj).map((key) => {
    const value = obj[key]
    const fullKey = prefix ? `${prefix}.${key}` : key

    if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object') {
      // 如果是数组且元素是对象，解析第一个元素作为模板
      return {
        name: key,
        type: 'array',
        rule: '',
        children: parseObject(value[0])
      }
    } else if (Array.isArray(value)) {
      // 如果是数组但元素不是对象，直接返回
      return {
        name: key,
        type: 'array',
        rule: '',
        children: value.map((item, index) => ({
          name: `[${index}]`,
          type: typeof item,
          rule: ''
        }))
      }
    } else if (typeof value === 'object' && value !== null) {
      // 如果是嵌套对象，递归解析
      return {
        name: key,
        type: 'object',
        rule: '',
        children: parseObject(value)
      }
    } else {
      // 如果是普通字段，直接返回
      return {
        name: key,
        type: typeof value,
        rule: ''
      }
    }
  })
}
</script>
