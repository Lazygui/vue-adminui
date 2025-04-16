import type { FunctionalComponent } from "vue";
import { defineIcon, type IconProps } from "../script/public";

// 用户图标
const User: FunctionalComponent<IconProps> = defineIcon({
       'stroke-linecap': 'round',
       'stroke-linejoin': 'round',
       d: 'M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
})
export { User as UserIcon }
