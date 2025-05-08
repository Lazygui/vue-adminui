<template>
       <div class="TableShow w-full h-full">
              <div class="flex justify-between items-center mb-6">
                     <h1 class="text-3xl font-bold">病人病例配置</h1>
                     <button type="button" class="btn btn-primary">
                            <svg
                                   xmlns="http://www.w3.org/2000/svg"
                                   fill="none"
                                   viewBox="0 0 24 24"
                                   stroke-width="1.5"
                                   stroke="currentColor"
                                   aria-hidden="true"
                                   data-slot="icon"
                                   class="h-5 w-5"
                            >
                                   <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
                            </svg>
                            添加病例
                     </button>
              </div>
              <z-table
                     :data="tableData"
                     row-key="tableId"
                     :pageSize="10"
                     :actions="actions"
                     :columns="[
                            {
                                   title: '序号',
                                   key: 'no',
                                   className: 'font-bold'
                            },
                            {
                                   title: '名称',
                                   key: 'name',
                                   className: 'max-w-[300px] truncate cursor-pointer',
                                   render: (voice) => {
                                          return h(
                                                 'span',
                                                 {
                                                        title: '点击复制',
                                                        onClick: copy
                                                 },
                                                 voice.name
                                          );
                                   }
                            }
                     ]"
              ></z-table>
       </div>
</template>
<script lang="ts" setup>
import { h } from "vue";
import toast from "@/components/general/toast";
import ZTable from "@/components/library/ZTable.vue";
const tableData = ref([
       {
              tableId: 1,
              no: 1,
              name: "张三"
       },
       {
              tableId: 2,
              no: 1,
              name: "张三"
       },
       {
              tableId: 3,
              no: 1,
              name: "张三"
       },
       {
              tableId: 4,
              no: 1,
              name: "张三sadsadsadsadsad张三sadsadsadsadsadsadsadsadsadsadsadsadadadsadsadsadsadsadsadsadasdsadsadsadfsdhfgsdkjghsdlghdflhglsdkhfglksdhjflksdlsadsadsadsadsadsadsadadadsadsadsadsadsadsadsadasdsadsadsadfsdhfgsdkjghsdlghdflhglsdkhfglksdhjflksdl"
       },
       {
              tableId: 5,
              no: 1,
              name: "张三"
       },
       {
              tableId: 6,
              no: 1,
              name: "张三"
       },
       {
              tableId: 7,
              no: 1,
              name: "张三"
       },
       {
              tableId: 8,
              no: 1,
              name: "张三"
       },
       {
              tableId: 9,
              no: 1,
              name: "张三"
       },
       {
              tableId: 10,
              no: 1,
              name: "张三"
       }
]);
const actions: any[] = [
       {
              label: "查看",
              onClick: (row: any) => {
                     console.log("🚀 ~ args:", row);
              },
              className: "btn btn-sm"
       },
       {
              label: "编辑",
              onClick: (row: any) => {
                     console.log("🚀 ~ args:", row);
              },
              className: "btn btn-sm btn-primary"
       },
       {
              label: "删除",
              onClick: (row: any) => {
                     console.log("🚀 ~ args:", row);
              },
              className: "btn btn-sm btn-error "
       }
];
const copy = () => {
       toast.success("Successfully toasted!");
};
</script>
<style scoped lang="scss">
.TableShow {
       // border: 1px solid red;
}
</style>
