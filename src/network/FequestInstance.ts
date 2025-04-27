import { Fequest } from "./Fequest";
import type { CommonResult, RequestConfig } from "./Fequest"
const httpUrl = (): `${'http' | 'https'}://${string}` => {
       let http: string | undefined = import.meta.env.API_URL;
       if (!http) {
              const { hostname, port } = window.location;
              http = import.meta.env.VITE_API_URL;
              if (!http) {
                     http = `http://${hostname}:${port}`;
              }
       }
       return http as `${'http' | 'https'}://${string}`;
};
export type { CommonResult, RequestConfig }
export { httpUrl, Fequest }
export default new Fequest({
       baseURL: httpUrl(),
       credentials: "omit",
       timeout: 15000,
       mode: "cors"
}).create();
