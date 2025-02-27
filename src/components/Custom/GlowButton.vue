<!-- GlowButton.vue -->
<template>
  <el-button
      ref="buttonRef"
      @mouseenter="addGlow"
      @mouseleave="removeGlow"
      :class="{ glow: isGlowing }"
      v-bind="buttonProps"
  >
    <slot></slot>
  </el-button>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import 'element-plus/es/components/button/style/css';

const isGlowing = ref(false);
const buttonRef = ref(null);

// Define props to accept all el-button props
const buttonProps = defineProps();

const addGlow = () => {
  isGlowing.value = true;
};

const removeGlow = () => {
  isGlowing.value = false;
};

// Expose the button instance to allow method access
defineExpose({
  buttonRef
});
</script>

<style scoped>
.glow {
  transition: box-shadow 0.3s ease;
  box-shadow: 0 0 15px var(--glow-main-color), 0 0 30px var(--glow-secondary-color);
}
</style>
