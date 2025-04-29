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

       .btn {
              :where(&) {
                     width: unset;
              }

              display: inline-flex;
              flex-shrink: 0;
              cursor: pointer;
              flex-wrap: nowrap;
              align-items: center;
              justify-content: center;
              gap: calc(0.25rem * 1.5);
              text-align: center;
              vertical-align: middle;
              outline-offset: 2px;
              user-select: none;
              padding-inline: var(--btn-p);
              color: var(--btn-fg);
              --tw-prose-links: var(--btn-fg);
              height: var(--size);
              font-size: var(--fontsize, 0.875rem /* 14px */);
              font-weight: 600;
              outline-color: var(--btn-color, var(--color-base-content));
              transition-property: color, background-color, border-color, box-shadow;
              transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
              transition-duration: 0.2s;
              border-start-start-radius: var(--join-ss, var(--radius-field));
              border-start-end-radius: var(--join-se, var(--radius-field));
              border-end-start-radius: var(--join-es, var(--radius-field));
              border-end-end-radius: var(--join-ee, var(--radius-field));
              background-color: var(--btn-bg);
              background-size: auto, calc(var(--noise) * 100%);
              background-image: none, var(--btn-noise);
              border-width: var(--border);
              border-style: solid;
              border-color: var(--btn-border);
              text-shadow: 0 0.5px oklch(100% 0 0 / calc(var(--depth) * 0.15));
              box-shadow: 0 0.5px 0 0.5px oklch(100% 0 0 / calc(var(--depth) * 6%)) inset, var(--btn-shadow);
              --size: calc(var(--size-field, 0.25rem) * 10);
              --btn-bg: var(--btn-color, var(--color-base-200));
              --btn-fg: var(--color-base-content);
              --btn-p: 1rem;
              --btn-border: color-mix(in oklab, var(--btn-bg), #000 calc(var(--depth) * 5%));
              --btn-shadow: 0 3px 2px -2px color-mix(in oklab, var(--btn-bg) calc(var(--depth) * 30%), #0000),
                     0 4px 3px -2px color-mix(in oklab, var(--btn-bg) calc(var(--depth) * 30%), #0000);
              --btn-noise: var(--fx-noise);

              .prose & {
                     text-decoration-line: none;
              }

              @media (hover: hover) {
                     &:hover {
                            --btn-bg: color-mix(in oklab, var(--btn-color, var(--color-base-200)), #000 7%);
                     }
              }

              &:focus-visible {
                     outline-width: 2px;
                     outline-style: solid;
              }

              &:active:not(.btn-active) {
                     translate: 0 0.5px;
                     --btn-bg: color-mix(in oklab, var(--btn-color, var(--color-base-200)), #000 5%);
                     --btn-border: color-mix(in oklab, var(--btn-color, var(--color-base-200)), #000 7%);
                     --btn-shadow: 0 0 0 0 oklch(0% 0 0/0), 0 0 0 0 oklch(0% 0 0/0);
              }

              &:is(:disabled, [disabled], .btn-disabled) {
                     &:not(.btn-link, .btn-ghost) {
                            background-color: color-mix(in oklab, var(--color-base-content) 10%, transparent);
                            box-shadow: none;
                     }

                     pointer-events: none;
                     --btn-border: #0000;
                     --btn-noise: none;
                     --btn-fg: color-mix(in oklch, var(--color-base-content) 20%, #0000);

                     @media (hover: hover) {
                            &:hover {
                                   pointer-events: none;
                                   background-color: color-mix(in oklab, var(--color-neutral) 20%, transparent);
                                   --btn-border: #0000;
                                   --btn-fg: color-mix(in oklch, var(--color-base-content) 20%, #0000);
                            }
                     }
              }
       }

       .btn-primary {
              --btn-color: var(--color-primary);
              --btn-fg: var(--color-primary-content);
       }

       .btn-error {
              --btn-color: var(--color-error);
              --btn-fg: var(--color-error-content);
       }

       .btn-warning {
              --btn-color: var(--color-warning);
              --btn-fg: var(--color-warning-content);
       }
}
</style>
