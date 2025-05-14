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
