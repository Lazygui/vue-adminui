/**
 * 防抖函数
 * @param func 需要防抖的函数
 * @param wait 等待时间，单位毫秒（默认 300ms）
 * @param immediate 是否立即执行（默认 false）
 * @returns 返回防抖后的函数
 */
export const useDebounce=  <T extends (...args: any[]) => any> (
    func: T,
    wait: number = 300,
    immediate: boolean = false
  ): ((...args: Parameters<T>) => void) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
  
    return (...args: Parameters<T>): void => {
      const context = this;
  
      // 如果 timeout 存在，清除之前的计时器
      if (timeout) {
        clearTimeout(timeout);
      }
  
      // 如果是立即执行模式
      if (immediate) {
        // 如果 timeout 为 null，表示可以立即执行
        const callNow = !timeout;
        // 设置 timeout，等待 wait 时间后重置
        timeout = setTimeout(() => {
          timeout = null;
        }, wait);
        // 如果满足立即执行条件，则调用函数
        if (callNow) {
          func.apply(context, args);
        }
      } else {
        // 非立即执行模式，等待 wait 时间后调用函数
        timeout = setTimeout(() => {
          func.apply(context, args);
        }, wait);
      }
    };
  };