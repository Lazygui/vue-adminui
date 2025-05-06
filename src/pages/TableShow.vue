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
                     :columns="[
                            {
                                   title: '序号',
                                   key: 'no',
                                   className: 'font-bold'
                            },
                            {
                                   title: '名称',
                                   key: 'name',
                                   className: 'font-bold'
                            }
                     ]"
              ></z-table>
       </div>
</template>
<script lang="ts" setup>
import ZTable from "@/components/library/ZTable.vue";
</script>
<style scoped lang="scss">
.TableShow {
       // border: 1px solid red;
       box-sizing: border-box;
       margin-top: 20px;
}
</style>
