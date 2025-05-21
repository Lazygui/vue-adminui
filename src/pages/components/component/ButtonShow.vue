<template>
    <div class="ButtonShow w-full h-full grid lg:grid-cols-2 sm:grid-cols-1 gap-4">
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
    </div>
</template>
<script lang="ts" setup>
import ZPreview from "@/components/library/ZPreview.vue"
import ZButton from "@/components/library/ZButton.vue"
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
</script>
<style scoped lang="scss"></style>
