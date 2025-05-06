<script setup lang="ts">
const props = withDefaults(
       defineProps<{
              label: string;
              modelValue: boolean;
       }>(),
       {}
);
const emit = defineEmits<{
       (e: "update:modelValue", el: boolean): void;
}>();
</script>

<template>
       <div class="z-Checkbox">
              <label class="ml-2 block text-sm text-base-content/90">
                     <input
                            class="checkbox checkbox-primary checkbox-sm"
                            type="checkbox"
                            :checked="props.modelValue"
                            @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
                     />
                     {{ props.label }}
              </label>
       </div>
</template>

<style scoped lang="scss">
.z-Checkbox {
       width: 100%;
       display: flex;
       align-items: center;
       justify-content: space-between;
}
</style>
