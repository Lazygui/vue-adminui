<script setup lang="ts">
const props = withDefaults(
       defineProps<{
              type?: "" | "primary" | "warning" | "error";
              btnType?: "submit" | "button" | "reset";
              disabled?: boolean;
              class?: string;
       }>(),
       {
              type: "",
              btnType: "button"
       }
);
const emit = defineEmits<{
       (e: "click"): void;
}>();
</script>

<template>
       <div class="z-button">
              <button :type="props.btnType" :class="['btn', props.type ? `btn-${props.type}` : '', props.class]"
                     :disabled="props.disabled" @click="emit('click')">
                     <slot></slot>
              </button>
       </div>
</template>

<style scoped lang="scss"></style>
