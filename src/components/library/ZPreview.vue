<template>
    <div class="z-preview" :class="props.class">
        <div class="flex items-center gap-2 pb-3 text-sm font-bold">
            <h4 class="component-preview-title mt-2 mb-1 text-lg font-semibold">{{ props.title }}</h4>
        </div>
        <div class="tabs tabs-lift">
            <input type="radio" class="tab [--tab-p:.75rem]" aria-label="预览" checked />
            <div class="tab-content border-base-300 overflow-x-auto">
                <div
                    class="preview bg-base-100 relative flex min-h-[6rem] max-w-4xl min-w-[18rem] flex-wrap items-center justify-center gap-2 overflow-x-hidden bg-cover bg-top p-4 xl:py-10">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
const props = withDefaults(defineProps<{
    code: string
    title: string
    class?: string
}>(), {
    class: ''
})
</script>
<style scoped lang="scss">
.z-preview {
    .preview {
        box-shadow: 0 0 0 1px var(--color-base-100) inset;
        background-image: repeating-linear-gradient(-45deg,
                var(--color-base-100),
                var(--color-base-100) 13px,
                var(--color-base-200) 13px,
                var(--color-base-200) 14px);
        background-size: 40px 40px;
        box-sizing: border-box;
    }

    .code-wrapper {
        border-radius: var(--radius-box);

        :deep() {
            .tag {
                color: white !important;
            }

            .name {
                color: #79b8ff !important;
            }

            .attr-value {
                color: #9ccc65 !important;
            }

            .class-value {
                color: #b392f0 !important;
            }
        }
    }



    /* class值（紫色） */
}
</style>
