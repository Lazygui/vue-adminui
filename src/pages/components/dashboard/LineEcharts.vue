<template>
       <z-card shadow="hover">
              <div ref="lineEcharts" class="w-full h-full"></div>
       </z-card>
</template>
<script lang="ts" setup>
import ZCard from "@/components/library/ZCard.vue";
import type { ECOption } from "@/hooks/private/echarts";
const echart = new Echarts();
const lineEcharts = ref<HTMLElement>();
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
onMounted(() => {
       if (lineEcharts.value) {
              echart.init(lineEcharts.value);
              echart.render(option.value);
       }
});
onUnmounted(() => {
       echart.dispose();
});
</script>
<style scoped lang="scss"></style>
