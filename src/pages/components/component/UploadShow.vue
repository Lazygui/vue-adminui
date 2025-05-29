<template>
    <div class="ButtonShow w-full h-full grid lg:grid-cols-2 sm:grid-cols-1 gap-4">
        <z-preview id="1" title="拖拽文件上传">
            <z-upload v-model="filesList" drag multiple class="w-full h-full" @preview="preview">
                <template #tip>
                    11111
                </template>
            </z-upload>
        </z-preview>
    </div>
</template>
<script lang="ts" setup>
import ZPreview from "@/components/library/ZPreview.vue"
import ZUpload from "@/components/library/ZUpload.vue"
const filesList = ref([])
// const closeList = [
//     {
//         row: '<z-button @click="modal=true">打开模态窗</z-button>',
//         rowStyle: {
//             white: ['<z-button', '</z-button>'],
//             text: ['打开模态窗'],
//             propertyNmae: ['@click'],
//             propertyValue: ['modal=true']
//         }
//     },
//     {
//         row: '<z-modal v-model="modal" title="Hello!" :escape="false">\n    <span>请点击右上角 ✕ 按钮关闭模态窗</span>\n    <template #footer></template>\n</z-modal>',
//         rowStyle: {
//             white: ['<z-modal', '>', '<span>', '</span>', '<template', '</template>', '</z-modal>'],
//             text: ['请请点击右上角 ✕ 按钮关闭模态窗'],
//             propertyNmae: ['v-model', 'title', ':escape', '#footer'],
//             propertyValue: ['modal', 'Hello!', 'false']
//         }
//     }
// ]
const preview = (file: any) => {
    console.log("🚀 ~ preview ~ file:", file)

}
</script>
<style scoped lang="scss">
.upload-icon {
    height: 1em;
    width: 1em;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    fill: currentColor;
    font-size: 67px;
    color: #a8abb2;
    margin-bottom: 16px;
    line-height: 50px;
}
</style>
