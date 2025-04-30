import * as echarts from "echarts/core";
import { BarChart, LineChart, PieChart, GaugeChart } from "echarts/charts";
import {
       TitleComponent,
       DataZoomComponent,
       TooltipComponent,
       GridComponent,
       // 数据集组件
       DatasetComponent,
       // 内置数据转换器组件 (filter, sort)
       TransformComponent,
       LegendComponent
} from "echarts/components";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import type {
       // 系列类型的定义后缀都为 SeriesOption
       BarSeriesOption,
       LineSeriesOption,
       PieSeriesOption,
       GraphSeriesOption
} from "echarts/charts";
import type {
       DataZoomComponentOption,
       // 组件类型的定义后缀都为 ComponentOption
       TitleComponentOption,
       TooltipComponentOption,
       GridComponentOption,
       DatasetComponentOption,
       LegendComponentOption
} from "echarts/components";
import type { ComposeOption } from "echarts/core";

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = ComposeOption<
       | BarSeriesOption
       | LineSeriesOption
       | PieSeriesOption
       | GraphSeriesOption
       | TitleComponentOption
       | TooltipComponentOption
       | GridComponentOption
       | DatasetComponentOption
       | LegendComponentOption
       | DataZoomComponentOption
>;

// 注册必须的组件
echarts.use([
       DataZoomComponent,
       TitleComponent,
       TooltipComponent,
       GridComponent,
       DatasetComponent,
       TransformComponent,
       LegendComponent,
       //柱图
       BarChart,
       //线图
       LineChart,
       //饼图
       PieChart,
       //环形图
       GaugeChart,
       LabelLayout,
       UniversalTransition,
       CanvasRenderer
]);

export default echarts;
