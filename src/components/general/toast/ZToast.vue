<!--
 * @FileDescription: 消息通知
 * @Author: zhouzhijun
 * @Date: 2025-5-7
 * @Version: 1.0.0
 * 1.0.0 /:实现消息通知组件的基本样式，位置上中，类型错误，动画开始结束过渡。
 -->
<template>
       <div
              class="toaster_row"
              :id="`toaster_${props.id}`"
              style="
                     left: 16px;
                     right: 16px;
                     display: flex;
                     position: absolute;
                     transition: 230ms cubic-bezier(0.21, 1.02, 0.73, 1);
                     top: 16px;
                     justify-content: center;
              "
              :style="`transform: translateY(${props.offset}px);`"
       >
              <div class="toaster_card" :class="{ toaster_leave: !visible, toaster_enter: visible }">
                     <div class="toaster_Icon">
                            <div class="toaster_loading"></div>
                            <div class="toaster_type">
                                   <div class="toaster_error"></div>
                            </div>
                     </div>
                     <div role="status" aria-live="polite" class="toaster_message">{{ props.message }}</div>
              </div>
       </div>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
const props = withDefaults(
       defineProps<{
              id: string;
              offset: number;
              message: string;
       }>(),
       {}
);
const visible = ref(true);
onMounted(async () => {
       setTimeout(() => {
              visible.value = false;
       }, 3000);
});
</script>
<style lang="scss" scoped>
.toaster_row {
       z-index: 9999;
       .toaster_card {
              display: flex;
              align-items: center;
              background: #fff;
              color: #363636;
              line-height: 1.3;
              will-change: transform;
              box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
              max-width: 350px;
              pointer-events: auto;
              padding: 8px 10px;
              border-radius: 8px;
              .toaster_Icon {
                     position: relative;
                     display: flex;
                     justify-content: center;
                     align-items: center;
                     min-width: 20px;
                     min-height: 20px;
                     .toaster_loading {
                            width: 12px;
                            height: 12px;
                            box-sizing: border-box;
                            border: 2px solid;
                            border-radius: 100%;
                            border-color: #e0e0e0;
                            border-right-color: #616161;
                            animation: loading 1s linear infinite;
                            @keyframes loading {
                                   0% {
                                          transform: rotate(0deg);
                                   }
                                   100% {
                                          transform: rotate(360deg);
                                   }
                            }
                     }
                     .toaster_type {
                            position: absolute;

                            .toaster_error {
                                   width: 20px;
                                   opacity: 0;
                                   height: 20px;
                                   border-radius: 10px;
                                   background: #ff4b4b;
                                   position: relative;
                                   transform: rotate(45deg);
                                   animation: error 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                                   animation-delay: 100ms;

                                   &::before {
                                          animation: errorBefore 0.15s ease-out forwards;
                                          animation-delay: 180ms;
                                          content: "";
                                          position: absolute;
                                          border-radius: 3px;
                                          background: #fff;
                                          bottom: 9px;
                                          left: 4px;
                                          height: 2px;
                                          width: 12px;
                                   }
                                   &::after {
                                          content: "";
                                          animation: errorAfter 0.15s ease-out forwards;
                                          animation-delay: 150ms;
                                          position: absolute;
                                          border-radius: 3px;
                                          opacity: 0;
                                          background: #fff;
                                          bottom: 9px;
                                          left: 4px;
                                          height: 2px;
                                          width: 12px;
                                   }

                                   @keyframes error {
                                          0% {
                                                 transform: scale(0) rotate(45deg);
                                                 opacity: 0;
                                          }
                                          100% {
                                                 transform: scale(1) rotate(45deg);
                                                 opacity: 1;
                                          }
                                   }

                                   @keyframes errorBefore {
                                          0% {
                                                 transform: scale(0) rotate(90deg);
                                                 opacity: 0;
                                          }
                                          100% {
                                                 transform: scale(1) rotate(90deg);
                                                 opacity: 1;
                                          }
                                   }
                                   @keyframes errorAfter {
                                          0% {
                                                 transform: scale(0);
                                                 opacity: 0;
                                          }
                                          100% {
                                                 transform: scale(1);
                                                 opacity: 1;
                                          }
                                   }
                            }
                     }
              }
              .toaster_message {
                     display: flex;
                     justify-content: center;
                     margin: 4px 10px;
                     color: inherit;
                     flex: 1 1 auto;
                     white-space: pre-line;
              }
       }
}
.toaster_leave {
       animation: 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) 0s 1 normal forwards running exitAnimation;
       @keyframes exitAnimation {
              0% {
                     transform: translate3d(0, 0, -1px) scale(1);
                     opacity: 1;
              }
              100% {
                     transform: translate3d(0, -150%, -1px) scale(0.6);
                     opacity: 0;
              }
       }
}

.toaster_enter {
       animation: 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) 0s 1 normal forwards running enterAnimation;

       @keyframes enterAnimation {
              0% {
                     transform: translate3d(0, -200%, 0) scale(0.6);
                     opacity: 0.5;
              }
              100% {
                     transform: translate3d(0, 0, 0) scale(1);
                     opacity: 1;
              }
       }
}
</style>
