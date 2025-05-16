<template>
       <div class="Dashboard w-full h-full ">
              <h1 class="text-3xl mb-5 text-base-content select-none">欢迎来到仪表盘页面！</h1>
              <button style="position: absolute;top: 0;left: 50%;" @click="a = !a">展示模态窗
              </button>
              <z-modal v-model="a">
                     <input type="text" placeholder="请输入内容" class="input input-bordered w-full max-w-xs">
              </z-modal>
              <div class="w-full grid lg:grid-cols-3 sm:grid-cols-1 gap-4  *:h-92 ">
                     <BarEcharts></BarEcharts>
                     <LineEcharts></LineEcharts>
                     <BarEcharts></BarEcharts>
                     <PieEcharts></PieEcharts>
                     <CircularEcharts></CircularEcharts>
                     <RoseEcharts></RoseEcharts>
                     <RoseEcharts></RoseEcharts>
                     <RoseEcharts></RoseEcharts>
              </div>
       </div>
</template>
<script lang="ts" setup>
import ZModal from "@/components/library/ZModal.vue";
import BarEcharts from "./components/dashboard/BarEcharts.vue";
import LineEcharts from "./components/dashboard/LineEcharts.vue";
import PieEcharts from "./components/dashboard/PieEcharts.vue";
import CircularEcharts from "./components/dashboard/CircularEcharts.vue";
import RoseEcharts from "./components/dashboard/RoseEcharts.vue";
const a = ref(false)
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
