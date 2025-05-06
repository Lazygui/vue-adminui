<template>
       <component :is="icon" :class="props.isSize ? 'w-5 h-5' : ''" />
</template>

<script lang="ts" setup>
import * as heroIcons from "@heroicons/vue/24/outline";
const props = withDefaults(
       defineProps<{
              name: string;
              isSize?: boolean;
       }>(),
       {
              isSize: true
       }
);
const icon = computed(() => {
       let name = "";
       props.name.split("-").forEach((v) => {
              name += v[0].toUpperCase() + v.substr(1);
       });
       return heroIcons[(name + "Icon") as keyof typeof heroIcons];
});
</script>
