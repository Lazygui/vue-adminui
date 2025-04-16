export default {
       //只对vue文件有效
       include: [
              /\.vue$/,
              /\.vue\?vue/ // .vue
       ],
       imports: [
              {
                     'vue': [
                            'ref',
                            'onMounted',
                            'onUnmounted',
                            'computed',
                            'watch',
                            'watchEffect',
                            'defineComponent',
                            'defineProps',
                            'defineEmits',
                     ],
                     'vue-router': [
                            'useRouter',
                            'useRoute',
                     ]
              }
       ],
       dts: "./src/vite-plugin/.d.ts/auto-import.d.ts",
       dirs: ["./src/hooks"]
}