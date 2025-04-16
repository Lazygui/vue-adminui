/**
 * Vue加载状态指令模块
 * 
 * 本模块提供v-loading指令，用于在元素上显示加载状态指示器
 * 支持自定义加载图标、文本、颜色等多种配置选项
 * 
 * 导出的v-loading指令可通过以下属性配置：
 * - loading-text         : 加载提示文本
 * - loading-svg         : 自定义SVG图标代码
 * - loading-background  : 加载层背景色
 * - loading-svg-color   : SVG图标颜色
 * - loading-text-color  : 文本颜色
 * - loading-fontSize    : 文本字号
 * 
 * 示例用法：
 * <div v-loading="isLoading" 
 *      loading-text="加载中..."
 *      loading-svg="<svg>...</svg>"
 *      loading-background="rgba(255,255,255,0.8)"
 *      loading-svg-color="#409eff"
 *      loading-text-color="#333"
 *      loading-fontSize="14px">
 * </div>
 */

import { createApp, h, type Directive, type VNode, shallowReactive } from 'vue'

/**
 * 唯一符号标识，用于在DOM元素上存储加载实例
 */
const Z_Loading = Symbol('ZLoading')

/**
 * 默认加载动画SVG组件
 */
const defaultSvg = h('svg', { class: 'circular', viewBox: '0 0 50 50' }, [
       h('circle', { class: 'path', cx: '25', cy: '25', r: '20', fill: 'none' })
]);

/**
 * 扩展HTMLElement类型，添加自定义加载实例存储属性
 */
export interface ElementLoading extends HTMLElement {
       [Z_Loading]?: {
              options: DirectiveOptions      // 当前配置选项
              instance: LoadingInstance      // 加载实例对象
       }
}

/**
 * 指令配置选项接口
 */
interface DirectiveOptions {
       text?: string                      // 加载提示文本
       svg?: string                       // 自定义SVG图标代码
       background?: string                // 加载背景色
       svgColor?: string                  // SVG图标颜色
       textColor?: string                 // 文本颜色
       fontSize?: string                  // 文本字号
}

/**
 * 加载组件实例配置接口
 */
interface LoadingOptions {
       target: HTMLElement                // 挂载目标元素
       closed?: () => void                // 关闭回调函数
       beforeClose?: () => boolean | void // 关闭前验证钩子
}

/**
 * 加载实例方法接口
 */
interface LoadingInstance {
       open: () => void;                  // 显示加载状态
       close: () => void;                 // 隐藏加载状态
       update: (newOptions: DirectiveOptions) => void; // 更新配置
       destroy: () => void;              // 销毁实例并清理DOM
}

/**
 * 配置比较函数
 * @param a 旧配置对象
 * @param b 新配置对象
 * @returns 配置是否发生变化的布尔值
 */
const isOptionsChanged = (a: DirectiveOptions, b: DirectiveOptions): boolean => {
       return JSON.stringify(a) !== JSON.stringify(b);
};

/**
 * 创建加载组件实例
 * @param options 加载配置选项
 * @returns 加载实例对象
 */
const Loading = (options: LoadingOptions & DirectiveOptions): LoadingInstance => {

       // 使用浅层响应式对象存储状态
       const state = shallowReactive({ ...options })
       const { text, svg, background, svgColor, textColor, fontSize } = state
       const container = options.target
       const wrapper = document.createElement('div')
       container.style.position = 'relative'
       if (background) {
              wrapper.style.background = background
       }
       container.classList.add('z-loading-parent--relative')
       container.appendChild(wrapper)

       // 加载组件定义
       const component = {
              setup() {
                     return () => {
                            return h('div', {
                                   class: 'z-loading-spinner',
                            }, [
                                   svg ? h('div', {  // 自定义SVG
                                          innerHTML: svg,
                                          style: { color: svgColor }
                                   }) : defaultSvg,   // 默认SVG
                                   text && h('p', {  // 加载文本
                                          class: 'z-loading-text',
                                          style: { color: textColor, fontSize }
                                   }, text)
                            ])
                     }
              }
       }

       // 创建并挂载Vue实例
       const app = createApp(component)
       app.mount(wrapper)
       wrapper.className = 'z-loading'

       return {
              open: () => wrapper.style.display = 'flex',
              close: () => wrapper.style.display = 'none',
              update: (newOptions) => Object.assign(state, newOptions),
              destroy: () => {
                     app.unmount()
                     wrapper.remove()
              }
       }
}

/**
 * 创建或更新加载实例
 * @param el 目标元素
 * @param newOptions 新配置选项
 */
const createInstance = (el: ElementLoading, newOptions: DirectiveOptions) => {
       const existing = el[Z_Loading]
       if (existing) {
              // 配置变化时更新
              if (isOptionsChanged(existing.options, newOptions)) {
                     existing.instance.update(newOptions)
                     existing.options = newOptions
              }
              existing.instance.open()
       } else {
              // 创建新实例
              const instance = Loading({ target: el, ...newOptions })
              el[Z_Loading] = { options: newOptions, instance }
              instance.open()
       }
}

/**
 * 从VNode提取指令配置选项
 * @param vnode 虚拟节点对象
 * @returns 提取后的配置对象
 */
const extractOptions = (vnode: VNode): DirectiveOptions => {
       const el = vnode.el as HTMLElement
       const get = (name: string) => el.getAttribute(name) || undefined
       return {
              text: get('loading-text'),
              svg: get('loading-svg'),
              background: get('loading-background'),
              svgColor: get('loading-svg-color'),
              textColor: get('loading-text-color'),
              fontSize: get('loading-fontSize')
       }
}

/**
 * Vue加载指令实现
 */
export const vLoading: Directive = {
       mounted(el, binding, vnode) {
              if (binding.value) {
                     createInstance(el, extractOptions(vnode))
              }
       },
       updated(el, binding, vnode) {
              const options = extractOptions(vnode)
              if (binding.value) {
                     createInstance(el, options)
              } else {
                     el[Z_Loading]?.instance.close()
              }
       },
       unmounted(el) {
              el[Z_Loading]?.instance.destroy()
              delete el[Z_Loading]
       }
}