import { onUnmounted,  type Ref } from 'vue';

type ElementTarget = HTMLElement | SVGElement | undefined | null;
type ResizeCallback = (entries: ResizeObserverEntry[] | Event) => void;
export function useResize(
  target: Ref<ElementTarget | Window> | ElementTarget | Window,
  callback: ResizeCallback
): () => void;
export function useResize(...args: any[]): () => void {
    // 双参数：自定义target
   const [target, callback] = args;


  let observer: ResizeObserver | null = null;
  let cleanup = () => {};

  // 监听逻辑
  const createObserver = (el: HTMLElement) => {
    // 清理旧的监听
    cleanup();
      // Element 使用 ResizeObserver
      observer = new ResizeObserver(entries => callback(entries));
      observer.observe(el);
      cleanup = () => {
        observer?.unobserve(el!);
        observer?.disconnect();
        observer = null;
      };
    
  };
    createObserver(target as HTMLElement);

  // 组件卸载时自动清理
  onUnmounted(() => cleanup());

  // 返回手动清理方法
  return () => cleanup();
}