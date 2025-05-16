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
    escape?: boolean

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
    escape: true,
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
    if (props.escape) {
        useEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === 'Escape' || e.keyCode === 27) {
                emit('update:modelValue', false)
            }
        })
    }

})
</script>
<template>
    <transition name="zmodal">
        <div class="z-modal" v-show="modelValue">
            <div class="modal-body">
                <div class="w-full" :class="props.headerClass">
                    <div v-if="!!slot.header">
                        <slot name="header"></slot>
                    </div>
                    <h3 class="font-bold text-lg" v-else>{{ props.title }}</h3>
                </div>
                <div class="py-4">
                    <slot></slot>
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
    </transition>
</template>
<style lang="scss" scoped>
.z-modal {
    pointer-events: auto;
    visibility: visible;
    opacity: 1;
    text-align: initial;
    background-color: oklch(0% 0 0 / 0.6); // 初始透明
    position: fixed;
    inset: 0;
    display: grid;
    align-items: center;
    justify-items: center;
    overflow: hidden;
    z-index: 999;
    transition: background-color 0.3s ease 0.1s; // 背景色动画，延迟 0.1s
}

.modal-body {
    grid-column-start: 1;
    grid-row-start: 1;
    max-height: 100vh;
    width: 100%;
    max-width: 32rem;
    background-color: var(--color-base-100);
    padding: calc(0.25rem * 6);
    border-top-left-radius: var(--radius-box);
    border-top-right-radius: var(--radius-box);
    border-bottom-left-radius: var(--radius-box);
    border-bottom-right-radius: var(--radius-box);
    box-shadow: oklch(0% 0 0 / 0.25) 0px 25px 50px -12px;
    overflow: hidden;
    transform: translateY(0); // 初始位置在顶部
    opacity: 1; // 初始透明度为 0
    transition: transform 0.3s ease, opacity 0.3s ease; // 位置和透明度动画
}

.zmodal-enter-active .modal-body,
.zmodal-leave-active .modal-body {
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.zmodal-leave-active,
.zmodal-enter-active {
    transition: background-color 0.3s ease 0.1s;
}

// 离开动画的结束
.zmodal-leave-to,
//进入动画的开始
.zmodal-enter-from {
    background-color: oklch(0% 0 0 / 0); // 背景色渐变到目标值
}

//进入动画的结束
.zmodal-enter-to {
    background-color: oklch(0% 0 0 / 0.6); // 背景色渐变到目标值
}

.zmodal-leave-to .modal-body,
.zmodal-enter-from .modal-body {
    transform: translateY(-100%); // 从顶部移动到正常位置
    opacity: 0; // 透明度渐变到 1
}

.zmodal-enter-to .modal-body {
    transform: translateY(0); // 从顶部移动到正常位置
    opacity: 1; // 透明度渐变到 1
}
</style>