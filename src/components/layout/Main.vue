<script setup lang="ts">
import type { RouteRecordRaw } from "vue-router";
import { routes } from "@/router";
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
// const dark = window.matchMedia('(prefers-color-scheme: dark)')
</script>

<template>
       <div class="main-layout w-full h-full flex">
              <!-- 桌面端侧边栏 - 在大屏幕设备上固定显示 -->
              <div class="lg-sidebar hidden sm:flex sm:flex-col flex items-center">
                     <div class="title w-full text-base-content">高效后台管理</div>
                     <nav class="nav w-full flex flex-col">
                            <ul role="list" class="ui_list">
                                   <li v-for="item in currentNavigation">
                                          <RouterLink
                                                 :to="`/admin/${item.path}`"
                                                 class="ui_item flex text-base-content"
                                                 :class="{ 'bg-click': item.meta!.current }"
                                          >
                                                 <component :is="`${item.meta!.icon}Icon`" class="size-6" />
                                                 {{ item.meta!.name }}
                                          </RouterLink>
                                   </li>
                            </ul>
                     </nav>
              </div>
              <!-- 移动端侧边栏 - 在小屏幕设备上显示为可滑出的对话框 -->
              <div class="sm:hidden">h5</div>
              <div class="container flex items-center">
                     <div class="header sticky w-full">
                            <!-- 菜单栏收缩  -->
                            <button type="button" class="bar lg:block text-base-content" @click="isShowSidebar = !isShowSidebar">
                                   <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke-width="1.5"
                                          stroke="currentColor"
                                          aria-hidden="true"
                                          data-slot="icon"
                                          class="size-6 pointer"
                                   >
                                          <path
                                                 stroke-linecap="round"
                                                 stroke-linejoin="round"
                                                 d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                          ></path>
                                   </svg>
                            </button>
                            <div aria-hidden="true" class="w-px h-6 bg-gray-900/10 lg:hidden"></div>
                     </div>
                     <!-- <router-view></router-view> -->
              </div>
       </div>
</template>

<style scoped lang="scss">
.main-layout {
       position: relative;
       background-color: var(--color-base-100);

       .size-6 {
              width: calc(var(--spacing) * 6);
              height: calc(var(--spacing) * 6);
       }

       .lg-sidebar {
              border-right-style: solid;
              border-right-width: 1px;
              border-color: color-mix(in oklab, var(--color-base-content) 10%, transparent);
              height: inherit;
              padding-top: calc(var(--spacing) * 4);
              padding-inline: calc(var(--spacing) * 6);
              box-sizing: border-box;
              overflow-y: auto;
              row-gap: calc(var(--spacing) * 2);
              background-color: var(--color-base-200);

              @media (width >=64rem) {
                     width: calc(var(--spacing) * 72);
              }

              .title {
                     padding-block-start: 1rem;
                     padding-block-end: 1rem;
                     box-sizing: border-box;
                     display: flex;
                     align-items: center;
                     flex-shrink: 1;
                     font-weight: 700;
                     font-size: calc(var(--spacing) * 5);
              }

              .nav {
                     margin-top: calc(var(--spacing) * 1);
                     box-sizing: border-box;
                     flex: 1;

                     .ui_list {
                            row-gap: calc(var(--spacing) * 7);
                            box-sizing: border-box;

                            :where(& > :not(:last-child)) {
                                   margin-block-start: calc(var(--spacing) * 1);
                                   margin-block-end: calc(var(--spacing) * 1);
                            }

                            .ui_item {
                                   column-gap: calc(var(--spacing) * 3);
                                   border-radius: var(--radius-field);
                                   padding: calc(var(--spacing) * 2);
                                   box-sizing: border-box;
                                   font-size: 0.875rem;
                                   line-height: calc(var(--spacing) * 6);
                                   font-weight: 600;

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

                     & > ul {
                            padding: 0;
                            margin: 0;
                     }
              }
       }

       ul > li {
              list-style-type: none;
       }

       .container {
              flex-grow: 24;
              height: calc(var(--spacing) * 16);
              background-color: var(--color-base-100);
              border-color: color-mix(in oklab, var(--color-base-content) 10%, transparent);
              border-bottom-style: solid;
              border-bottom-width: 1px;

              @media (width >=40rem) {
                     column-gap: calc(var(--spacing) * 6);
              }

              @media (width >=64rem) {
                     padding-inline: calc(var(--spacing) * 8);
              }

              .header {
                     .bar {
                            padding: calc(var(--spacing) * 2.5);
                            background-color: transparent;
                            border-radius: 0;
                     }
              }
       }
}
</style>
