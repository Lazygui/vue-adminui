// storage的二次封装
export enum StorageKeys {
       TOKEN = "TOKEN",
       ROLE = "ROLE",
       USER_ID = "USER_ID",
       USERNAME = "USERNAME",
       REFRESH = "REFRESH",
       LAST_PATH = "LAST_PATH",
       THEME = 'THEME',
       PASSWORD = 'PASSWORD'
}
interface IStorage {
       setItem: (key: StorageKeys, val: any) => void;
       getItem: <T>(key: StorageKeys) => T;
       clearItem: (key: StorageKeys) => void;
       clearAll: () => void;
}
export const storage = ((): IStorage => {
       const getStorage = () => {
              return window.localStorage;
       }
       const getExclusive = (key: StorageKeys) => {
              return `${key}_EXCL`;
       }
       const setItem = (key: StorageKeys, val: any) => {
              const localStorage = getStorage();
              // 为当前对象添加 需要存储的值
              localStorage.setItem(getExclusive(key), val);
       }
       const getItem = <T>(key: StorageKeys) => {
              return getStorage().getItem(getExclusive(key)) as T;
       }
       // 清空 当前的项目下命名存储的空间 该key项的 Storage 数据
       const clearItem = (key: StorageKeys) => {
              const localStorage = getStorage();
              delete localStorage[getExclusive(key)];
       }
       const clearAll = () => {
              window.localStorage.clear();
       }
       return {
              clearAll,
              setItem,
              getItem,
              clearItem
       }
})() 
