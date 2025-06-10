<template>
    <div class="ButtonShow w-full pb-6 box-border">
        <z-preview id="1" title="按钮颜色" :code="colorList">
            <z-button>Default</z-button>
            <z-button type="primary">Primary</z-button>
            <z-button type="error">Error</z-button>
            <z-button type="warning">Warning</z-button>
        </z-preview>
        <z-preview id="2" title="朴素按钮" :code="plainList">
            <z-button type="primary" plain>Primary</z-button>
            <z-button type="error" plain>Error</z-button>
            <z-button type="warning" plain>Warning</z-button>
        </z-preview>
        <z-preview id="3" title="虚线按钮" :code="dashList">
            <z-button dash>Default</z-button>
            <z-button type="primary" dash>Primary</z-button>
            <z-button type="error" dash>Error</z-button>
            <z-button type="warning" dash>Warning</z-button>
        </z-preview>
        <z-preview id="4" title="文字按钮" :code="linkList">
            <z-button type="primary" link>Primary</z-button>
            <z-button type="error" link>Error</z-button>
            <z-button type="warning" link>Warning</z-button>
        </z-preview>
        <z-preview id="5" title="加载按钮" :code="loadList">
            <z-button type="primary" loading>Primary</z-button>
            <z-button type="primary" plain loading>Primary</z-button>
            <z-button type="primary" dash loading>Primary</z-button>
            <z-button type="primary" link loading>Primary</z-button>
        </z-preview>
        <div>
            <h4 id="button-api" class="text-xl font-black mt-10" tabindex="-1">Button 属性 <a
                    class="header-anchor vp-link" aria-label="Permalink to &quot;Button API&quot;">&ZeroWidthSpace;</a>
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
            <h4 id="button-event" class="text-xl font-black mt-10" tabindex="-1">Button 事件 <a
                    class="header-anchor vp-link"
                    aria-label="Permalink to &quot;Button Event&quot;">&ZeroWidthSpace;</a></h4>
            <z-table class="pb-6" :data="tableEvent" row-key="name" :columns="[
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
import ZButton from "@/components/library/ZButton.vue"
import ZTable from "@/components/library/ZTable.vue"
const colorList = [
    {
        row: '<z-button>Default</z-button>',
        rowStyle: {
            white: ['<z-button>', '</z-button>'],
            text: ['Default'],
            propertyNmae: [],
            propertyValue: []
        }
    }, {
        row: '<z-button type="primary">Primary</z-button>',
        rowStyle: {
            white: ['<z-button', '>', '</z-button>'],
            text: ['Primary'],
            propertyNmae: ['type'],
            propertyValue: ['primary']
        }
    }, {
        row: '<z-button type="error">Error</z-button>',
        rowStyle: {
            white: ['<z-button', '>', '</z-button>'],
            text: ['Error'],
            propertyNmae: ['type'],
            propertyValue: ['error']
        }
    }, {
        row: '<z-button type="warning">Warning</z-button>',
        rowStyle: {
            white: ['<z-button', '>', '</z-button>'],
            text: ['Warning'],
            propertyNmae: ['type'],
            propertyValue: ['warning']
        }
    }
]
const plainList = [
    {
        row: '<z-button type="primary" plain>Primary</z-button>',
        rowStyle: {
            white: ['<z-button', '>', '</z-button>'],
            text: ['Primary'],
            propertyNmae: ['type', 'plain'],
            propertyValue: ['primary']
        }
    },
    {
        row: '<z-button type="error" plain>Error</z-button>',
        rowStyle: {
            white: ['<z-button', '>', '</z-button>'],
            text: ['Error'],
            propertyNmae: ['type', 'plain'],
            propertyValue: ['error']
        }
    },
    {
        row: '<z-button type="warning" plain>Warning</z-button>',
        rowStyle: {
            white: ['<z-button', '>', '</z-button>'],
            text: ['Warning'],
            propertyNmae: ['type', 'plain'],
            propertyValue: ['warning']
        }
    }
]

