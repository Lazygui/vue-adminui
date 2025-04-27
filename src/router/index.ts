import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";
import { storage, StorageKeys } from "@/hooks/useLocalStore";
import { Fequest } from "@/hooks/useFech";
import { diffSystem } from "@/hooks/useUtils";
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
                            component: () => import("@/pages/Login.vue"),
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


/**
 * 判断凭证是否过期
 * 暂用账号及密码的凭证过期判断，后续需要可修改为全局的凭证过期判断
 */
const isExpire = () => {
       const username = storage.getItem(StorageKeys.USERNAME)
       const password = storage.getItem(StorageKeys.PASSWORD)
       if (username && password) {
              return false
       }
       return true
}
router.beforeEach(async (to, from, next) => {
       storage.setItem(StorageKeys.LAST_PATH, from.fullPath)
       //用户首次进入地址，判断用户需要进入哪个系统
       if (from.path === '/' || from.path === to.path) {
              const system = await diffSystem()
              if (isExpire()) {
                     //防止无限重定向
                     return to.path === '/login' ? next() : next('/login');
              }
              return next(`/${system}`);
       }
       if (isExpire()) {
              return to.path === '/login' ? next() : next('/login');
       }
       //路由跳转之前清除上个页面的所有网络请求
       Fequest.abortAll();
       next();
});
