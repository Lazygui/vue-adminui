<template>
    <div class="flex items-center space-x-2 mt-4 justify-end">
        <!-- 上一页按钮 -->
        <button :class="['join-item btn btn-square', sizeClass]" :disabled="currentPage === 1"
            @click="goToPreviousPage">
            &lt;
        </button>

        <!-- 页码按钮 -->
        <template v-for="page in visiblePages" :key="page">
            <button v-if="page === '...'" :class="['join-item btn btn-square', sizeClass]" disabled>
                {{ page }}
            </button>
            <button v-else
                :class="['join-item btn btn-square', sizeClass, { 'btn-active': page === currentPage, 'btn-primary': page === currentPage }]"
                @click="goToPage(page)">
                {{ page }}
            </button>
        </template>

        <!-- 下一页按钮 -->
        <button :class="['join-item btn btn-square', sizeClass]" :disabled="currentPage === totalPages"
            @click="goToNextPage">
            &gt;
        </button>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = withDefaults(defineProps<{
    modelValue: number
    total: number
    pageSize?: number
    size?: 'sm' | 'md' | 'lg'
}>(), {
    size: 'sm',
    pageSize: 10
})

const emit = defineEmits(['update:modelValue']);
const sizeClass = computed(() => {
    switch (props.size) {
        case 'sm':
            return 'btn-sm';
        case 'md':
            return 'btn-md';
        case 'lg':
            return 'btn-lg';
        default:
            return 'btn-sm';
    }
});
const currentPage = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
});

const totalPages = computed(() =>
    Math.ceil(props.total / props.pageSize)
);

const visiblePages = computed(() => {
    const pages: (number | string)[] = [];
    const total = totalPages.value;

    if (total <= 10) {
        // 如果总页数小于等于 10，展示所有页码
        for (let i = 1; i <= total; i++) {
            pages.push(i);
        }
    } else {
        // 如果总页数大于 10，固定展示 7 个按钮
        if (currentPage.value <= 4) {
            // 当前页在前 4 页时
            for (let i = 1; i <= 5; i++) {
                pages.push(i);
            }
            pages.push('...');
            pages.push(total);
        } else if (currentPage.value >= total - 3) {
            // 当前页在后 4 页时
            pages.push(1);
            pages.push('...');
            for (let i = total - 4; i <= total; i++) {
                pages.push(i);
            }
        } else {
            // 当前页在中间时
            pages.push(1);
            pages.push('...');
            for (let i = currentPage.value - 1; i <= currentPage.value + 1; i++) {
                pages.push(i);
            }
            pages.push('...');
            pages.push(total);
        }
    }

    return pages;
});

const goToPage = (page: number | string) => {
    if (typeof page === 'number') {
        currentPage.value = page;
    }
};

const goToPreviousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value -= 1;
    }
};

const goToNextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value += 1;
    }
};
</script>

<style scoped>
/* 可以在这里添加自定义样式 */
</style>