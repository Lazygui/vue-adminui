import { Fequest } from "@/network/FequestInstance";
import type { CommonResult, RequestConfig } from "@/network/FequestInstance";
import fequest from "@/network/FequestInstance";
const useFequest = () => {
       return async  <T>(url: string, reqCfg: RequestConfig): Promise<CommonResult<T> | null> => {
              let res: CommonResult<T> | null = null;
              try {
                     res = await fequest(url, {
                            ...reqCfg,
                            header: {
                                   ...reqCfg.header,
                                   // Authorization: `Bearer ${token}`
                            }
                     });
              } catch (error) {
              }
              return res;
       };
}

export type { CommonResult }
export { useFequest, Fequest }