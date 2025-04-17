<script setup lang="ts">
const props = withDefaults(defineProps<{
       label: string
       modelValue: boolean
}>(), {
})
const emit = defineEmits<{
       (e: 'update:modelValue', el: boolean): void,
}>()
</script>

<template>
       <div class="z-Checkbox">
              <label class="label-checkbox block">
                     <input class="checkbox" type="checkbox" :checked="props.modelValue"
                            @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)" />
                     {{ props.label }}
              </label>
       </div>
</template>

<style scoped lang="scss">
.z-Checkbox {
       width: 100%;
       --size: calc(var(--size-selector, 0.25rem) * 5);

       .label-checkbox {
              color: color-mix(in oklab, var(--color-base-content) 90%, transparent);
              font-size: 0.875rem;
              line-height: calc(1.25 / 0.875);

              .checkbox {
                     color: var(--color-primary-content);
                     padding: 0.1875rem;
                     border: var(--border) solid var(--color-primary, color-mix(in oklab, var(--color-base-content) 20%, #0000));
                     position: relative;
                     flex-shrink: 0;
                     cursor: pointer;
                     appearance: none;
                     border-radius: var(--radius-selector);
                     vertical-align: middle;
                     box-shadow: 0 1px oklch(0% 0 0 / 0) inset, 0 0 #0000 inset, 0 0 #0000;
                     transition: background-color 0.2s, box-shadow 0.2s;
                     width: var(--size);
                     height: var(--size);
                     background-size: auto, calc(var(--noise) * 100%);
                     background-image: none, var(--fx-noise);

                     &:before {
                            --tw-content: "";
                            content: var(--tw-content);
                            display: block;
                            width: 100%;
                            height: 100%;
                            rotate: 45deg;
                            background-color: currentColor;
                            opacity: 0%;
                            transition: clip-path 0.3s, opacity 0.1s, rotate 0.3s, translate 0.3s;
                            transition-delay: 0.1s;
                            clip-path: polygon(20% 100%, 20% 80%, 50% 80%, 50% 80%, 70% 80%, 70% 100%);
                            box-shadow: 0px 3px 0 0px oklch(100% 0 0 / 0) inset;
                            font-size: 1rem;
                            line-height: 0.75;
                     }

                     &:focus-visible {
                            outline: 2px solid var(--color-primary, currentColor);
                            outline-offset: 2px;
                     }

                     &:checked,
                     &[aria-checked="true"] {
                            background-color: var(--color-primary, #0000);
                            box-shadow: 0 0 #0000 inset, 0 8px 0 -4px oklch(100% 0 0 / 0) inset, 0 1px oklch(0% 0 0 / 0);

                            &:before {
                                   clip-path: polygon(20% 100%, 20% 80%, 50% 80%, 50% 0%, 70% 0%, 70% 100%);
                                   opacity: 100%;
                            }

                            @media (forced-colors: active) {
                                   &:before {
                                          rotate: 0deg;
                                          background-color: transparent;
                                          --tw-content: "✔︎";
                                          clip-path: none;
                                   }
                            }
                     }

                     &:indeterminate {
                            &:before {
                                   rotate: 0deg;
                                   opacity: 100%;
                                   translate: 0 -35%;
                                   clip-path: polygon(20% 100%, 20% 80%, 50% 80%, 50% 80%, 80% 80%, 80% 100%);
                            }
                     }

                     &:disabled {
                            cursor: not-allowed;
                            opacity: 20%;
                     }
              }
       }


}
</style>
