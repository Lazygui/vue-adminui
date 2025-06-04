<template>
       <div class="relative">
              <select class="select select-bordered w-full" :multiple="multiple" v-model="selectItem"
                     @change="handleChange">
                     <!-- 默认的占位符选项 -->
                     <option value="" disabled :selected="!isOptionSelected">
                            {{ props.placeholder }}
                     </option>
                     <option v-for="(option, index) in options" :key="index" :value="option">
                            {{ option }}
                     </option>
              </select>
       </div>
</template>

<script setup lang="ts">

const props = withDefaults(
       defineProps<{
              modelValue: string | string[];
              options: string[];
              multiple?: boolean;
              placeholder?: string;
       }>(),
       {
              multiple: false,
              placeholder: '请选择',
       }
);

const emit = defineEmits(['update:modelValue']);

// 检查是否有选中的选项
const isOptionSelected = computed(() => {
       if (props.multiple) {
              return Array.isArray(props.modelValue) && props.modelValue.length > 0;
       }
       return props.modelValue !== '';
});

// 处理 v-model
const selectItem = computed({
       get: () => props.modelValue,
       set: (value) => {
              emit('update:modelValue', value);
       },
});

// 处理选择变化
const handleChange = (event: Event) => {
       const selectElement = event.target as HTMLSelectElement;
       if (selectElement.value === '') {
              // 如果用户选择了占位符选项，重置值
              emit('update:modelValue', props.multiple ? [] : '');
       }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>