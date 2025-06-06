<template>
    <div ref="sliderContainer" @mousemove="onMouseMove" @mouseup="onMouseUp" @mouseleave="onMouseLeave"
        class="relative w-full h-14 border-2 border-info text-info text-center leading-[56px] select-none overflow-hidden rounded-box">
        <span class="z-10 relative">请按住滑块，拖动到最右边</span>
        <div @mousedown="onMouseDown" :style="{ left: leftP }"
            class="absolute w-14 h-full top-[-1px] bg-base-100 border-2 border-info cursor-grab bg-center bg-no-repeat bg-[length:50%]"
            :class="{
                'bg-[url(@/assets/images/login6/arrow.png)]': blockState !== 2,
                '!cursor-auto': blockState === 2
            }" />
        <!-- 移除 transition 属性，背景色直接填充 -->
        <div :style="{ width: leftP }" class="absolute h-full left-0 top-0 bg-info/30">
            <span v-if="blockState === 2" class="text-info-content">验证成功</span>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits, onMounted } from "vue";

const emit = defineEmits(["success", "failed"]);
const leftP = ref("0"); // 滑块和背景填充的宽度
const blockState = ref(0); // 滑块状态：0-初始，1-拖动中，2-验证成功
const startP = ref(undefined); // 鼠标按下的初始位置
const sliderContainer = ref(null); // 滑块容器的 DOM 元素
const containerWidth = ref(0); // 滑块容器的宽度

// 获取滑块容器的宽度
const updateContainerWidth = () => {
    if (sliderContainer.value) {
        containerWidth.value = sliderContainer.value.offsetWidth;
    }
};

// 组件挂载时更新容器宽度
onMounted(() => {
    updateContainerWidth();
    window.addEventListener("resize", updateContainerWidth); // 监听窗口大小变化
});

// 鼠标按下事件
const onMouseDown = (e) => {
    if (blockState.value !== 2) {
        leftP.value = "0";
        blockState.value = 1;
        startP.value = { clientX: e.clientX };
    } else {
        leftP.value = "0";
        blockState.value = 0;
    }
};

// 鼠标移动事件
const onMouseMove = (e) => {
    if (blockState.value === 1) {
        const width = e.clientX - startP.value.clientX; // 计算滑块的偏移量
        const maxWidth = containerWidth.value - 56; // 最大偏移量（容器宽度减去滑块宽度）

        if (width >= maxWidth) {
            leftP.value = `${maxWidth}px`; // 滑块移动到最右侧
            blockState.value = 2;
            emit("success"); // 触发成功事件
        } else {
            leftP.value = `${width}px`; // 更新滑块位置
        }
    }
};

// 鼠标松开事件
const onMouseUp = (e) => {
    if (blockState.value !== 2) {
        leftP.value = "0";
        blockState.value = 0;
        emit("failed"); // 触发失败事件
    }
};

// 鼠标离开事件
const onMouseLeave = (e) => {
    if (blockState.value !== 2) {
        leftP.value = "0";
        blockState.value = 0;
        emit("failed"); // 触发失败事件
    }
};
</script>