<template>
    <div class="ButtonShow w-full  pb-6 box-border">
        <z-preview id="1" title="基础用法" :code="baseCode" class="h-full">
            <div class="w-full h-full">
                <z-upload v-model="baseList">
                    <z-button type="primary">上传</z-button>
                    <template #tip>
                        jpg/png files with a size less than 500kb
                    </template>
                </z-upload>
            </div>
        </z-preview>
        <z-preview id="2" title="覆盖前一个文件" :code="coverCode" class="h-full">
            <div class="w-full h-full">
                <z-upload v-model="coverList" :limit="1" @exceed="exceed">
                    <z-button type="primary">上传</z-button>
                    <template #tip>
                        jpg/png files with a size less than 500kb
                    </template>
                </z-upload>
            </div>
        </z-preview>
        <z-preview id="3" title="拖拽文件上传" :code="dragCode">
            <div class="w-full h-full">
                <z-upload v-model="dragList" drag class="w-full h-full">
                    <template #tip>
                        jpg/png files with a size less than 500kb
                    </template>
                </z-upload>
            </div>
        </z-preview>
        <z-preview id="4" title="图片列表缩略图" :code="pictureCode">
            <z-upload v-model="showList" drag class="w-full h-full" list-type="picture">
                <template #tip>
                    jpg/png files with a size less than 500kb
                </template>
            </z-upload>
        </z-preview>
        <div>
            <h4 id="upload-api" class="text-xl font-black mt-10" tabindex="-1">Upload 属性 <a
                    class="header-anchor vp-link" aria-label="Permalink to &quot;Upload API&quot;">&ZeroWidthSpace;</a>
            </h4>
            <z-table :data="tableAPI" row-key="name" :columns="[
                {
                    title: '属性名',
                    key: 'name',
                    className: 'w-48'
                },
                {
                    title: '说明',
                    key: 'illustrate'
                }, {
                    title: '类型',
                    key: 'type'
                }, {
                    title: '默认值',
                    key: 'default'
                },
            ]">
            </z-table>
        </div>
    </div>
</template>
<script lang="ts" setup>
import ZPreview from "@/components/library/ZPreview.vue"
import ZUpload from "@/components/library/ZUpload.vue"
import ZButton from "@/components/library/ZButton.vue"
import ZTable from "@/components/library/ZTable.vue"
const baseList = ref([])
const coverList = ref<any[]>([])
const dragList = ref([])
const showList = ref([])
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
const coverCode = [
    {
        row: `<z-upload v-model="filesList" drag class="w-full h-full" :limit="1" @exceed="exceed">
    <z-button type="primary">上传</z-button>
    <template #tip>
        jpg/png files with a size less than 500kb
    </template>
</z-upload>`,
        rowStyle: {
            white: ['<z-upload', '</z-button>', '>', '<template', '</template>', '</z-upload>', '<z-button'],
            text: ['jpg/png files with a size less than 500kb'],
            propertyNmae: ['v-model', 'drag', 'class', '#tip', 'type', ':limit', '@exceed'],
            propertyValue: ['filesList', 'w-full h-full', 'primary', '1', 'exceed']
        }
    },
    {
        row: `function exceed(rawFile: any[]) {
    filesList.value = rawFile        
}`,
        rowStyle: {
            white: ['<z-upload', '</z-button>', '>', '<template', '</template>', '</z-upload>', '<z-button'],
            text: ['jpg/png files with a size less than 500kb'],
            propertyNmae: ['v-model', 'drag', 'class', '#tip', 'type', ':limit', '@exceed'],
            propertyValue: ['filesList', 'w-full h-full', 'primary', '1', 'exceed']
        }
    }
]
const dragCode = [
    {
        row: '<z-upload v-model="filesList" drag class="w-full h-full">\n    <template #tip>\n        jpg/png files with a size less than 500kb\n    </template>\n</z-upload>',
        rowStyle: {
            white: ['<z-upload', '>', '<template', '</template>', '</z-upload>'],
            text: ['jpg/png files with a size less than 500kb'],
            propertyNmae: ['v-model', 'drag', 'class', '#tip'],
            propertyValue: ['filesList', 'w-full h-full']
        }
    }
]
const pictureCode = [
    {
        row: '<z-upload v-model="filesList" drag class="w-full h-full" list-type="picture">\n    <template #tip>\n        jpg/png files with a size less than 500kb\n    </template>\n</z-upload>',
        rowStyle: {
            white: ['<z-upload', '>', '<template', '</template>', '</z-upload>'],
            text: ['jpg/png files with a size less than 500kb'],
            propertyNmae: ['v-model', 'drag', 'class', '#tip', 'list-type'],
            propertyValue: ['filesList', 'w-full h-full', 'picture']
        }
    }
]
const exceed = (rawFile: any[]) => {
    coverList.value = rawFile
    return true
}
const tableAPI = [
    {
        name: 'v-model',
        illustrate: '上传的文件列表',
        type: 'UploadUserFile[]',
        default: '[ ]'
    }, {
        name: 'limit',
        illustrate: '（可选）上传的数量限制',
        type: 'number',
    }, {
        name: 'drag',
        illustrate: '（可选）拖拽上传',
        type: 'boolean',
        default: 'false'
    }, {
        name: 'disabled',
        illustrate: '（可选）禁用上传',
        type: 'boolean',
        default: 'false'
    }, {
        name: 'multiple',
        illustrate: '（可选）文件多选',
        type: 'boolean',
        default: 'false'
    }, {
        name: 'onExceed',
        illustrate: '（可选）超出上传数量时的钩子',
        type: '(rawFile: UploadFile[]) => boolean',
    }, {
        name: 'onPreview',
        illustrate: '（可选）点击文件列表时的钩子',
        type: '(rawFile: UploadFile[]) => boolean',
    }, {
        name: 'onBeforeUpload',
        illustrate: '（可选）v-model 绑定值改变前的钩子',
        type: '(rawFile: UploadFile[]) => boolean',
    }, {
        name: 'listType',
        illustrate: '（可选）文件展示列表类型',
        type: 'text | picture',
        default: 'text'
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
