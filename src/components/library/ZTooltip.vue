<script setup lang="ts">
const props = withDefaults(
       defineProps<{
              content: string;
              placement?: 'top' | 'bottom' | 'left' | 'right'
       }>(),
       {
       }
);
</script>

<template>
       <div class="z-tooltip" :data-tip="props.content" :class="[`tooltip-${props.placement || 'tooltip-top'}`]">
              <slot></slot>
       </div>
</template>

<style scoped lang="scss">
.z-tooltip {
       position: relative;
       display: inline-block;

       > :where(.tooltip-content),
       &:where([data-tip]):before {
              position: absolute;
              max-width: 20rem;
              border-radius: var(--radius-field);
              padding-inline: calc(0.25rem * 2);
              padding-block: calc(0.25rem * 1);
              text-align: center;
              white-space: normal;
              color: var(--color-neutral-content);
              opacity: 0%;
              font-size: 0.875rem;
              line-height: 1.25;
              transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1) 75ms, transform 0.2s cubic-bezier(0.4, 0, 0.2, 1) 75ms;
              background-color: var(--color-neutral);
              width: max-content;
              pointer-events: none;
              z-index: 1;
              --tw-content: attr(data-tip);
              content: var(--tw-content);
       }

       &:after {
              position: absolute;
              position: absolute;
              opacity: 0%;
              background-color: var(--color-neutral);
              transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1) 75ms, transform 0.2s cubic-bezier(0.4, 0, 0.2, 1) 75ms;
              content: "";
              pointer-events: none;
              width: 0.625rem;
              height: 0.25rem;
              display: block;
              mask-repeat: no-repeat;
              mask-position: -1px 0;
              --mask-tooltip: url("data:image/svg+xml,%3Csvg width='10' height='4' viewBox='0 0 8 4' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.500009 1C3.5 1 3.00001 4 5.00001 4C7 4 6.5 1 9.5 1C10 1 10 0.499897 10 0H0C-1.99338e-08 0.5 0 1 0.500009 1Z' fill='black'/%3E%3C/svg%3E%0A");
              mask-image: var(--mask-tooltip);
       }

       &.tooltip-open,
       &[data-tip]:not([data-tip=""]):hover,
       &:not(:has(.tooltip-content:empty)):has(.tooltip-content):hover,
       &:has(:focus-visible) {

              >.tooltip-content,
              &[data-tip]:before,
              &:after {
                     opacity: 100%;
                     --tt-pos: 0rem;
                     transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0s, transform 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0ms;
              }
       }

       >.tooltip-content,
       &[data-tip]:before {
              transform: translateX(-50%) translateY(var(--tt-pos, 0.25rem));
              inset: auto auto calc(100% + 0.5rem) 50%;
       }

       &:after {
              transform: translateX(-50%) translateY(var(--tt-pos, 0.25rem));
              inset: auto auto calc(100% + 1px + 0.25rem) 50%;
       }
}
</style>
