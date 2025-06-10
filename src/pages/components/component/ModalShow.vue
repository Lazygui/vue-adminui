<template>
    <div class="ButtonShow w-full pb-6 box-border">
        <z-preview id="1" title="带有关闭按钮的模态窗" :code="closeList">
            <z-button @click="openModal(1)">打开模态窗</z-button>
        </z-preview>
        <z-preview id="2" title="使用ESC按键关闭的模态窗" :code="EscList">
            <z-button @click="openModal(2)">打开模态窗</z-button>
        </z-preview>
        <z-preview id="3" title="自定义底部操作区" :code="footerList">
            <z-button @click="openModal(3)">打开模态窗</z-button>
        </z-preview>
        <div>
            <h4 id="modal-api" class="text-xl font-black mt-10" tabindex="-1">Modal 属性 <a class="header-anchor vp-link"
                    aria-label="Permalink to &quot;Modal API&quot;">&ZeroWidthSpace;</a>
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
        <div>
            <h4 id="modal-event" class="text-xl font-black mt-10" tabindex="-1">Modal 事件 <a
                    class="header-anchor vp-link" aria-label="Permalink to &quot;Modal Event&quot;">&ZeroWidthSpace;</a>
            </h4>
            <z-table :data="tableEvent" row-key="name" :columns="[
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
        <div>
            <h4 id="modal-slot" class="text-xl font-black mt-10" tabindex="-1">Modal Slot <a
                    class="header-anchor vp-link" aria-label="Permalink to &quot;Modal Slot&quot;">&ZeroWidthSpace;</a>
            </h4>
            <z-table :data="tableSlot" row-key="name" :columns="[
                {
                    title: '插槽名',
                    key: 'name',
                    className: 'w-48'
                },
                {
                    title: '说明',
                    key: 'illustrate'
                }
            ]">
            </z-table>
        </div>
        <z-modal v-model="modal1" title="Hello!" :escape="false">
            <span>请点击右上角 ✕ 按钮关闭模态窗</span>
        </z-modal>
        <z-modal v-model="modal2" title="Hello!" :show-close="false">
            <span>请按下键盘左上角ESC按键关闭模态窗</span>
        </z-modal>
        <z-modal v-model="modal3" title="Hello!" :show-close="false">
            <span>请点击右下角关闭按钮</span>
            <template #footer>
                <z-button @click="modal3 = false">关闭</z-button>
            </template>
        </z-modal>
    </div>
</template>
<script lang="ts" setup>
import ZModal from "@/components/library/ZModal.vue"
import ZPreview from "@/components/library/ZPreview.vue"
import ZButton from "@/components/library/ZButton.vue"
import ZTable from "@/components/library/ZTable.vue"
const modal1 = ref(false)
const modal2 = ref(false)
const modal3 = ref(false)
const openModal = (num: number) => {
    switch (num) {
        case 1:
            modal1.value = true
            break;
        case 2:
            modal2.value = true
            break;
        case 3:
            modal3.value = true
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
const footerList = [
    {
        row: '<z-button @click="modal=true">打开模态窗</z-button>',
        rowStyle: {
            white: ['<z-button', '</z-button>'],
            text: ['打开模态窗'],
            propertyNmae: ['@click'],
            propertyValue: ['modal=true']
        }
    }, {
        row: '<z-modal v-model="modal" title="Hello!" :show-close="false">\n    <span>请点击右下角关闭按钮</span>\n    <template #footer>\n        <z-button @click="modal = false">关闭</z-button>\n    </template>\n</z-modal>',
        rowStyle: {
            white: ['<z-modal', '>', '<span>', '</span>', '<template', '</template>', '</z-modal>', '<z-button', '</z-button>'],
            text: ['请点击右下角关闭按钮', '关闭'],
            propertyNmae: ['v-model', 'title', '#footer', ':show-close', '@click'],
            propertyValue: ['modal', 'Hello!', 'false', 'modal = false']
        }
    }
]
const tableAPI = [
    {
        name: 'v-model',
        illustrate: '是否显示模态窗',
        type: 'boolean',

    }, {
        name: 'escape',
        illustrate: '（可选）是否启用Esc键关闭模态窗',
        type: 'boolean',
        default: 'false'
    }, {
        name: 'title',
        illustrate: '（可选）模态窗标题，也可通过具名 slot 修改，优先级 小于 slot',
        type: 'string',
        default: ''
    }, {
        name: 'headerClass',
        illustrate: '（可选）模态窗标题类名',
        type: 'string',
        default: ''
    }, {
        name: 'footerClass',
        illustrate: '（可选）模态窗底部类名',
        type: 'string',
        default: ''
    }, {
        name: 'showClose',
        illustrate: '（可选）是否显示关闭按钮',
        type: 'boolean',
        default: 'true'
    }
]
const tableEvent = [
    {
        name: 'confirm',
        illustrate: '确认',
        type: '() => void'
    }
]
const tableSlot = [
    {
        name: 'header',
        illustrate: '模态窗标题，优先级 大于 属性 title',
    },
    {
        name: 'footer',
        illustrate: '模态窗底部',
    }
]
</script>
<style scoped lang="scss"></style>
