<template>
       <main class="grid h-screen px-6 py-16 bg-base-100 place-items-center sm:py-24 lg:px-8">
              <div class="text-center transform -translate-y-8">
                     <p class="text-base font-semibold text-base-content opacity-50">404</p>
                     <h1 class="mt-4 text-5xl font-semibold tracking-tight text-base-content text-balance sm:text-7xl">页面不存在</h1>
                     <p class="mt-6 text-lg font-medium text-base-content text-pretty sm:text-xl/8">抱歉，我们找不到您要找的页面。</p>
                     <div class="flex items-center justify-center mt-10 gap-x-6">
                            <div class="w-23">
                                   <z-button type="primary" class="w-40" @click="generatePath"> <a :href="href"> 返回首页 </a> </z-button>
                            </div>
                     </div>
              </div>
       </main>
</template>

<script setup lang="ts">
import ZButton from "@/components/library/ZButton.vue";
import { diffSystem } from "@/hooks/private/useUtils";
const href = ref("");
const generatePath = async () => {
       const { origin } = location;
       const system = await diffSystem();
       const url = `${origin}/#/${system}`;
       return url;
};
onMounted(async () => {
       href.value = await generatePath();
});
</script>

<style scoped lang="scss"></style>
