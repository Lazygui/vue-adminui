<template>
       <div class="TableShow w-full h-full">
              <div class="flex justify-between items-center mb-6">
                     <h1 class="text-3xl font-bold">病人病例配置</h1>
                     <button type="button" class="btn btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                   stroke="currentColor" aria-hidden="true" data-slot="icon" class="h-5 w-5">
                                   <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15">
                                   </path>
                            </svg>
                            添加病例
                     </button>
              </div>
              <z-table :data="tableData" row-key="tableId" :pageSize="10" :columns="[
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
              ]">
                     <template #active>
                            <z-button class="btn-sm">
                                   查看
                            </z-button>
                            <z-button class="btn-sm" type="primary" @click="editClick">
                                   编辑
                            </z-button>
                            <z-button class="btn-sm" type="error">
                                   删除
                            </z-button>
                     </template>
              </z-table>
              <z-modal v-model="edit" title="编辑病例">
                     <div class="w-full h-full">
                            <z-input label="名称：" v-model="form.name" label-post="left"></z-input>
                     </div>
              </z-modal>
       </div>
</template>
<script lang="ts" setup>
import { h } from "vue";
import toast from "@/components/general/toast";
import ZTable from "@/components/library/ZTable.vue";
import ZModal from "@/components/library/ZModal.vue";
import ZInput from "@/components/library/ZInput.vue";
import ZButton from "@/components/library/ZButton.vue";
const form = ref({
       name: ''
})
const edit = ref<boolean>(false)
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
const editClick = () => {
       edit.value = true

}
const copy = () => {
       toast.success("Successfully toasted!");
};
</script>
<style scoped lang="scss"></style>
