<template>
       <z-card shadow="hover">
              <div ref="lineEcharts" class="w-full h-full"></div>
       </z-card>
</template>
<script lang="ts" setup>
import ZCard from "@/components/library/ZCard.vue";
import type { ECOption, EChartsType } from "@/hooks/private/echarts";
const echart = new Echarts();
const lineEcharts = ref<HTMLElement>();
const echartInstance = ref<EChartsType | null>(null);
const option = computed((): ECOption => {
       return {
              grid: {
                     top: "10%",
                     left: "0%",
                     right: "0%",
                     bottom: "0%",
                     containLabel: true
              },
              xAxis: {
                     type: "category",
                     data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
              },
              yAxis: {
                     type: "value"
              },
              series: [
                     {
                            data: [820, 932, 901, 934, 1290, 1330, 1320],
                            type: "line",
                            smooth: true
                     }
              ]
       };
});
const resize = () => {
       if (echartInstance.value) {
              echartInstance.value.resize();
       }
}
onMounted(() => {
       if (lineEcharts.value) {
              echartInstance.value = markRaw(echart.init(lineEcharts.value) as EChartsType);
              if (echartInstance.value) {
                     echartInstance.value.setOption(option.value);
                     useResize(lineEcharts.value, useDebounce(resize, 500))
              }
       }
});
onUnmounted(() => {
       echart.dispose();
});
</script>
<style scoped lang="scss"></style>
