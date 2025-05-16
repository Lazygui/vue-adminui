<template>
       <z-card shadow="hover">
              <div ref="barEcharts" class="w-full h-full"></div>
       </z-card>
</template>
<script lang="ts" setup>
import ZCard from "@/components/library/ZCard.vue";
import type { ECOption, EChartsType } from "@/hooks/private/echarts";
const echart = new Echarts();
const barEcharts = ref<HTMLElement>();
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
              legend: {
                     show: true
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
                            data: [
                                   120,
                                   200,
                                   {
                                          value: 150,
                                          itemStyle: {
                                                 borderRadius: [20, 20, 0, 0]
                                          }
                                   },
                                   80,
                                   70,
                                   {
                                          value: 110,
                                          itemStyle: {
                                                 borderRadius: [20, 20, 0, 0]
                                          }
                                   },
                                   {
                                          value: 130,
                                          itemStyle: {
                                                 borderRadius: [20, 20, 0, 0]
                                          }
                                   }
                            ],
                            type: "bar",
                            stack: "a",
                            name: "a"
                     },
                     {
                            data: [
                                   10,
                                   {
                                          value: 30,
                                          itemStyle: {
                                                 borderRadius: [20, 20, 0, 0]
                                          }
                                   },
                                   ,
                                   64,
                                   "-",
                                   0,
                                   "-",
                                   0
                            ],
                            type: "bar",
                            stack: "a",
                            name: "b"
                     },
                     {
                            data: [
                                   {
                                          value: 30,
                                          itemStyle: {
                                                 borderRadius: [20, 20, 0, 0]
                                          }
                                   },
                                   "-",
                                   0,
                                   {
                                          value: 20,
                                          itemStyle: {
                                                 borderRadius: [20, 20, 0, 0]
                                          }
                                   },
                                   {
                                          value: 10,
                                          itemStyle: {
                                                 borderRadius: [20, 20, 0, 0]
                                          }
                                   },
                                   "-",
                                   0
                            ],
                            type: "bar",
                            stack: "a",
                            name: "c"
                     },
                     {
                            data: [
                                   30,
                                   "-",
                                   0,
                                   {
                                          value: 20,
                                          itemStyle: {
                                                 borderRadius: [20, 20, 0, 0]
                                          }
                                   },
                                   {
                                          value: 10,
                                          itemStyle: {
                                                 borderRadius: [20, 20, 0, 0]
                                          }
                                   },
                                   ,
                                   "-",
                                   0
                            ],
                            type: "bar",
                            stack: "b",
                            name: "d"
                     },
                     {
                            data: [
                                   {
                                          value: 10,
                                          itemStyle: {
                                                 borderRadius: [20, 20, 0, 0]
                                          }
                                   },

                                   {
                                          value: 20,
                                          itemStyle: {
                                                 borderRadius: [20, 20, 0, 0]
                                          }
                                   },

                                   {
                                          value: 150,
                                          itemStyle: {
                                                 borderRadius: [20, 20, 0, 0]
                                          }
                                   },
                                   0,
                                   "-",
                                   {
                                          value: 50,
                                          itemStyle: {
                                                 borderRadius: [20, 20, 0, 0]
                                          }
                                   },
                                   {
                                          value: 10,
                                          itemStyle: {
                                                 borderRadius: [20, 20, 0, 0]
                                          }
                                   }
                            ],
                            type: "bar",
                            stack: "b",
                            name: "e"
                     }
              ],
              tooltip: {}
       };
});
const resize = () => {
       if (echartInstance.value) {
              echartInstance.value.resize();
       }
}
onMounted(() => {
       if (barEcharts.value) {
              echartInstance.value = markRaw(echart.init(barEcharts.value) as EChartsType);
              if (echartInstance.value) {
                     echartInstance.value.setOption(option.value);
                     // useEventListener("resize", useDebounce(resize, 500))
              }

       }
});

onUnmounted(() => {
       echart.dispose();
});
</script>
<style scoped lang="scss"></style>
