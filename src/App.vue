<template>
       <div v-if="loading"></div>
       <div class=" w-full h-full" v-else @click.right.native.prevent="showContextMenu">
              <router-view />
       </div>
</template>
<script lang="ts" setup>
import { useLoading } from "@/hooks/private/usePlugin";
const loading = ref(true);
const router = useRouter();
useLoading.show();
const showContextMenu = (event: MouseEvent) => {

}
onMounted(async () => {
       // 等待初始路由验证完成
       await router.isReady();
       useLoading.hidden();
       loading.value = false;
});
</script>
