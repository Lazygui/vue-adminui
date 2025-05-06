<script setup lang="ts">
import Icon from "@svg";
type InputType = "text" | "password" | "radio";
const props = withDefaults(
       defineProps<{
              label: string;
              labelPost?: "top" | "left";
              icon?: string;
              type?: InputType;
              placeholder?: string;
              modelValue?: string;
              required?: boolean;
       }>(),
       {
              labelPost: "top",
              type: "text",
              modelValue: "",
              required: false
       }
);
const emit = defineEmits<{
       (e: "update:modelValue", el: string): void;
}>();
</script>

<template>
       <div class="z-input">
              <label
                     class="block text-sm font-medium text-base-content/90 w-full"
                     :class="{ 'label-top': labelPost === 'top', 'label-left': labelPost === 'left' }"
                     v-if="props.type === 'text' || props.type === 'password'"
              >
                     {{ props.label }}
                     <div className="mt-2 input input-primary block w-full pl-10 border border-base-content/20">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" v-if="props.icon">
                                   <Icon :name="props.icon" class="icon" :is-show="false"></Icon>
                            </div>
                            <input
                                   :type="props.type"
                                   :required="props.required"
                                   :placeholder="props.placeholder"
                                   :autocomplete="type === 'password' ? 'off' : 'on'"
                                   :value="props.modelValue"
                                   @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
                            />
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
