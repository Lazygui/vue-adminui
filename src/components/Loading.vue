<script setup lang="ts">
const props = defineProps<{ msg: string }>()
</script>

<template>
  <div class="loading">1{{ props.msg }}</div>
</template>

<style scoped>
.loading {
  width: 100%;
  height: 100%;
  border: 1px solid red;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
