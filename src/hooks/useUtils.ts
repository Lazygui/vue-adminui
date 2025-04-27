import { storage, StorageKeys } from "@/hooks/useLocalStore"
import { useFequest } from '@/hooks/useFech'
const fequest = useFequest();
/**
 * 阻塞线程指定毫秒数
 * @param ms 等待的毫秒数
 * @returns Promise<void> 等待结束后resolve
 */
const wait = async (ms: number): Promise<void> => {
       return new Promise(resolve => setTimeout(resolve, ms))
}

const diffSystem = async (): Promise<"admin" | "user"> => {
       let system = 'user'
       const includes = location.hash.includes('/admin') || location.hash.includes('/user')
       if (includes) {
              system = location.hash.split('/')[1]
       } else {
              const res: any = await fequest(`${location.origin}/config.json`, { method: 'get', passRouter: true })
              storage.setItem(StorageKeys.CONFIG, JSON.stringify(res))
              system = res.system
       }
       return system as 'admin' | 'user'
}
export {
       wait,
       diffSystem
}