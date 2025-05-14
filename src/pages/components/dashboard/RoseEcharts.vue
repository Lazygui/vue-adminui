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
              legend: {
                     top: "bottom"
              },
              series: [
                     {
                            name: "Nightingale Chart",
                            type: "pie",
                            radius: [20, 100],
                            center: ["50%", "40%"],
                            roseType: "area",
                            itemStyle: {
                                   borderRadius: 8
                            },
                            data: [
                                   { value: 40, name: "rose 1" },
                                   { value: 38, name: "rose 2" },
                                   { value: 32, name: "rose 3" },
                                   { value: 30, name: "rose 4" },
                                   { value: 28, name: "rose 5" },
                                   { value: 26, name: "rose 6" },
                                   { value: 22, name: "rose 7" },
                                   { value: 18, name: "rose 8" }
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
