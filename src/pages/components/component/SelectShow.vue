<template>
    <div class="ButtonShow w-full h-full grid lg:grid-cols-2 sm:grid-cols-1 gap-4">
        <z-preview id="1" title="基础用法" :code="baseCode" class="h-full">
            <div class="w-full h-full">
                <z-select v-model="baseSelect" :options="baseOptions" placeholder="请选择一个选项"></z-select>
            </div>
        </z-preview>
    </div>
</template>
<script lang="ts" setup>
import ZPreview from "@/components/library/ZPreview.vue"
import ZSelect from "@/components/library/ZSelect.vue"
const baseOptions = [
    '1', '2', '3', '4'
]
const baseSelect = ref<string[]>([])
const baseCode = [
    {
        row: '<z-upload v-model="filesList" drag class="w-full h-full">\n    <z-button type="primary">上传</z-button>\n    <template #tip>\n        jpg/png files with a size less than 500kb\n    </template>\n</z-upload>',
        rowStyle: {
            white: ['<z-upload', '</z-button>', '>', '<template', '</template>', '</z-upload>', '<z-button'],
            text: ['jpg/png files with a size less than 500kb'],
            propertyNmae: ['v-model', 'drag', 'class', '#tip', 'type',],
            propertyValue: ['filesList', 'w-full h-full', 'primary',]
        }
    }
]
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
