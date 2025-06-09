<template>
    <!-- 滑块轨道 -->
    <div class="slider-track w-full h-10" ref="track">
        <!-- 背景层 -->
        <div class="slider-background" :style="backgroundStyle">
        </div>
        <div class="slider-tip" v-if="state === 0">
            请按住滑块，拖动到最右边
        </div>
        <!-- 滑块 -->
        <div class="slider-thumb w-10 h-full" :class="thumbClass" :style="thumbStyle" @mousedown="startDrag"
            @mouseenter="isHover = true" @mouseleave="isHover = false" @transitionend="onTransitionEnd">
            <z-icon :name="iconComponent" class="size-6"></z-icon>
        </div>
    </div>
</template>

<script setup lang="ts">
import ZIcon from "@svg"
import { ref, computed, withDefaults } from 'vue';
const props = withDefaults(defineProps<{
    duration?: number
}>(), {
    duration: 800
})

// 滑块状态
type SliderState = 0 | 1 | 2 | 3;

// 组件逻辑
const track = ref<HTMLElement | null>(null); // 滑块轨道
const thumbPosition = ref(0); // 滑块位置
const isDragging = ref(false); // 是否正在拖动
const isHover = ref(false); // 鼠标是否悬停在滑块上
const state = ref<SliderState>(0); // 滑块状态

// 计算滑块的样式
const thumbStyle = computed(() => ({
    left: `${thumbPosition.value}px`,
    // 失败状态保持当前位置时不应用过渡
    transition: state.value === 3 && thumbPosition.value !== 0
        ? "none"
        : state.value === 1
            ? "none"
            : `left ${props.duration}ms linear 0.5s` // 使用传入的过渡时长
}));
const thumbClass = computed(() => ({
    'slider-thumb-hover': isHover.value || isDragging.value,
    'slider-thumb-success': state.value === 2,
    'slider-thumb-fail': state.value === 3,
}));

const iconComponent = computed(() => {
    const icons = {
        0: 'ArrowRight',
        1: 'ArrowRight',
        2: 'Check',
        3: 'XMark',
    };
    return icons[state.value] || 'ArrowRight';
});

const backgroundStyle = computed(() => {
    const colors = {
        0: { bg: 'transparent', border: 'transparent' },
        1: { bg: '#d1e9fe', border: '#1991fa' },
        2: { bg: '#d2f4ef', border: '#52ccba' },
        3: { bg: '#fce1e1', border: '#f57a7a' },
    };
    const { bg, border } = colors[state.value];
    return {
        width: `${thumbPosition.value + 20}px`,
        backgroundColor: bg,
        border: `1px solid ${border}`,
        transition: (state.value === 3 && thumbPosition.value !== 0) || state.value === 1 ? 'none' : `width ${props.duration}ms linear 0.5s`,
    };
});
// 开始拖动
const startDrag = () => {
    // 新增状态判断
    if (state.value === 2 || state.value !== 0) return;
    isDragging.value = true;
    state.value = 1;
    // 修改鼠标移动事件处理逻辑
    const onMouseMove = (e: MouseEvent) => {
        if (!isDragging.value || !track.value) return;
        // 计算有效边界
        const trackRect = track.value.getBoundingClientRect();
        const maxPosition = track.value.clientWidth - 40;
        // 获取新位置
        const newPosition = e.clientX - trackRect.left;
        const clampedPosition = Math.max(0, Math.min(newPosition, maxPosition));
        // 实时检测是否到达终点
        if (clampedPosition >= maxPosition) {
            thumbPosition.value = maxPosition;
            state.value = 2;  // 立即变为绿色
            isDragging.value = false;  // 终止拖拽状态
            // 清除事件监听
            window.removeEventListener("mousemove", onMouseMove);
            return;
        }
        thumbPosition.value = clampedPosition;
    };
    // 修改mouseup事件处理逻辑
    const onMouseUp = () => {
        if (!isDragging.value) return;
        isDragging.value = false;
        if (!track.value) return;
        // 计算有效验证位置
        const validatePosition = track.value.clientWidth - 40;
        // 使用>=避免计算误差
        if (thumbPosition.value >= validatePosition) {
            state.value = 2; // 验证成功
        } else if (thumbPosition.value === 0) {
            state.value = 0
            return
        } else {
            state.value = 3; // 验证失败
            thumbPosition.value = 0;
        }
        //移除事件监听器
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    };
    // 添加事件监听器
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp, { once: true });
};

const onTransitionEnd = () => {
    state.value = 0;
};
</script>

<style scoped lang="scss">
.slider-track {
    position: relative;
    border: 1px solid;
    border-color:
        color-mix(in oklab, var(--color-base-content) 10%, transparent);
    background-color: var(--color-base-200);
    border-radius: 2px;
    overflow: hidden;



    .slider-background {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        border-radius: 2px;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .slider-thumb-success {
        transition: none !important;
    }

    .slider-thumb {
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 2px;
        cursor: pointer;
        box-shadow: 0 0 3px rgba(0, 0, 0, .3);
        background-color: var(--color-base-100);
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .slider-thumb-hover {
        background-color: #1991fa !important;
        color: rgb(255, 255, 255);
    }

    .slider-thumb-success {
        background-color: #52c41a !important;
        color: rgb(255, 255, 255);
    }

    .slider-thumb-fail {
        background-color: #f57a7a !important;
        color: rgb(255, 255, 255);
    }

    .slider-tip {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 14px;
        color: var(--color-text-regular);
        user-select: none;
        pointer-events: none;
        z-index: 3;
    }
}
</style>