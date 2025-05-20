<template>
    <div class="ComponentDisplay">
        <z-preview title="按钮颜色" code="<z-button class=”btn” type=”primary”></z-button>">
            <z-button>Default</z-button>
            <z-button type="primary">Primary</z-button>
            <z-button type="error">Error</z-button>
            <z-button type="success">Warning</z-button>
        </z-preview>

    </div>
</template>
<script lang="ts" setup>
import ZPreview from "@/components/library/ZPreview.vue"
import ZButton from "@/components/library/ZButton.vue"
</script>
<style scoped lang="scss"></style>
