import vue from "@vitejs/plugin-vue";
import path from "path";
import autoImport from "unplugin-auto-import/vite";
import { defineConfig } from "vite";
import AutoImportOptions from "./src/vite-plugin/options/unplugin-auto-import";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
       plugins: [vue(), autoImport(AutoImportOptions), tailwindcss()],
       server: {
              port: 8080
       },
       resolve: {
              alias: {
                     "@": path.resolve(__dirname, "./src"),
                     "@admin": path.resolve(__dirname, "./src/pages/components"),
                     "@svg": path.resolve(__dirname, "./src/components/svg/index.vue")
              }
       }
});
