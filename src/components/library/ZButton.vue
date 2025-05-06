<script setup lang="ts">
const props = withDefaults(
       defineProps<{
              type?: "" | "primary" | "warning" | "error";
              btnType?: "submit" | "button" | "reset";
              disabled?: boolean;
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
              <button
                     :type="props.btnType"
                     :class="['btn', props.type ? `btn-${props.type}` : '', 'w-full']"
                     :disabled="props.disabled"
                     @click="emit('click')"
              >
                     <slot></slot>
              </button>
       </div>
</template>

<style scoped lang="scss">
.z-button {
       width: 100%;

       .w-full {
              width: 100%;
       }
}
</style>
