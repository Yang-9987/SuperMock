<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">自定义数据模型</h1>
    <el-table :data="fields" row-key="name" :tree-props="{ children: 'children' }">
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

    <el-button type="primary" class="mt-4" @click="generateMockData">生成 Mock 数据</el-button>

    <el-divider />

    <h2 class="text-xl font-bold mb-4">生成的 Mock 数据</h2>
    <pre class="p-4 bg-gray-100 rounded">{{ JSON.stringify(mockData, null, 2) }}</pre>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Mock from 'mockjs'

const props = defineProps({
  fields: {
    type: Array,
    required: true
  }
})

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
  if (type === 'number') {
    return options.filter((opt) => opt.value.includes('integer') || opt.value.includes('float'))
  } else if (type === 'string') {
    return options.filter((opt) => !opt.value.includes('integer') && !opt.value.includes('float'))
  } else {
    return []
  }
}

// 生成的 Mock 数据
const mockData = ref(null)

// 生成 Mock 数据
const generateMockData = () => {
  const mockTemplate = props.fields.reduce((acc, field) => {
    if (field.children) {
      // 如果是嵌套字段，递归生成 Mock 数据
      acc[field.name] = generateNestedMockData(field.children, field.type === 'array')
    } else {
      // 如果是普通字段，使用 Mock 规则
      acc[field.name] = field.rule || getDefaultMockRule(field.type)
    }
    return acc
  }, {})

  mockData.value = Mock.mock(mockTemplate)
}

// 递归生成嵌套字段的 Mock 数据
const generateNestedMockData = (children, isArray = false) => {
  const generateItem = () => {
    return children.reduce((acc, child) => {
      if (child.children) {
        // 如果是嵌套字段，递归生成 Mock 数据
        acc[child.name] = generateNestedMockData(child.children, child.type === 'array')
      } else {
        // 如果是普通字段，使用 Mock 规则
        acc[child.name] = child.rule || getDefaultMockRule(child.type)
      }
      return acc
    }, {})
  }

  // 如果是数组类型，生成多个对象
  if (isArray) {
    return Mock.mock({
      'array|1-5': [generateItem()]
    }).array
  }

  // 如果是对象类型，生成单个对象
  return generateItem()
}

// 默认 Mock 规则
const getDefaultMockRule = (type) => {
  switch (type) {
    case 'string':
      return '@cname'
    case 'number':
      return '@integer(1, 100)'
    case 'boolean':
      return '@boolean'
    case 'date':
      return '@date'
    default:
      return ''
  }
}
</script>
