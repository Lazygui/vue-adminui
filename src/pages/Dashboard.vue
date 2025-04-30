<template>
       <div class="Dashboard w-full h-full overflow-x-hidden overflow-y">
              <div>欢迎来到仪表盘页面！</div>
              <div class="w-full grid grid-cols-3 gap-4">
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
       font-size: 20px;
       color: #333;
       text-align: center;
       margin-top: 20px;
}
</style>
