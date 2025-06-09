<template>
    <div class="VerifyShow w-full h-full">
        <z-preview id="1" title="图形验证器" :code="baseCode">
            <template #illustrate>
                <p class="mb-4">你可以使用 input 组件的 v-model 值来关联图形验证器。</p>
            </template>
            <div class="w-full h-full flex justify-center items-center">
                <z-verify v-model="graphic"></z-verify>
            </div>
        </z-preview>
        <z-preview id="2" title="滑块验证器" :code="coverCode" class="mt-10">
            <template #illustrate>
                <p class="mb-4">你可以使用 input 组件的 v-model 值来关联图形验证器。</p>
            </template>
            <div class="w-full h-full">
                <z-verify v-model="slider" type="slider"></z-verify>
            </div>
        </z-preview>
        <div>
            <h4 id="verify-api" class="text-xl font-black mt-10" tabindex="-1">Verify 属性 <a
                    class="header-anchor vp-link" href="#button-api"
                    aria-label="Permalink to &quot;Button API&quot;">&ZeroWidthSpace;</a></h4>
            <z-table :data="tableAPI" row-key="tableId" :columns="[
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
        <div>
            <h4 id="verify-event" class="text-xl font-black mt-10" tabindex="-1">Verify 事件 <a
                    class="header-anchor vp-link" href="#button-api"
                    aria-label="Permalink to &quot;Button API&quot;">&ZeroWidthSpace;</a></h4>
            <z-table class="pb-6" :data="tableEvent" row-key="tableId" :columns="[
                {
                    title: '事件名',
                    key: 'name',
                    className: 'w-48'
                },
                {
                    title: '说明',
                    key: 'illustrate'
                }, {
                    title: '类型',
                    key: 'type'
                }
            ]">
            </z-table>
        </div>
    </div>
</template>
<script lang="ts" setup>
import ZPreview from "@/components/library/ZPreview.vue"
import ZVerify from "@/components/library/ZVerify.vue"
import ZTable from "@/components/library/ZTable.vue"
const graphic = ref<string>('')
const slider = ref<boolean>(false)
const baseCode = [
    {
        row: ' <z-verify v-model="graphic"></z-verify>',
        rowStyle: {
            white: ['<z-verify', '</z-verify>', '>'],
            text: [],
            propertyNmae: ['v-model'],
            propertyValue: ['graphic']
        }
    }
]
const coverCode = [
    {
        row: ' <z-verify v-model="slider" type="slider"></z-verify>',
        rowStyle: {
            white: ['<z-verify', '</z-verify>', '>'],
            text: [],
            propertyNmae: ['v-model', 'type'],
            propertyValue: ['slider', 'slider']
        }
    }
]
const tableAPI = [
    {
        name: 'v-model',
        illustrate: '绑定值，图形验证器需绑定输入框的v-model联动',
        type: 'string | boolean',
        default: ''

    },
    {
        name: 'type',
        illustrate: '验证器的类型：图形验证器 | 滑块验证器',
        type: 'graphic | slider',
        default: 'graphic'
    }, {
        name: 'width',
        illustrate: '(可选) 宽度，滑动验证器受父级元素影响此属性无效',
        type: 'number',
        default: '120px'
    }, {
        name: 'height',
        illustrate: '(可选) 高度',
        type: 'number',
        default: '40px'
    }, {
        name: 'duration',
        illustrate: '(可选) 动画持续时间，图形验证器此属性无效',
        type: 'number',
        default: '800ms'
    }
]
const tableEvent = [
    {
        name: 'success',
        illustrate: '验证成功',
        type: '() => void'
    }, {
        name: 'failed',
        illustrate: '验证失败',
        type: '() => void'
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
