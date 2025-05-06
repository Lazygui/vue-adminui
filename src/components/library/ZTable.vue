<script setup lang="ts">
interface Column {
       title: string;
       key?: string;
       render?: (item: any) => HTMLElement;
       className?: string;
}
const props = withDefaults(
       defineProps<{
              columns: Column[];
       }>(),
       {}
);
</script>

<template>
       <div class="ZTable mt-6 flow-root">
              <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8" style="max-height: calc(100vh - 300px); overflow-y: auto">
                     <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table class="table table-zebra w-full">
                                   <thead>
                                          <tr>
                                                 <th v-for="column in props.columns" :key="column.key" :class="column.className || ''">
                                                        {{ column.title }}
                                                 </th>
                                          </tr>
                                   </thead>
                            </table>
                     </div>
              </div>
       </div>
</template>

<style scoped lang="scss"></style>
