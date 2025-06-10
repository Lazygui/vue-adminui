import type { RouteRecordRaw } from "vue-router";
export const admin: RouteRecordRaw[] = [
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
                     name: "基础页",
                     icon: "CircleStack"
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
              children: [
                     {
                            path: "button",
                            component: () => import("@admin/component/ButtonShow.vue"),
                            meta: {
                                   name: "Button 按钮",
                            },
                     },
                     {
                            path: "modal",
                            component: () => import("@admin/component/ModalShow.vue"),
                            meta: {
                                   name: "Modal 模态窗",
                            },
                     },
                     {
                            path: "upload",
                            component: () => import("@admin/component/UploadShow.vue"),
                            meta: {
                                   name: "Upload 上传",
                            },
                     },
                     {
                            path: "verify",
                            component: () => import("@admin/component/VerifyShow.vue"),
                            meta: {
                                   name: "Verify 验证器",
                            },
                     },
                     {
                            path: "select",
                            component: () => import("@admin/component/SelectShow.vue"),
                            meta: {
                                   name: "Select 选择器",
                            },
                     }
              ]
       }
]