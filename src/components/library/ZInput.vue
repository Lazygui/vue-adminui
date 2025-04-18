<script setup lang="ts">
import type { Component } from 'vue'
type InputType = 'text' | 'password' | 'radio'
const props = withDefaults(defineProps<{
       label: string
       labelPost?: 'top' | 'left'
       icon?: Component
       type?: InputType
       placeholder?: string
       modelValue?: string
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
                            <input class="bg-transparent" :type="props.type" :required="props.required"
                                   :placeholder="props.placeholder" :autocomplete="type === 'password' ? 'off' : 'on'"
                                   :value="props.modelValue"
                                   @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
                     </div>
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
                            background-color: rgba(0, 0, 0, 0);
                     }
              }

              &-left {
                     display: inline-flex;
                     align-items: center;
                     gap: 0.5rem;
                     white-space: nowrap;

                     .input {
                            background-color: rgba(0, 0, 0, 0);
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


}
</style>
