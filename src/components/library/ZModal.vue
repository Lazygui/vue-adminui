<script lang="ts" setup>
import { useEventListener } from "@/hooks/useVue"
import { useSlots } from "vue";
const props = withDefaults(defineProps<{
    modelValue?: boolean;
    /**
     * 开启快捷键ESC键关闭模态框
     * @default true
     * @type  {boolean}
     */
    esc?: boolean

    /**
     * 模态框的标题， 也可通过具名 slot 
     * @type {string}
     */
    title?: string

    /**
     * header 部分的自定义 class 名
     * @type {string}
     */
    headerClass?: string
    /**
     * footer 部分的自定义 class 名
     * @type {string}
     */
    footerClass?: string
}>(), {
    modelValue: false,
    esc: true,
    title: '',
    headerClass: ''
})
const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
    (e: "confirm"): void
}>();
const slot = useSlots()
const modelValue = computed(() => props.modelValue);
const close = () => {
    emit('update:modelValue', false)
}
const confirm = () => {
    emit('confirm')
}
onMounted(() => {
    if (props.esc) {
        useEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === 'Escape' || e.keyCode === 27) {
                emit('update:modelValue', false)
            }
        })
    }

})
</script>
<template>
    <div class="z-modal" v-show="modelValue">
        <div class="modal-body modal-box">
            <div class="w-full" :class="props.headerClass">
                <div v-if="!!slot.header">
                    <slot name="header"></slot>
                </div>
                <h3 class="font-bold text-lg" v-else>{{ props.title }}</h3>
            </div>
            <div class="py-4">
                <input type="text" label="用户名" placeholder="用户名" />
            </div>
            <div class="modal-action box-border">
                <div v-if="!!slot.footer" :class="props.footerClass">
                    <slot name="footer"></slot>
                </div>
                <div v-else>
                    <button class="btn mr-4" @click="close">取消</button>
                    <button class="btn btn-primary" type="submit" @click="confirm">确认</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.z-modal {
    pointer-events: auto;
    visibility: visible;
    opacity: 1;
    text-align: initial;
    background-color: oklch(0% 0 0/ 0.4);
    position: fixed;
    inset: 0;
    display: grid;
    max-width: none;
    align-items: center;
    justify-items: center;
    padding: calc(0.25rem * 0);
    color: inherit;
    overflow: hidden;
    overscroll-behavior: contain;
    z-index: 999;

    .modal-body {
        opacity: 1;
        translate: 0;
        scale: 1;

    }

}
</style>