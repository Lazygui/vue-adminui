<template>
    <div class="ButtonShow w-full h-full grid lg:grid-cols-2 sm:grid-cols-1 gap-4">
        <z-preview id="1" title="带有关闭按钮的模态窗" :code="closeList">
            <z-button @click="openModal(1)">打开模态窗</z-button>
        </z-preview>
        <z-preview id="2" title="使用ESC按键关闭的模态窗" :code="EscList">
            <z-button @click="openModal(2)">打开模态窗</z-button>
        </z-preview>
        <z-modal v-model="modal1" title="Hello!" :escape="false">
            <span>请点击右上角 ✕ 按钮关闭模态窗</span>
            <template #footer></template>
        </z-modal>
        <z-modal v-model="modal2" title="Hello!" :show-close="false">
            <span>请按下键盘左上角ESC按键关闭模态窗</span>
            <template #footer></template>
        </z-modal>
    </div>
</template>
<script lang="ts" setup>
import ZModal from "@/components/library/ZModal.vue"
import ZPreview from "@/components/library/ZPreview.vue"
import ZButton from "@/components/library/ZButton.vue"
const modal1 = ref(false)
const modal2 = ref(false)
const openModal = (num: number) => {
    switch (num) {
        case 1:
            modal1.value = true
            break;
        case 2:
            modal2.value = true
            break;
    }
}
const closeList = [
    {
        row: '<z-button @click="modal=true">打开模态窗</z-button>',
        rowStyle: {
            white: ['<z-button', '</z-button>'],
            text: ['打开模态窗'],
            propertyNmae: ['@click'],
            propertyValue: ['modal=true']
        }
    },
    {
        row: '<z-modal v-model="modal" title="Hello!" :escape="false">\n    <span>请点击右上角 ✕ 按钮关闭模态窗</span>\n    <template #footer></template>\n</z-modal>',
        rowStyle: {
            white: ['<z-modal', '>', '<span>', '</span>', '<template', '</template>', '</z-modal>'],
            text: ['请请点击右上角 ✕ 按钮关闭模态窗'],
            propertyNmae: ['v-model', 'title', ':escape', '#footer'],
            propertyValue: ['modal', 'Hello!', 'false']
        }
    }
]
const EscList = [
    {
        row: '<z-button @click="modal=true">打开模态窗</z-button>',
        rowStyle: {
            white: ['<z-button', '</z-button>'],
            text: ['打开模态窗'],
            propertyNmae: ['@click'],
            propertyValue: ['modal=true']
        }
    }, {
        row: '<z-modal v-model="modal" title="Hello!" :show-close="false">\n    <span>请按下键盘左上角ESC按键关闭模态窗</span>\n    <template #footer></template>\n</z-modal>',
        rowStyle: {
            white: ['<z-modal', '>', '<span>', '</span>', '<template', '</template>', '</z-modal>'],
            text: ['请请点击右上角 ✕ 按钮关闭模态窗'],
            propertyNmae: ['v-model', 'title', '#footer', ':show-close'],
            propertyValue: ['modal', 'Hello!', 'false']
        }
    }
]
</script>
<style scoped lang="scss"></style>
