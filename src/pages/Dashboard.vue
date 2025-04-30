<template>
       <div class="Dashboard w-full h-full overflow-x-hidden overflow-y">
              <h1 class="text-3xl mb-5">欢迎来到仪表盘页面！</h1>
              <div class="w-full grid grid-cols-3 gap-4 overflow-x-hidden">
                     <BarEcharts class="h-92"></BarEcharts>
                     <BarEcharts class="h-92"></BarEcharts>
                     <BarEcharts class="h-92"></BarEcharts>
              </div>
       </div>
</template>
<script lang="ts" setup>
import BarEcharts from "./components/dashboard/BarEcharts.vue";
</script>
<style scoped lang="scss">
.Dashboard {
       // border: 1px solid red;
       box-sizing: border-box;
       color: #333;
       text-align: center;
       margin-top: 20px;
}
</style>
