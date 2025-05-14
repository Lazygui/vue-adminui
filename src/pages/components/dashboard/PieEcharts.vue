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
              title: {
                     text: "演示饼图",
                     left: "center"
              },
              tooltip: {
                     trigger: "item"
              },
              legend: {
                     orient: "vertical",
                     left: "left"
              },
              series: [
                     {
                            name: "Access From",
                            type: "pie",
                            radius: "50%",
                            data: [
                                   { value: 1048, name: "Search Engine" },
                                   { value: 735, name: "Direct" },
                                   { value: 580, name: "Email" },
                                   { value: 484, name: "Union Ads" },
                                   { value: 300, name: "Video Ads" }
                            ],
                            emphasis: {
                                   itemStyle: {
                                          shadowBlur: 10,
                                          shadowOffsetX: 0,
                                          shadowColor: "rgba(0, 0, 0, 0.5)"
                                   }
                            },
                            top: "20%"
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
              echartInstance.value = echart.init(lineEcharts.value);
              if (echartInstance.value) {
                     echartInstance.value.setOption(option.value);
                     useEventListener("resize", useDebounce(resize, 500))
              }
       }
});
onUnmounted(() => {
       echart.dispose();
});
</script>
<style scoped lang="scss"></style>
