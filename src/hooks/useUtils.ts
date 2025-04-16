/**
 * 阻塞线程指定毫秒数
 * @param ms 等待的毫秒数
 * @returns Promise<void> 等待结束后resolve
 */
const wait = async (ms: number): Promise<void> => {
       return new Promise(resolve => setTimeout(resolve, ms))
}

export {
       wait
}