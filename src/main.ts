import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import directives from "./components/general/index";
import { router } from "@/router/index";
import "./scss/index.scss";
//全局svg注册
import { IconPlugin } from "@/components/svg";

const app = createApp(App);
app.use(IconPlugin);
app.use(router);
// app.component()
// 自动注册所有自定义指令
directives.forEach((directive) => {
       app.use(directive);
});
app.mount("#app");
