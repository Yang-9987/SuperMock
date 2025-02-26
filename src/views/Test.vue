<script setup lang="ts">
import {onMounted} from "vue";
import Mock from "mockjs";

const rule = {
  "data|1-10": "★"
}

onMounted(() => {
  console.log(Mock.mock(rule).data)
  console.log(JSON.stringify(Mock.mock(rule), null, 2))
})
</script>

<template>

</template>

<style scoped>

</style>
