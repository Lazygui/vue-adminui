<script setup lang="ts">
import Icon from "@svg";
type InputType = "text" | "password" | "textarea";
const props = withDefaults(
       defineProps<{
              label: string;
              labelPost?: "top" | "left";
              icon?: string;
              type?: InputType;
              placeholder?: string;
              modelValue?: string;
              required?: boolean;
              disabled?: boolean;
              activeColor?: "primary" | "error" | "success" | "warning";
              inputClass?: string
       }>(),
       {
              labelPost: "top",
              type: "text",
              modelValue: "",
              required: false,
              disabled: false,
              inputClass: ''
       }
);
const emit = defineEmits<{
       (e: "update:modelValue", el: string): void;
}>();
</script>

<template>
       <div class="z-input">
              <label class="block text-sm font-medium text-base-content/90 w-full"
                     :class="{ 'label-top': labelPost === 'top', 'label-left': labelPost === 'left' }">
                     {{ props.label }}
                     <div class="mt-2 input input-primary block w-full  border border-base-content/20"
                            :class="`${props.icon ? 'pl-10' : ''} ${props.inputClass}`">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                                   v-if="props.icon">
                                   <Icon :name="props.icon" class="icon" :is-show="false"></Icon>
                            </div>
                            <input :type="props.type" :required="props.required" :placeholder="props.placeholder"
                                   :autocomplete="type === 'password' ? 'off' : 'on'" :value="props.modelValue"
                                   @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
                                   :disabled="props.disabled" />
                     </div>
              </label>
       </div>
</template>

<style scoped lang="scss">
.z-input {
       margin-block-end: 1.5rem;

       .label {
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
       }
}
</style>
