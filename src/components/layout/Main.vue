<script setup lang="ts">
import Icon from "@svg";
import type { RouteRecordRaw } from "vue-router";
import { routes } from "@/router";
import ThemeButton from "@/components/layout/ThemeButton.vue";
const route = useRoute();
const isShowSidebar = ref<boolean>(true);
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
const breadcrumbs = computed((): RouteRecordRaw => {
       const routeObj = routes.find((item: any) => item.path === "/admin");
       const path = route.path.replace("/admin/", "");
       let obj: RouteRecordRaw = routeObj!.children![0]
       for (let i = 0; i < routeObj!.children!.length; i++) {
              const item = routeObj!.children![i];
              if (item.path === path) {
                     obj = item
                     break;
              }
              if (item.children && item.children.length > 0) {
                     const children = item.children.find((itemChild: RouteRecordRaw) => path.includes(itemChild.path));
                     if (children) {
                            obj = children
                     }
              }
       }
       return obj
});
const expandedItems = ref<{ [key: string]: boolean }>({});
const expandChange = (path: string) => {
       if (route.path.includes(path)) {
              return
       }
       expandedItems.value[path] = !expandedItems.value[path]
}
</script>

<template>
       <div class="main-layout w-full h-full flex">
              <!-- 桌面端侧边栏 -->
              <div class="lg-sidebar hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col gap-y-2 overflow-y-auto px-6 pt-4 border-r border-solid transition-transform duration-200 ease-in-out"
                     :class="`${isShowSidebar ? 'translate-x-0' : '-translate-x-full'}`">
                     <div class="shrink-0 text-xl font-bold items-center flex py-4 w-full text-base-content">高效后台管理
                     </div>
                     <nav class="w-full flex flex-col flex-1 mt-1">
                            <ul role="list" class="box-border gap-y-7 space-y-1">
                                   <li v-for="item in currentNavigation">
                                          <RouterLink v-if="!item.children" :to="`/admin/${item.path}`"
                                                 class="ui_item group rounded-lg items-center flex gap-x-3 p-2 text-sm/6 font-semibold text-base-content"
                                                 :class="{ 'bg-click': item.meta!.current }">
                                                 <Icon :name="item.meta!.icon as string" class="size-6"></Icon>
                                                 {{ item.meta!.name }}
                                          </RouterLink>
                                          <!-- 折叠菜单栏 -->

                                          <div v-else>
                                                 <button @click="expandChange(item.path)"
                                                        class="ui_item rounded-lg  text-base-content flex items-center w-full gap-x-3 p-2 text-sm/6 font-semibold"
                                                        :class="{
                                                               'bg-click': item.children.some(child => route.path.includes(child.path)),
                                                        }">
                                                        <Icon :name="item.meta!.icon as string" class="size-6" />
                                                        <span class="flex-1 text-left">{{ item.meta!.name }}</span>
                                                        <svg class="transform transition duration-200 size-4"
                                                               :class="{ 'rotate-180': expandedItems[item.path] }"
                                                               xmlns="http://www.w3.org/2000/svg" fill="none"
                                                               viewBox="0 0 24 24" stroke="currentColor">
                                                               <path stroke-linecap="round" stroke-linejoin="round"
                                                                      d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                 </button>

                                                 <!-- 子菜单 -->
                                                 <transition enter-active-class="transition duration-200 ease-out"
                                                        enter-from-class="transform opacity-0 -translate-y-2"
                                                        enter-to-class="transform opacity-100 translate-y-0"
                                                        leave-active-class="transition duration-150 ease-in"
                                                        leave-from-class="transform opacity-100 translate-y-0"
                                                        leave-to-class="transform opacity-0 -translate-y-2">
                                                        <ul v-show="expandedItems[item.path] || item.children.some(child => route.path.includes(child.path))"
                                                               class="ml-8 space-y-1 mt-1">
                                                               <li v-for="child in item.children" :key="child.path">
                                                                      <RouterLink
                                                                             :to="`/admin/${item.path}/${child.path}`"
                                                                             class="child-menu flex items-center gap-x-2 p-2 text-sm rounded-md"
                                                                             :class="{
                                                                                    'bg-primary/20 text-primary': route.path.includes(child.path),
                                                                                    'hover:bg-base-300': !route.path.includes(child.path)
                                                                             }">
                                                                             <div
                                                                                    class="h-1 w-1 rounded-full bg-current opacity-60" />
                                                                             {{ child.meta?.name }}
                                                                      </RouterLink>
                                                               </li>
                                                        </ul>
                                                 </transition>
                                          </div>


                                   </li>
                            </ul>
                     </nav>
              </div>
              <div class="router-container w-full bg-base grow transition-all duration-200 ease-in-out"
                     :class="`${isShowSidebar ? 'lg:pl-72' : 'pl-0'}`">
                     <div
                            class="header sticky w-full flex items-center h-16 shrink-0 gap-x-4 sm:gap-x-6 sm:px-6 lg:px-8 border-b-1">
                            <!-- 菜单栏收缩  -->
                            <button type="button" class="bar p-2.5 lg:block text-base-content"
                                   @click="isShowSidebar = !isShowSidebar">
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                          stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon"
                                          class="size-6 pointer">
                                          <path stroke-linecap="round" stroke-linejoin="round"
                                                 d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
                                   </svg>
                            </button>
                            <div aria-hidden="true" class="w-px h-6 lg:hidden"></div>
                            <div class="flex self-stretch flex-1 gap-x-4 lg:gap-x-6">
                                   <div class="grid flex-1 grid-cols-1">
                                          <div
                                                 class="breadcrumbs flex items-center space-x-2 text-sm text-base-content">
                                                 <div :key="breadcrumbs.path" className="flex items-center ">
                                                        <component :is="`${breadcrumbs.meta!.icon}Icon`"
                                                               class="h-5 w-5 flex-shrink-0 transition-none" />
                                                        <span className="ml-2 text-base">{{ breadcrumbs.meta!.name
                                                               }}</span>
                                                 </div>
                                          </div>
                                   </div>
                                   <div className="flex items-center gap-x-4 lg:gap-x-6">
                                          <div aria-hidden="true"
                                                 className="hidden lg:block lg:h-6 lg:w-px bg-base-content"></div>
                                          <div className="flex items-center gap-2">
                                                 <ThemeButton></ThemeButton>
                                          </div>
                                   </div>
                            </div>
                     </div>
                     <main class="router-page w-full py-10 bg-base-100 box-border overflow-x-hidden overflow-y-auto">
                            <div class="w-full h-full px-4 sm:px-6 lg:px-8">
                                   <div class="p-6 w-full h-full">
                                          <router-view></router-view>
                                   </div>
                            </div>
                     </main>
              </div>
       </div>
</template>

<style scoped lang="scss">
.main-layout {
       position: relative;

       .lg-sidebar {
              will-change: transform;
              transform: translateZ(0);
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



              .child-menu {
                     transition: all 0.2s ease;
              }
       }

       .router-container {
              $head: calc(var(--spacing) * 16);

              .header {
                     border-color: color-mix(in oklab, var(--color-base-content) 10%, transparent);

                     .bar {
                            background-color: transparent;
                            border-radius: 0;
                     }
              }

              .router-page {
                     height: calc(100% - $head);
              }
       }
}
</style>
