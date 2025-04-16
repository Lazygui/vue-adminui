<template>
    <router-view />
</template>
<script lang="ts" setup>
import { useLoading } from "@/hooks/private/usePlugin"
useLoading.show()
onMounted(() => {
    useLoading.hidden()
})
</script>