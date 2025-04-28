import type { FunctionalComponent } from "vue";
import { defineIcon, type IconProps } from "../script/public";

// 用户图标
const Bars3: FunctionalComponent<IconProps> = defineIcon({
       'stroke-linecap': 'round',
       'stroke-linejoin': 'round',
       d: 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
})
export { Bars3 as Bars3Icon }
