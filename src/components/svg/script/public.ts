import { h } from 'vue';
import type { FunctionalComponent, CSSProperties } from 'vue';
// 定义统一的图标属性类型
export interface IconProps {
       ariaLabel?: string
       /** 填充颜色 */
       fill?: string;
       /** 描边颜色 */
       stroke?: string;
       /** 描边宽度 */
       strokeWidth?: number | string;
       /** 自定义 class */
       class?: string | Record<string, boolean> | (string | Record<string, boolean>)[];
       /** 行内样式 */
       style?: CSSProperties;
       viewBox?: string;
}
export const defineIcon = (path: { [key: string]: string }): FunctionalComponent<IconProps> => {
       return (props) => h('svg', {
              'aria-label': props.ariaLabel,
              xmlns: 'http://www.w.w3.org/2000/svg',
              fill: props.fill ?? 'none',
              viewBox: props.viewBox ?? '0 0 24 24',
              stroke: props.stroke ?? 'currentColor',
              'stroke-width': props.strokeWidth ?? 1.5,
              class: ['size-6', props.class],
              style: props.style
       }, [h('path', { ...path })]);
}