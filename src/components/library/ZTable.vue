<script setup lang="ts">
import { h, type VNode, useSlots } from "vue";
interface Column {
       title: string;
       key: string;
       render?: (item: any) => VNode;
       className?: string;
}
interface RowData {
       [key: string]: any; // 这里可以根据实际情况替换为具体的类型
}
const props = withDefaults(
       defineProps<{
              rowKey: string;
              columns: Column[];
              data: RowData[];
              pageSize: number;
              loading?: boolean;
              loadingText?: string;
              emptyText?: string;
       }>(),
       {
              loading: false,
              loadingText: "加载中...",
              emptyText: "暂无数据"
       }
);
const slot = useSlots()

const defaultContent = (row: RowData, column: Column) => {
       return h("span", column.key ? String(row[column.key] || "-") : "-");
};
</script>

<template>
       <div class="ZTable mt-6 flow-root">
              <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"
                     style="max-height: calc(100vh - 300px); overflow-y: auto">
                     <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table class="table table-zebra w-full">
                                   <thead>
                                          <tr>
                                                 <th v-for="column in props.columns" :key="column.key">
                                                        {{ column.title }}
                                                 </th>
                                                 <th v-if="!!slot.active"></th>
                                          </tr>
                                   </thead>
                                   <tbody>
                                          <!-- loading -->
                                          <template v-if="loading">
                                                 <tr>
                                                        <td :colspan="props.columns.length + (!!slot.active ? 1 : 0)"
                                                               class="px-3 py-4 text-sm text-center text-gray-500">
                                                               {{ props.loadingText }}
                                                        </td>
                                                 </tr>
                                          </template>
                                          <!-- 表格数据为空 -->
                                          <template v-else-if="props.data.length === 0">
                                                 <tr v-for="(item, index) in props.pageSize" :key="item">
                                                        <td :colspan="props.columns.length + (!!slot.active ? 1 : 0)"
                                                               class="px-3 py-4 text-sm text-center text-gray-500">
                                                               {{ index === 0 ? emptyText : "\u00A0" }}
                                                        </td>
                                                 </tr>
                                          </template>
                                          <template v-else>
                                                 <tr v-for="row in props.data" :key="`${row[props.rowKey]}`"
                                                        class="h-14">
                                                        <td :class="`align-middle ${column.className || ''}`"
                                                               :key="`${row[props.rowKey]}_${column.key}_${index}`"
                                                               v-for="(column, index) in props.columns">
                                                               <component
                                                                      :is="column.render ? column.render(row) : defaultContent(row, column)" />
                                                        </td>
                                                        <td v-if="!!slot.active" class="align-middle">
                                                               <div class="flex justify-end items-center gap-2">
                                                                      <slot name="active" :row="row"></slot>
                                                               </div>
                                                        </td>
                                                 </tr>
                                                 <!-- 填充表格空行 -->
                                                 <template v-if="props.data.length < props.pageSize">
                                                        <tr v-for="nullRow in props.pageSize - props.data.length"
                                                               :key="`null_${nullRow}`">
                                                               <td :colSpan="columns.length + (!!slot.active ? 1 : 0)"
                                                                      className="h-[53px]">
                                                                      {{ "\u00A0" }}
                                                               </td>
                                                        </tr>
                                                 </template>
                                          </template>
                                   </tbody>
                            </table>
                     </div>
              </div>
       </div>
</template>

<style scoped lang="scss"></style>
