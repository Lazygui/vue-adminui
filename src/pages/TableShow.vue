<template>
       <div class="TableShow w-full h-full">
              <div class="flex justify-between items-center mb-6">
                     <h1 class="text-3xl font-bold">病人病例配置</h1>
                     <z-button type="primary" @click="addClick">
                            <Icon name="Plus" class="size-6"></Icon>
                            添加病例
                     </z-button>
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
                     <template #active="scoped">
                            <z-button class="btn-sm" type="primary" @click="editClick(scoped.row)">
                                   编辑
                            </z-button>
                            <z-button class="btn-sm" type="error" @click="deleteClick(scoped.row)">
                                   删除
                            </z-button>
                     </template>
              </z-table>
              <z-modal v-model="modal" title="病例配置" @confirm="confirm">
                     <div class="w-full h-full" v-show="modalType === 2">
                            <z-input label="名称：" v-model="form.name" label-post="left"></z-input>
                     </div>
                     <div class="w-full h-full" v-show="modalType === 1">
                            <z-input label="名称：" v-model="form.name" label-post="left"></z-input>
                     </div>
              </z-modal>
       </div>
</template>
<script lang="ts" setup>
import { h } from "vue";
import Icon from "@svg";
import toast from "@/components/general/toast";
import ZTable from "@/components/library/ZTable.vue";
import ZModal from "@/components/library/ZModal.vue";
import ZInput from "@/components/library/ZInput.vue";
import ZButton from "@/components/library/ZButton.vue";
const form = ref({
       tableId: '',
       name: ''
})
const modal = ref<boolean>(false)
const modalType = ref<number>(0);
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
              name: "张三sadsadsadsadsad张三sdl"
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
const reset = () => {
       modalType.value = 0
       form.value.tableId = ''
       form.value.name = ''
}
const addClick = () => {
       modalType.value = 1
       modal.value = true

}
const editClick = (row: any) => {
       modalType.value = 2
       modal.value = true
       form.value = row
}
const deleteClick = (row: any) => {
       modal.value = true
       modalType.value = 3
       form.value = row
}
const confirm = () => {
       modal.value = false
       if (modalType.value === 1) {
              tableData.value.push({ tableId: tableData.value.length + 1, no: tableData.value.length + 1, name: form.value.name })
       } else if (modalType.value === 2) {
              toast.success("修改成功!");
              const index = tableData.value.findIndex((item: any) => item.tableId === form.value.tableId);
              tableData.value[index].name = form.value.name;
       } else if (modalType.value === 3) {
              toast.success("删除成功!");
       }
       reset()
}
const copy = () => {
       toast.success("复制好了📋");
};
</script>
<style scoped lang="scss"></style>
