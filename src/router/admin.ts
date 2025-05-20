import type { RouteRecordRaw } from "vue-router";
export const admin:RouteRecordRaw[] = [
       {
              path: "home",
              component: () => import("@/pages/Dashboard.vue"),
              meta: {
                     name: "仪表盘",
                     icon: "Home"
              }
       },
       {
              path: "table",
              component: () => import("@/pages/TableShow.vue"),
              meta: {
                     name: "表格页",
                     icon: "TableCells"
              }
       },
       {
              path: "show",
              component: () => import("@/pages/ComponentDisplay.vue"),
              redirect: "/admin/show/button",
              meta: {
                     name: "组件展示",
                     icon: "Cube"
              },
              children:[
                     {
                            path: "button",
                            component: () => import("@/pages/components/component/ButtonShow.vue"),
                            meta: {
                                   name: "Button 按钮",
                            },    
                     },
                     {
                            path: "button",
                            component: () => import("@/pages/components/component/ModalShow.vue"),
                            meta: {
                                   name: "Modal 模态窗",
                            },    
                     }
              ]
       }
]