<template>
    <div v-if="loading"> </div>
    <router-view v-else />
</template>
<script lang="ts" setup>
import { useLoading } from "@/hooks/private/usePlugin"
const loading = ref(true);
const router = useRouter();
useLoading.show()
onMounted(async () => {
    // 等待初始路由验证完成
    await router.isReady();
    useLoading.hidden()
    loading.value = false;
})
</script>