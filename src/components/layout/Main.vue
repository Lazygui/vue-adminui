<script setup lang="ts">
import type { RouteRecordRaw } from "vue-router";
import { routes } from "@/router"
const currentNavigation = computed((): RouteRecordRaw[] => {
  const route = routes.find((item: any) => item.path === '/admin')
  if (route && route.children && route.children.length > 0) {
    const { children } = route
    return children
  }
  return []
})
// const dark = window.matchMedia('(prefers-color-scheme: dark)')
</script>

<template>
  <div class="main-layout w-full h-full flex">
    <!-- 桌面端侧边栏 - 在大屏幕设备上固定显示 -->
    <div class="lg-sidebar hidden sm:flex sm:flex-col flex items-center">
      <div class="title w-full text-base-content">
        高效后台管理
      </div>
      <nav class="nav w-full flex flex-col">
        <ul role="list" class="ui_list">
          <li v-for="(item) in currentNavigation">
            <RouterLink :to="item.path" class="ui_item  flex text-base-content" :class="{ 'bg-click': item }">{{
              item.meta!.name }}</RouterLink>
          </li>
        </ul>
      </nav>
    </div>
    <!-- 移动端侧边栏 - 在小屏幕设备上显示为可滑出的对话框 -->
    <div class="sm:hidden">h5</div>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-layout {
  position: relative;

  .lg-sidebar {
    border: 1px solid red;
    height: inherit;
    padding-top: calc(var(--spacing) * 4);
    padding-inline: calc(var(--spacing) * 6);
    box-sizing: border-box;
    overflow-y: auto;
    row-gap: calc(var(--spacing) * 2);
    // flex-grow: 1;

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
        margin-inline: -0.5rem;
        row-gap: calc(var(--spacing) * 7);
        box-sizing: border-box;


        &:not(:last-child) {
          margin-block-start: calc(var(--spacing) * 1);
          margin-block-end: calc(var(--spacing) * 1);
          box-sizing: border-box;
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
              background-color: var(--color-primary)
            }
          }
        }

        .bg-click {
          background-color: var(--color-primary);
          color: var(--color-primary-content);
        }
      }

      &>ul {
        padding: 0;
        margin: 0;
      }
    }
  }

  ul>li {
    list-style-type: none
  }

  .container {
    flex-grow: 24;
  }
}
</style>
