/**
 * svg图标库
 * 基于https://heroicons.com/
 */

export * from './script'
import * as InternalIcons from './script'
import type { App } from 'vue'
/**
 * 类型定义：为原始图标名称添加"Icon"后缀的类型映射
 * 示例：原名为"User"的图标将变为"UserIcon"类型
 */
type SuffixedIconsType = {
       [K in keyof typeof InternalIcons]: typeof InternalIcons[K]
}
/**
 * 类型声明扩展：将带后缀的图标类型合并到Vue全局组件声明
 */
declare module 'vue' {
       export interface GlobalComponents extends SuffixedIconsType { }
}

/**
 * Vue插件：自动全局注册所有图标组件
 * 使用方法：在main.ts中通过 app.use(IconPlugin) 注册
 */
export const IconPlugin = {
       install(app: App) {
              Object.entries(InternalIcons).forEach(([name, component]) => {
                     app.component(name, component)
              })
       }
}