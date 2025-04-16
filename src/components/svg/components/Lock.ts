import type { FunctionalComponent } from "vue";
import { defineIcon, type IconProps } from "../script/public";

// 锁图标
const Lock: FunctionalComponent<IconProps> = defineIcon({
       'stroke-linecap': 'round',
       'stroke-linejoin': 'round',
       d: 'M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z'
})

export { Lock as LockIcon }