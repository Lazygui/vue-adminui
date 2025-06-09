<template>
    <div>
        <ImageVerify v-if="props.type === 'graphic'" :style="{ width: `${width}px`, height: `${height}px` }"
            ref="imageVerifyRef" />
        <SliderVerify v-else-if="props.type === 'slider'" @success="onSuccess" @failed="onFailed" />
    </div>
</template>

<script setup lang="ts">
import ImageVerify from './children/ImageVerify.vue';
import SliderVerify from './children/SliderVerify.vue';

// 使用 TypeScript 定义 props
const props = withDefaults(defineProps<{
    type?: 'graphic' | 'slider'; // 验证器类型
    width?: number; // 图形验证器的宽度
    height?: number; // 图形验证器的高度
    modelValue: string | boolean; // v-model 绑定的值
}>(), {
    type: 'graphic',
    width: 120,
    height: 40,
    modelValue: '',
});

// 定义 emits
const emit = defineEmits<{
    (e: 'update:modelValue', value: string | boolean): void;
    (e: 'success'): void;
    (e: 'failed'): void;
}>();

// 根据验证器类型处理 v-model
const imageVerifyRef = ref<InstanceType<typeof ImageVerify> | null>(null);


// 滑块验证成功事件处理
const onSuccess = () => {
    emit('success');
    const model = props.type === 'graphic' ? props.modelValue : true
    emit('update:modelValue', model);
};

// 滑块验证失败事件处理
const onFailed = () => {
    emit('failed');
    const model = props.type === 'graphic' ? '' : false
    emit('update:modelValue', model);
};
onMounted(() => {
    if (props.type === 'graphic' && imageVerifyRef.value) {
        watch(() => props.modelValue, (newValue) => {
            useDebounce(() => {
                const iscode = imageVerifyRef.value?.isCodeValid(newValue as string);
                iscode ? onSuccess() : onFailed();
            }, 500)
        });
    }
});
</script>

<style scoped>
/* 可以根据需要添加样式 */
</style>