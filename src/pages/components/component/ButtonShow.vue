<template>
    <div class="ButtonShow w-full h-full grid lg:grid-cols-2 sm:grid-cols-1 gap-4">
        <z-preview title="按钮颜色" code="<z-button class=”btn” type=”primary”></z-button>">
            <z-button>Default</z-button>
            <z-button type="primary">Primary</z-button>
            <z-button type="error">Error</z-button>
            <z-button type="warning">Warning</z-button>
        </z-preview>
        <z-preview title="朴素按钮" code="<z-button class=”btn” type=”primary”></z-button>">
            <z-button type="primary" plain>Primary</z-button>
            <z-button type="error" plain>Error</z-button>
            <z-button type="warning" plain>Warning</z-button>
        </z-preview>
        <z-preview title="虚线按钮" code="<z-button class=”btn” type=”primary”></z-button>">
            <z-button type="primary" dash>Primary</z-button>
            <z-button type="error" dash>Error</z-button>
            <z-button type="warning" dash>Warning</z-button>
        </z-preview>
        <z-preview title="文字按钮" code="<z-button class=”btn” type=”primary”></z-button>">
            <z-button type="primary" link>Primary</z-button>
            <z-button type="error" link>Error</z-button>
            <z-button type="warning" link>Warning</z-button>
        </z-preview>
    </div>
</template>
<script lang="ts" setup>
import ZPreview from "@/components/library/ZPreview.vue"
import ZButton from "@/components/library/ZButton.vue"
</script>
<style scoped lang="scss"></style>
