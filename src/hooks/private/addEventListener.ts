import { onUnmounted,  watch, type Ref } from 'vue';

/**
 * 一个简单的 addEventListener Hook
 * @param target - 事件目标（如 window、document、HTMLElement 或 ref，可选）
 * @param event - 事件名称
 * @param listener - 事件监听器函数
 * @param options - 事件监听器选项（可选）
 * @returns 一个手动卸载的函数
 */
export function useEventListener<T extends Event>(
  target: Ref<EventTarget | null | undefined> | EventTarget,
  event: string,
  listener: (event: T) => void,
  options?: boolean | AddEventListenerOptions
): () => void;

export function useEventListener<T extends Event>(
  event: string,
  listener: (event: T) => void,
  options?: boolean | AddEventListenerOptions
): () => void;

export  function useEventListener<T extends Event>(
  ...args:
    | [Ref<EventTarget | null | undefined> | EventTarget, string, EventListenerOrEventListenerObject, (boolean | AddEventListenerOptions)?]
    | [string, EventListenerOrEventListenerObject, (boolean | AddEventListenerOptions)?]
): () => void {
  // 解析参数
  let target: Ref<EventTarget | null | undefined> | EventTarget;
  let event: string;
  let listener: (event: T) => void;
  let options: boolean | AddEventListenerOptions | undefined;

  if (args.length >= 3) {
    // 如果参数数量为 3 或 4，第一个参数是 target
    //@ts-ignore
    [target, event, listener, options] = args;
  } else {
    // 如果参数数量为 2 或 3，第一个参数是 event，默认 target 为 window
    //@ts-ignore
    [event, listener, options] = args;
    target = window;
  }

  // 用于存储清理函数
  let cleanup: (() => void) | null = null;

  // 注册事件监听器
  const register = () => {
    let el: EventTarget | null | undefined;

    // 如果 target 是 ref，获取其值
    if (typeof target === 'object' && 'value' in target) {
      el = target.value;
    } else if (target instanceof EventTarget) {
      el = target;
    }

    if (el) {
      el.addEventListener(event, listener as EventListener, options);
      cleanup = () => el!.removeEventListener(event, listener as EventListener, options);
    }
  };

  // 自动卸载逻辑
  onUnmounted(() => {
    if (cleanup) cleanup();
  });

  // 如果目标是 ref，监听其变化
  if (typeof target === 'object' && 'value' in target) {
    watch(target, () => {
      if (cleanup) cleanup(); // 清理旧的事件监听器
      register(); // 注册新的事件监听器
    }, { immediate: true });
  } else {
    register(); // 直接注册事件监听器
  }

  // 返回手动卸载的函数
  return () => {
    if (cleanup) cleanup();
  };
}