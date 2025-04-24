/**
 * 阻塞线程指定毫秒数
 * @param ms 等待的毫秒数
 * @returns Promise<void> 等待结束后resolve
 */
const wait = async (ms: number): Promise<void> => {
       return new Promise(resolve => setTimeout(resolve, ms))
}

import { storage, StorageKeys } from "./useLocalStore"
import { useFequest } from "./useFech"
const fequest = useFequest()

const diffSystem = async () => {
       let system = ''
       const includes = location.hash.includes('/admin') || location.hash.includes('/user')
       if (includes) {
              system = location.hash.split('/')[1]
              storage.setItem(StorageKeys.CONFIG, JSON.stringify({ system }))
       } else {
              const configuration: any = await fequest(`${location.origin}/config.json`, { method: 'get' })
              if (configuration) {
                     system = configuration.system
                     storage.setItem(StorageKeys.CONFIG, JSON.stringify(configuration))
              }
       }
}
export {
       wait,
       diffSystem
}