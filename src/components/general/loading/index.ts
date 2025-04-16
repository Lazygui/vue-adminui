/**
 * 封装v-loading指令以及loading编程式调用
 * 指令目标：创建一个loading效果挂载目标元素/body上
 */
import type { App, Plugin } from 'vue'
import { vLoading } from './script/directive'
import './style/index.css'


export { Loading } from './script/service'

export default {
       install(app: App) {
              app.directive('loading', vLoading)
       },
} as Plugin