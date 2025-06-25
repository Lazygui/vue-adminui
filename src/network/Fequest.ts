export interface CommonResult<T> {
       code: number;
       message: string;
       data: T;
}

export interface Rej<T = never> {
       reason: string;
       obj?: T;
}
export interface RequestConfig {
       body?: Blob | FormData | URLSearchParams | Object;
       method: "post" | "get";
       header?: Record<string, string> | Headers;
       param?: Record<string, string>;
       responseType?: any;
       passRouter?: boolean
}
interface Config {
       baseURL: string;
       mode?: RequestMode;
       credentials?: RequestCredentials;
       timeout?: number;
}
export class Fequest {
       private static requestControllers = new Map<string, AbortController>();

       constructor(private config: Config) {
              //端口前缀以/结尾去掉/
              if (config.baseURL.endsWith("/")) {
                     this.config.baseURL = config.baseURL.substring(0, config.baseURL.length - 1);
              }
       }
       public create = () => {
              return this.instance.bind(this);
       }

       public instance = async <T>(url: string, reqCfg: RequestConfig): Promise<CommonResult<T>> => {
              let targetURL;
              if (url.startsWith("http")) {
                     targetURL = new URL(url);
              } else {
                     targetURL = new URL(url, this.config.baseURL);
              }
              const headers = new Headers(reqCfg.header)
              //get请求处理
              if (reqCfg.method === 'get' && reqCfg.param) {
                     for (const key in reqCfg.param) {
                            targetURL.searchParams.set(key, reqCfg.param[key]);
                     }
              }
              //post请求处理
              if (reqCfg.method === 'post' && reqCfg.body) {
                     const ContentType = headers.get("Content-Type")
                     if (ContentType && ContentType === "multipart/form-data") {
                            if (!(reqCfg.body instanceof FormData)) {
                                   const formData = new FormData();
                                   for (const key in reqCfg.body) {
                                          formData.append(key, (reqCfg.body as Record<string, any>)[key]);
                                   }
                                   reqCfg.body = formData;
                            }
                            headers.delete("Content-Type");
                     } else if (ContentType === "application/x-www-form-urlencoded") {
                            const params = new URLSearchParams();
                            for (const key in reqCfg.body) {
                                   params.append(key, (reqCfg.body as Record<string, any>)[key]);
                            }
                            reqCfg.body = params;
                     } else {
                            //判断后自动 JSON string
                            reqCfg.body = JSON.stringify(reqCfg.body);
                            headers.set("Content-Type", "application/json");
                     }
              }
              //请求中止器
              const controller = new AbortController();
              const { signal } = controller;


              // 中止相同URL的前一个请求并存储新的controller
              if (Fequest.requestControllers.has(url)) {
                     Fequest.requestControllers.get(url)?.abort();
              }
              if (!reqCfg.passRouter) {
                     Fequest.requestControllers.set(url, controller);
              }

              //发请求前走一走拦截器
              const fetchParams = {
                     mode: this.config.mode,
                     credentials: this.config.credentials,
                     body: reqCfg.body,
                     headers: headers,
                     method: reqCfg.method,
                     signal: signal
              } as RequestInit

              let fe = fetch(targetURL.toString(), fetchParams);
              //超时设置
              let timerHandler: any = undefined;
              let timer = new Promise<never>((_, reject) => {
                     timerHandler = setTimeout(() => {
                            controller.abort();
                            reject({ reason: `请求超时==>${url}` })
                     }, this.config.timeout || 10000);
              });
              try {
                     const res = await Promise.race([timer, fe]);
                     clearTimeout(timerHandler);
                     Fequest.requestControllers.delete(url);
                     if (!res.ok) {
                            return Promise.reject({
                                   reason: `none respond, code is ${res.status}`,
                                   obj: res
                            } as Rej<Response>);
                     }
                     let out
                     switch (reqCfg.responseType) {
                            case "blob":
                                   out = await res.blob()
                                   break;
                            case "text":
                                   out = await res.text();
                                   break;
                            case "arraybuffer":
                                   out = await res.arrayBuffer();
                                   break;
                            default:
                                   out = await res.json()
                                   break;
                     }
                     return Promise.resolve(out);
              } catch (error: any) {
                     if (timerHandler) {
                            clearTimeout(timerHandler);
                     }
                     Fequest.requestControllers.delete(url);
                     return Promise.reject((error as Rej).reason);
              }
       }

       public static abortAll() {
              Fequest.requestControllers.forEach(controller => controller.abort());
              Fequest.requestControllers.clear();
       }
}