<script setup lang="ts">
/**
 * ZCard 卡片组件
 *
 * 提供带阴影、内边距和自定义样式的卡片容器
 *
 * @example 基本用法
 * <ZCard>卡片内容</ZCard>
 *
 * @example 带自定义内边距
 * <ZCard padding="1rem">内容</ZCard>
 *
 * @example 带悬停阴影
 * <ZCard shadow="hover">悬停显示阴影</ZCard>
 *
 */
interface Props {
       /**
        * 卡片内边距
        * @default '2rem'
        */
       padding?: string;
       /**
        * 阴影显示模式
        * - 'always': 始终显示
        * - 'never': 从不显示
        * - 'hover': 悬停时显示
        * @default 'always'
        */
       shadow?: "always" | "never" | "hover";

       class?: string;
}

const props = withDefaults(defineProps<Props>(), {
       padding: "2rem",
       shadow: "always"
});
</script>

<template>
       <div :class="[`${props.class || ''}`, 'z-card', `shadow-${props.shadow}`]">
              <slot></slot>
       </div>
</template>

<style scoped lang="scss">
.z-card {
       position: relative;
       display: flex;
       padding: v-bind(padding);
       background-color: color-mix(in oklab, var(--color-base-100) 95%, transparent);
       border-color: color-mix(in oklab, var(--color-border-base) 10%, transparent);
       border-radius: 0.5rem;
       border-width: 1px;
       border-style: solid;
       transition: box-shadow 0.2s ease;
       max-width: 100%;
       max-height: 100%;
       $shadow-color: 0px 0px 12px color-mix(in oklab, var(--color-border-base) 10%, transparent);

       &.shadow-always {
              box-shadow: $shadow-color;
       }

       &.shadow-hover:hover {
              box-shadow: $shadow-color;
       }

       &.shadow-never {
              box-shadow: none;
       }
}
</style>
