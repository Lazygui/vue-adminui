<template>
    <div class="z-preview">
        <div class="flex items-center gap-2 pb-3 text-sm font-bold">
            <h4 class="component-preview-title mt-2 mb-1 text-lg font-semibold">{{ props.title }}</h4>
        </div>
        <div class="tabs tabs-lift">
            <input type="radio" name="tab_75518a42-ce76-4975-a2b7-fbae9c4711b1" class="tab [--tab-p:.75rem]"
                aria-label="预览" checked />
            <div class="tab-content border-base-300 overflow-x-auto">
                <div
                    class="preview bg-base-100 relative flex min-h-[6rem] max-w-4xl min-w-[18rem] flex-wrap items-center justify-center gap-2 overflow-x-hidden bg-cover bg-top p-4 xl:py-10">
                    <slot></slot>
                </div>
            </div>
            <!-- <input type="radio" name="tab_75518a42-ce76-4975-a2b7-fbae9c4711b1"
                class="tab checked:text-neutral-content border-b-transparent! checked:[--tab-bg:var(--color-neutral)] checked:[--tab-border-color:var(--color-base-100)]"
                aria-label="Vue"  /> -->
            <!-- <div class="tab-content">
                <div class="grid *:[grid-area:1/1]">
                    <div class="code-wrapper">
                        <div v-html="highlightCode(props.code)"></div>
                    </div>
                    <div data-tip="copy"
                        class="tooltip tooltip-left tooltip-accent m-2 self-start [justify-self:right]">
                        <button class="btn btn-square btn-sm btn-neutral" aria-label="Copy to clipboard">
                            <svg class="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                <path
                                    d="M 16 3 C 14.742188 3 13.847656 3.890625 13.40625 5 L 6 5 L 6 28 L 26 28 L 26 5 L 18.59375 5 C 18.152344 3.890625 17.257813 3 16 3 Z M 16 5 C 16.554688 5 17 5.445313 17 6 L 17 7 L 20 7 L 20 9 L 12 9 L 12 7 L 15 7 L 15 6 C 15 5.445313 15.445313 5 16 5 Z M 8 7 L 10 7 L 10 11 L 22 11 L 22 7 L 24 7 L 24 26 L 8 26 Z">
                                </path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>
<script lang="ts" setup>
const props = withDefaults(defineProps<{
    code: string
    title: string
}>(), {

})
// const highlightCode = (html: string): string => {
//     const tagRegex = /(&lt;\/?)([\w-]+)(?=\s|>)/g; // 支持带连字符的标签
//     const attrRegex = /(\s+)([\w:-]+)(=)/g;       // 支持带冒号的属性名
//     const classValueRegex = /(class=(["']))([^"']+?)\2/g; // 精确匹配class值
//     const valueRegex = /(=(["']))([^"']+?)\2/g;  // 精确匹配属性值

//     return html
//         .replace(/</g, '&lt;')
//         .replace(/>/g, '&gt;')
//         .replace(tagRegex, '$1<span class="tag">$2</span>')
//         .replace(attrRegex, '$1<span class="name">$2</span>$3')
//         .replace(classValueRegex, '$1<span class="class-value">$3</span>$2')
//         .replace(valueRegex, '$1<span class="attr-value">$3</span>$2');
// };
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
        // background-color: var(--color-neutral);
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
