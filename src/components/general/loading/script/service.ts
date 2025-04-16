/**
 * Loading 服务实现
 *
 * 提供全局 Loading 控制功能，支持：
 * 1. 全屏加载
 * 2. 指定容器内加载
 * 3. 自定义加载组件
 * 4. 多实例管理
 */

import { h, render, type Component } from 'vue'

/**
 * Loading 配置选项
 */
type LoadingOptions = {
       /** 加载提示文本 */
       text?: string
       /** 背景色 */
       background?: string
       /** 自定义加载组件 */
       component?: Component | null
}

/**
 * Loading 实例对象
 */
type LoadingInstance = {
       /** 卸载方法 */
       unmount: () => void
       /** 挂载容器 */
       container?: HTMLElement
       /** 定位元素 */
       positioner?: HTMLElement
}

/**
 * Loading 服务接口
 */
type LoadingService = {
       /**
        * 显示 Loading
        * @param config Loading 配置
        * @param target 目标容器元素或选择器
        * @returns Loading 实例
        */
       show: (config?: LoadingOptions, target?: HTMLElement | string) => LoadingInstance
       /**
        * 隐藏 Loading
        * @param target 目标容器元素或选择器
        */
       hidden: (target?: HTMLElement | string) => void
       /** 销毁所有 Loading 实例 */
       destroyAll: () => void
}

const INSTANCE_MAP = new Map<HTMLElement, LoadingInstance>()

/**
 * 默认 Loading 组件
 */
const DefaultLoading = {
       props: {
              /** 加载提示文本 */
              text: String,
              /** 背景色 */
              background: String,
              /** 自定义加载组件 */
              component: Object
       },
       render(ctx: any) {
              return h('div', { class: 'z-loading' }, [
                     h('div', { class: 'z-loading-spinner' }, [
                            ctx.component
                                   ? h(ctx.component, { text: ctx.text })
                                   : [
                                          h('svg', {
                                                 class: 'circular',
                                                 viewBox: '0 0 50 50'
                                          }, [
                                                 h('circle', {
                                                        class: 'path',
                                                        cx: '25',
                                                        cy: '25',
                                                        r: '20',
                                                        fill: 'none'
                                                 })
                                          ]),
                                          ctx.text && h('p', { class: 'z-loading-text' }, ctx.text)
                                   ]
                     ])
              ])
       }
}

export const Loading: LoadingService = {
       /**
        * 显示 Loading
        * @param config Loading 配置
        * @param target 目标容器元素或选择器
        * @returns Loading 实例
        */
       show(config: LoadingOptions = {}, target?: HTMLElement | string) {
              try {
                     const container = resolveTarget(target)
                     const fullscreen = !target

                     // 复用已有实例
                     const existing = INSTANCE_MAP.get(container)
                     if (existing) {
                            if (existing.positioner) {
                                   existing.positioner.style.display = 'block'
                            }
                            return existing
                     }

                     // 创建定位容器
                     const positioner = document.createElement('div')
                     container.appendChild(positioner)

                     // 添加父级定位
                     if (!fullscreen) {
                            container.classList.add('z-loading-parent--relative')
                     }

                     // 创建/更新组件
                     const vnode = h(DefaultLoading, {
                            text: config.text,
                            background: config.background,
                            component: config.component
                     })

                     render(vnode, positioner)

                     // 保存实例引用
                     const instance: LoadingInstance = {
                            unmount: () => {
                                   if (positioner) {
                                          positioner.style.display = 'none'
                                   }
                                   if (!fullscreen) {
                                          container.classList.remove('z-loading-parent--relative')
                                   }
                            },
                            container,
                            positioner
                     }

                     INSTANCE_MAP.set(container, instance)

                     return instance
              } catch (e) {
                     return { unmount: () => { } }
              }
       },

       /**
        * 隐藏 Loading
        * @param target 目标容器元素或选择器
        */
       hidden(target?: HTMLElement | string) {
              const container = resolveTarget(target)
              const instance = container && INSTANCE_MAP.get(container)
              instance?.unmount()
       },
       /**
        * 销毁所有 Loading 实例
        */
       destroyAll() {
              Array.from(INSTANCE_MAP.entries()).forEach(([container, instance]) => {
                     if (instance.container) {
                            render(null, instance.container)
                            instance.container.remove()
                            container.classList.remove('z-loading-parent--relative')
                     }
              })
              INSTANCE_MAP.clear()
       }
}

/**
 * 解析目标容器元素
 * @param target 目标容器元素或选择器
 * @returns 解析后的 DOM 元素
 */
function resolveTarget(target?: HTMLElement | string | null): HTMLElement {
       if (!target) return document.body
       return typeof target === 'string'
              ? document.querySelector(target) as HTMLElement
              : target
}

