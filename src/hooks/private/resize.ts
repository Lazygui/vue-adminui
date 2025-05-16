import { onUnmounted, watch, type Ref } from 'vue';

type ElementTarget = HTMLElement | SVGElement | undefined | null;
type ResizeCallback = (entries: ResizeObserverEntry[] | Event) => void;

// 函数重载类型定义
export function useResize(callback: ResizeCallback): () => void;
export function useResize(
  target: Ref<ElementTarget | Window> | ElementTarget | Window,
  callback: ResizeCallback
): () => void;
export function useResize(...args: any[]): () => void {
  // 参数解析
  let target: Ref<ElementTarget | Window> | ElementTarget | Window;
  let callback: ResizeCallback;
  
  if (args.length === 1) {
    // 单参数：默认监听window
    callback = args[0];
    target = window;
  } else {
    // 双参数：自定义target
    [target, callback] = args;
  }

  let observer: ResizeObserver | null = null;
  let cleanup = () => {};

  // 判断目标类型
  const isWindow = (el: any): el is Window => el === window;
  const isRef = (obj: any): obj is Ref => 'value' in obj;

  // 监听逻辑
  const createObserver = (el: ElementTarget | Window) => {
    // 清理旧的监听
    cleanup();

    if (isWindow(el)) {
      // Window 使用 resize 事件
      const handler = (e: Event) => callback(e);
      window.addEventListener('resize', handler);
      cleanup = () => {
        window.removeEventListener('resize', handler);
        cleanup = () => {};
      };
    } else if (el) {
      // Element 使用 ResizeObserver
      observer = new ResizeObserver(entries => callback(entries));
      observer.observe(el);
      cleanup = () => {
        observer?.unobserve(el!);
        observer?.disconnect();
        observer = null;
      };
    }
  };

  // 处理响应式 target
  if (isRef(target)) {
    const stopWatch = watch(
      () => target.value,
      (newVal) => {
        createObserver(newVal!);
      },
      { immediate: true }
    );

    // 添加 watch 清理逻辑
    const originalCleanup = cleanup;
    cleanup = () => {
      originalCleanup();
      stopWatch();
    };
  } 
  // 处理静态 target
  else {
    createObserver(target);
  }

  // 组件卸载时自动清理
  onUnmounted(() => cleanup());

  // 返回手动清理方法
  return () => cleanup();
}