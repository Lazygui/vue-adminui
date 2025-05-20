<template>
    <div class="z-preview" :class="props.class">
        <div class="flex items-center gap-2 pb-3 text-sm font-bold">
            <h4 class="component-preview-title mt-2 mb-1 text-lg font-semibold">{{ props.title }}</h4>
        </div>
        <div class="tabs tabs-lift ">
            <input type="radio" class="tab [--tab-p:.75rem]" aria-label="预览" checked
                :name="`preview_tab_${props.id}`" />
            <div class="tab-content border-base-300 overflow-x-auto">
                <div
                    class="preview min-h-[6rem] bg-base-100 relative flex flex-wrap items-center justify-center gap-2 overflow-x-hidden bg-cover bg-top p-4 xl:py-10">
                    <slot></slot>
                </div>
            </div>
            <template v-if="props.code">
                <input type="radio" :name="`preview_tab_${props.id}`"
                    class="tab checked:text-neutral-content border-b-transparent! checked:[--tab-bg:var(--color-neutral)] checked:[--tab-border-color:var(--color-base-100)]"
                    aria-label="HTML">
                <div class="tab-content">
                    <div class="code-wrapper">
                        <div v-for="(item) in props.code">
                            <PreviewCode :code="item"></PreviewCode>
                        </div>
                    </div>
                </div>
            </template>

        </div>
    </div>
</template>
<script lang="ts" setup>
import PreviewCode from "./children/PreviewCode.vue"
const props = withDefaults(defineProps<{
    id: string
    code?: string[]
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
        background-color: var(--color-neutral);
        border-radius: var(--radius-box);
        direction: ltr;
        min-height: 7.5rem;
        max-height: 24rem;
        padding: .75rem 1rem;
        font-size: .8125rem;
    }
}
</style>
