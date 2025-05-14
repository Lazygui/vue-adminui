import echarts from "./private/echarts";
import type { ECOption,EChartsType } from "./private/echarts";
export class Echarts {
       private echartInstance: EChartsType | null = null;
       constructor() {}
       public init = (html: HTMLElement | undefined | null): EChartsType |null=> {
              if (!html) {
                     console.error("HTML element is null or undefined");
                     return this.echartInstance;
              }
              if (this.echartInstance === null) {
                     this.echartInstance = echarts.init(html);
              }
              return this.echartInstance
       };
       public render = (option: ECOption): void => {
              if (!option) {
                     console.error("option is null or undefined");
                     return;
              }
              if (this.echartInstance !== null && !this.echartInstance.isDisposed()) {
                     this.echartInstance.clear();
                     this.echartInstance.setOption(option);
              } else {
                     console.error("echartInstance is null or undefined");
              }
       };

       /**
        * 销毁echarts实例
        */
       public dispose = (): void => {
              if (this.echartInstance !== null && !this.echartInstance.isDisposed()) {
                     this.echartInstance.dispose();
              }
              this.echartInstance = null;
       };
}
