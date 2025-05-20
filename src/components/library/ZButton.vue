<script setup lang="ts">
const props = withDefaults(
       defineProps<{
              type?: "" | "primary" | "warning" | "error" | "success" | "info";
              btnType?: "submit" | "button" | "reset";
              disabled?: boolean;
              class?: string;
              plain?: boolean;
              dash?: boolean;
              link?: boolean;
              loading?: boolean;
       }>(),
       {
              btnType: "button",
              plain: false,
              dash: false,
              link: false,
              loading: false
       }
);
const emit = defineEmits<{
       (e: "click"): void;
}>();
</script>

<template>
       <div class="z-button">
              <button :type="props.btnType" class="btn"
                     :class="[props.type ? `btn-${props.type}` : '', props.class, props.plain ? 'btn-soft' : '', props.dash ? 'btn-dash' : '', props.link ? 'btn-link' : '']"
                     :disabled="props.disabled" @click="emit('click')">
                     <span v-show="props.loading" :class="{ 'loading loading-spinner': props.loading }"></span>
                     <slot></slot>
              </button>
       </div>
</template>

<style scoped lang="scss">
.z-button {
       .btn-link {
              &.btn-primary {
                     --btn-fg: var(--color-primary);
              }

              &.btn-error {
                     --btn-fg: var(--color-error);
              }

              &.btn-warning {
                     --btn-fg: var(--color-warning);
              }

              &.btn-success {
                     --btn-fg: var(--color-success);
              }

              &.btn-info {
                     --btn-fg: var(--color-info);
              }
       }
}
</style>
