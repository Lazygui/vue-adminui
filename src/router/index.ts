import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";
import { storage, StorageKeys } from "@/hooks/useLocalStore";
import { Fequest } from "@/hooks/useFech";
import { isExpire } from "@/hooks/useUtils";
export const routes: RouteRecordRaw[] = [
       {
              path: "/",
              redirect: "/login",
       },
       {
              path: "/login",
              component: () => import("@/pages/Login.vue"),
              meta: {
                     name: "登录"
              }
       },
       {
              path: "/admin",
              component: () => import("@/components/layout/Main.vue"),
              redirect: "/admin/home",
              children: [
                     {
                            path: "home",
                            component: () => import("@/pages/Dashboard.vue"),
                            meta: {
                                   name: "仪表盘"
                            },
                     },
                     {
                            path: "show",
                            component: () => import("@/pages/Login.vue"),
                            meta: {
                                   name: "组件展示"
                            },
                     }
              ]
       },
       {
              path: "/user",
              component: () => import("@/pages/Login.vue"),
       }
];


export const router = createRouter({
       history: createWebHashHistory(import.meta.env.BASE_URL),
       routes,
});
router.beforeEach(async (_to, from, next) => {
       storage.setItem(StorageKeys.LAST_PATH, from.fullPath)
       //路由跳转之前清除上个页面的所有网络请求
       Fequest.abortAll();
       if (isExpire()) {
              return next('/login');
       }
       next();
});
