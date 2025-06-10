<script setup lang="ts">
/**
* ZButton 组件
*
* 这是一个可自定义的按钮组件，支持多种类型、样式和状态。
*
* Props:
* - type: 指定按钮的类型（如 primary、warning、error、success、info）。
* - btnType: 指定 HTML 按钮的类型（如 submit、button、reset）。
* - disabled: 如果为 true，则禁用按钮。
* - class: 额外的 CSS 类名，应用于按钮。
* - plain: 如果为 true，则应用朴素样式。
* - dash: 如果为 true，则应用虚线边框样式。
* - link: 如果为 true，则应用链接样式。
* - loading: 如果为 true，则显示加载动画。
*
* Emits:
* - click: 当按钮被点击时触发。
*/
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
              loading: false,
              disabled: false
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
