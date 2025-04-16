<script setup lang="ts">
const dark = window.matchMedia('(prefers-color-scheme: dark)')
console.log("🚀 ~ dark:", dark)
</script>

<template>
  <div class="main-layout">
    <!-- 桌面端侧边栏 - 在大屏幕设备上固定显示 -->
    <div class="lg-sidebar hidden sm:flex sm:flex-col">
      <div class="title">
        高效后台管理
      </div>
      <div>
        <ul>
          <li></li>
        </ul>
      </div>
    </div>
    <!-- 移动端侧边栏 - 在小屏幕设备上显示为可滑出的对话框 -->
    <div class="sm:hidden">h5</div>
    <div class="container"></div>
  </div>
</template>

<style scoped lang="scss">
.main-layout {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;

  .lg-sidebar {
    height: inherit;
    padding-top: 1rem;
    padding-inline: 1.5rem;
    box-sizing: border-box;
    overflow-y: auto;
    row-gap: 0.5rem;
    border: 1px solid red;
    box-sizing: border-box;
    flex-grow: 1;

    .title {
      display: flex;
      align-items: center;
      flex-shrink: 1;
      font-weight: 700;
      font-size: 1.25rem;
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
