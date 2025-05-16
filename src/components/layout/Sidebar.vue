<script setup lang="ts">
import Icon from "@svg";
import type { RouteRecordRaw } from "vue-router";
import { routes } from "@/router";
const route = useRoute();

const props = defineProps<{
       isShowSidebar: boolean;
}>();

const currentNavigation = computed((): RouteRecordRaw[] => {
       const routeObj = routes.find((item: any) => item.path === "/admin");
       if (routeObj && routeObj.children && routeObj.children.length > 0) {
              const { children } = routeObj;
              return children.map((item: RouteRecordRaw) => ({
                     ...item,
                     meta: {
                            ...item.meta,
                            current: route.path.includes(item.path)
                     }
              }));
       }
       return [];
});
</script>

<template>
       <div class="lg-sidebar hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col gap-y-2 overflow-y-auto px-6 pt-4 border-r border-solid transition-transform duration-5000 ease-in-out"
              :class="`${props.isShowSidebar ? 'translate-x-0' : '-translate-x-full'}`">
              <div class="shrink-0 text-xl font-bold items-center flex py-4 w-full text-base-content">高效后台管理</div>
              <nav class="w-full flex flex-col flex-1 mt-1">
                     <ul role="list" class="box-border gap-y-7 space-y-1">
                            <li v-for="item in currentNavigation">
                                   <RouterLink :to="`/admin/${item.path}`"
                                          class="ui_item group rounded-lg flex gap-x-3 p-2 text-sm/6 font-semibold text-base-content"
                                          :class="{ 'bg-click': item.meta!.current }">
                                          <Icon :name="item.meta!.icon as string" class="size-6"></Icon>
                                          {{ item.meta!.name }}
                                   </RouterLink>
                            </li>
                     </ul>
              </nav>
       </div>
</template>

<style scoped lang="scss">
.lg-sidebar {
       border-color: color-mix(in oklab, var(--color-base-content) 10%, transparent);
       height: inherit;
       background-color: var(--color-base-200);

       .ui_item {
              &:hover {
                     @media (hover: hover) {
                            color: var(--color-primary-content);
                            background-color: var(--color-primary);
                     }
              }
       }

       .bg-click {
              background-color: var(--color-primary);
              color: var(--color-primary-content);
       }
}
</style>
