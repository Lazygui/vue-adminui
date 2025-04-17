<script setup lang="ts">
import type { Component } from 'vue'
type InputType = 'text' | 'password' | 'checkbox'
const props = withDefaults(defineProps<{
       label: string
       labelPost?: 'top' | 'left'
       icon?: Component
       type?: InputType
       placeholder?: string
       modelValue?: any
       required?: boolean
}>(), {
       labelPost: 'top',
       type: 'text',
       modelValue: '',
       required: false
})
const emit = defineEmits<{
       (e: 'update:modelValue', el: string): void,
}>()
</script>

<template>
       <div class="z-input">
              <label class="label" :class="{ 'label-top': labelPost === 'top', 'label-left': labelPost === 'left' }"
                     v-if="props.type === 'text' || props.type === 'password'">
                     {{ props.label }}
                     <div class="input-Iocn border block input">
                            <div class="inputIcon" v-show="props.icon">
                                   <component :is="props.icon" class="icon"></component>
                            </div>
                            <input :type="props.type" :required="props.required" :placeholder="props.placeholder"
                                   :autocomplete="type === 'password' ? 'off' : 'on'" :value="props.modelValue"
                                   @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
                     </div>
              </label>
              <label v-else-if="props.type === 'checkbox'" class="label-checkbox block">
                     <input class="checkbox" :type="props.type" :required="props.required"
                            :placeholder="props.placeholder" :value="props.modelValue"
                            @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
                     {{ props.label }}
              </label>
       </div>
</template>

<style scoped lang="scss">
.z-input {
       margin-block-end: 1.5rem;
       width: 100%;
       --size: calc(var(--size-selector, 0.25rem) * 5);

       .label {
              width: 100%;
              font-size: 0.875rem;
              line-height: calc(1.25 / 0.875);
              font-weight: 500;
              color: color-mix(in oklab, var(--color-base-content) 90%, transparent);

              &-top {
                     display: block;

                     .input {
                            margin-top: 0.5rem;
                     }
              }

              &-left {
                     display: inline-flex;
                     align-items: center;
                     gap: 0.5rem;
                     white-space: nowrap;

                     .input {
                            margin-top: 0;
                     }
              }

              .input-Iocn {

                     .inputIcon {
                            pointer-events: none;
                            display: flex;
                            align-items: center;
                            justify-content: center;

                            .icon {
                                   height: 1.25rem;
                                   width: 1.25rem;
                                   color: color-mix(in oklab, var(--color-base-content) 90%, transparent);
                            }
                     }
              }

              .border {
                     border-style: solid;
                     border-width: 1px;
                     padding-left: 2.5rem; //pl-10
                     box-sizing: border-box;
                     border-color: color-mix(in oklab, var(--color-base-content) 20%, transparent);
              }

              input {
                     width: 100%;
              }

              .input {
                     cursor: text;
                     position: relative;
                     display: inline-flex;
                     flex-shrink: 1;
                     appearance: none;
                     align-items: center;
                     gap: calc(0.25rem * 2);
                     background-color: var(--color-base-100);
                     padding-inline: calc(0.25rem * 3);
                     vertical-align: middle;
                     white-space: nowrap;
                     width: 100%;
                     height: var(--size);
                     font-size: inherit;
                     border-start-start-radius: 0.5rem;
                     border-start-end-radius: 0.5rem;
                     border-end-start-radius: 0.5rem;
                     border-end-end-radius: 0.5rem;
                     box-shadow: 0 1px color-mix(in oklab, var(--color-primary) calc(0 * 10%), #0000) inset, 0 -1px oklch(100% 0 0 / calc(0 * 0.1)) inset;
                     --size: calc(var(--size-field, 0.25rem) * 10);



                     &:focus-within {
                            box-shadow: 0 1px color-mix(in oklab, var(--color-primary) calc(0* 10%), #0000);
                            outline: 2px solid var(--color-primary);
                            outline-offset: 2px;
                            isolation: isolate;
                     }

              }

              input {
                     border: none;

                     &:focus {
                            outline: none;
                     }
              }
       }

       //多选框样式
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
