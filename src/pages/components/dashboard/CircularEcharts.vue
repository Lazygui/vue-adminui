<template>
       <z-card shadow="hover">
              <div ref="circularEcharts" class="w-full h-full"></div>
       </z-card>
</template>
<script lang="ts" setup>
import ZCard from "@/components/library/ZCard.vue";
import type { ECOption, EChartsType } from "@/hooks/private/echarts";
const echart = new Echarts();
const circularEcharts = ref<HTMLElement>();
const echartInstance = ref<EChartsType | null>(null);
const option = computed((): ECOption => {
       return {
              tooltip: {
                     trigger: "item"
              },
              legend: {
                     top: "5%",
                     left: "center"
              },
              series: [
                     {
                            name: "Access From",
                            type: "pie",
                            radius: ["40%", "70%"],
                            avoidLabelOverlap: false,
                            itemStyle: {
                                   borderRadius: 10,
                                   borderColor: "#fff",
                                   borderWidth: 2
                            },
                            label: {
                                   show: false,
                                   position: "center"
                            },
                            emphasis: {
                                   label: {
                                          show: true,
                                          fontSize: 40,
                                          fontWeight: "bold"
                                   }
                            },
                            labelLine: {
                                   show: false
                            },
                            data: [
                                   { value: 1048, name: "Search Engine" },
                                   { value: 735, name: "Direct" },
                                   { value: 580, name: "Email" },
                                   { value: 484, name: "Union Ads" },
                                   { value: 300, name: "Video Ads" }
                            ]
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
       if (circularEcharts.value) {
              echartInstance.value = echart.init(circularEcharts.value);
              if (echartInstance.value) {
                     echartInstance.value.setOption(option.value);
                     useResize(circularEcharts.value, useDebounce(resize, 500))
              }
       }
});
onUnmounted(() => {
       echart.dispose();
});
</script>
<style scoped lang="scss"></style>
