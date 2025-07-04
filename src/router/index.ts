import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";
import { storage, StorageKeys } from "@/hooks/useLocalStore";
import { Fequest } from "@/hooks/useFech";
import { isExpire } from "@/hooks/private/useUtils";
import {admin} from "./admin"
/**
 * 路由配置
 * meta
 * ----name：页面名称
 * ----icon：图标（src/components/svg/components中添加图标组件）
 */
export const routes: RouteRecordRaw[] = [
       {
              path: "/",
              redirect: "/login"
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
              children: admin
       },
       {
              path: "/user",
              component: () => import("@/pages/Login.vue")
       },
       {
              path: "/:pathMatch(.*)*",
              component: () => import("@/components/layout/NotFound.vue")
       }
];

export const router = createRouter({
       history: createWebHashHistory(import.meta.env.BASE_URL),
       routes
});
router.beforeEach(async (to, from, next) => {
       storage.setItem(StorageKeys.LAST_PATH, from.fullPath);
       //路由跳转之前清除上个页面的所有网络请求
       Fequest.abortAll();
       //凭证失效
       if (isExpire()) {
              if (to.path === "/login" || from.path === "/login") {
                     return next();
              }
              return next("/login");
       }
       next();
});