const dashList = [
    {
        row: '<z-button dash>Default</z-button>',
        rowStyle: {
            white: ['<z-button', '>', '</z-button>'],
            text: ['Default'],
            propertyNmae: ['dash'],
            propertyValue: []
        }
    }, {
        row: '<z-button type="primary" dash>Primary</z-button>',
        rowStyle: {
            white: ['<z-button', '>', '</z-button>'],
            text: ['Primary'],
            propertyNmae: ['type', 'dash'],
            propertyValue: ['primary']
        }
    }, {
        row: '<z-button type="error" dash>Error</z-button>',
        rowStyle: {
            white: ['<z-button', '>', '</z-button>'],
            text: ['Error'],
            propertyNmae: ['type', 'dash'],
            propertyValue: ['error']
        }
    }, {
        row: '<z-button type="warning" dash>Warning</z-button>',
        rowStyle: {
            white: ['<z-button', '>', '</z-button>'],
            text: ['Warning'],
            propertyNmae: ['type', 'dash'],
            propertyValue: ['warning']
        }
    }
]
const linkList = [
    {
        row: '<z-button type="primary" link>Primary</z-button>',
        rowStyle: {
            white: ['<z-button', '>', '</z-button>'],
            text: ['Primary'],
            propertyNmae: ['type', 'link'],
            propertyValue: ['primary']
        }
    }, {
        row: '<z-button type="error" link>Error</z-button>',
        rowStyle: {
            white: ['<z-button', '>', '</z-button>'],
            text: ['Error'],
            propertyNmae: ['type', 'link'],
            propertyValue: ['error']
        }
    }, {
        row: '<z-button type="warning" link>Warning</z-button>',
        rowStyle: {
            white: ['<z-button', '>', '</z-button>'],
            text: ['Warning'],
            propertyNmae: ['type', 'link'],
            propertyValue: ['warning']
        }
    }
]
const loadList = [
    {
        row: '<z-button type="primary" loading>Primary</z-button>',
        rowStyle: {
            white: ['<z-button', '>', '</z-button>'],
            text: ['Primary'],
            propertyNmae: ['type', 'loading'],
            propertyValue: ['primary']
        }
    }, {
        row: '<z-button type="primary" plain loading>Primary</z-button>',
        rowStyle: {
            white: ['<z-button', '>', '</z-button>'],
            text: ['Primary'],
            propertyNmae: ['type', 'plain', 'loading'],
            propertyValue: ['primary']
        }
    }, {
        row: '<z-button type="primary" dash loading>Primary</z-button>',
        rowStyle: {
            white: ['<z-button', '>', '</z-button>'],
            text: ['Primary'],
            propertyNmae: ['type', 'dash', 'loading'],
            propertyValue: ['primary']
        }
    }, {
        row: '<z-button type="primary" link loading>Primary</z-button>',
        rowStyle: {
            white: ['<z-button', '>', '</z-button>'],
            text: ['Primary'],
            propertyNmae: ['type', 'link', 'loading'],
            propertyValue: ['primary']
        }
    }
]
const tableAPI = [
    {
        name: 'type',
        illustrate: '（可选）按钮UI类型',
        type: '"" | "primary" | "warning" | "error" | "success" | "info"',
        default: ''
    }, {
        name: 'btn-type',
        illustrate: '（可选）按钮类型',
        type: '"submit" | "button" | "reset"',
        default: 'button'
    }, {
        name: 'disabled',
        illustrate: '（可选）禁用按钮',
        type: 'boolean',
        default: 'false'
    }, {
        name: 'class',
        illustrate: '（可选）按钮类名',
        type: 'string',
        default: ''
    }, {
        name: 'plain',
        illustrate: '（可选）朴素按钮',
        type: 'boolean',
        default: 'false'
    }, {
        name: 'dash',
        illustrate: '（可选）虚线按钮',
        type: 'boolean',
        default: 'false'
    }, {
        name: 'link',
        illustrate: '（可选）文字按钮',
        type: 'boolean',
        default: 'false'
    }, {
        name: 'loading',
        illustrate: '（可选）带有加载动画',
        type: 'boolean',
        default: 'false'
    },
]
const tableEvent = [
    {
        name: 'click',
        illustrate: '点击事件',
        type: '() => void'
    }
]
</script>
<style scoped lang="scss"></style>
