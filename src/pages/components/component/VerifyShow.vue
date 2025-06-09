<template>
    <div class="VerifyShow w-full h-full">
        <z-preview id="1" title="图形验证器" :code="baseCode">
            <template #illustrate>
                <p>你可以使用 input 组件的 v-model 值来关联图形验证器。</p>
            </template>
            <div class="w-full h-full flex justify-center items-center">
                <z-verify v-model="graphic"></z-verify>
            </div>
        </z-preview>
        <z-preview id="2" title="滑块验证器" :code="coverCode" class="mt-10">
            <template #illustrate>
                <p>你可以使用 input 组件的 v-model 值来关联图形验证器。</p>
            </template>
            <div class="w-full h-full">
                <z-verify v-model="slider" type="slider"></z-verify>
            </div>
        </z-preview>
    </div>
</template>
<script lang="ts" setup>
import ZPreview from "@/components/library/ZPreview.vue"
import ZVerify from "@/components/library/ZVerify.vue"
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
