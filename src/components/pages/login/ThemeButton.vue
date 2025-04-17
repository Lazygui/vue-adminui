<template>
       <label class="theme-toggle">
              <input type="checkbox" v-model="isDark" class="toggle-checkbox">
              <div class="icons-container">
                     <transition name="slide" mode="out-in">
                            <svg v-if="!isDark" key="sun" aria-label="sun" xmlns="http://www.w3.org/2000/svg"
                                   viewBox="0 0 24 24" class="icon">
                                   <!-- 太阳图标路径保持原样 -->
                                   <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none"
                                          stroke="currentColor">
                                          <circle cx="12" cy="12" r="4" />
                                          <path d="M12 2v2" />
                                          <path d="M12 20v2" />
                                          <path d="m4.93 4.93 1.41 1.41" />
                                          <path d="m17.66 17.66 1.41 1.41" />
                                          <path d="M2 12h2" />
                                          <path d="M20 12h2" />
                                          <path d="m6.34 17.66-1.41 1.41" />
                                          <path d="m19.07 4.93-1.41 1.41" />
                                   </g>
                            </svg>

                            <svg v-else key="moon" aria-label="moon" xmlns="http://www.w3.org/2000/svg"
                                   viewBox="0 0 24 24" class="icon">
                                   <!-- 月亮图标路径保持原样 -->
                                   <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none"
                                          stroke="currentColor">
                                          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                                   </g>
                            </svg>
                     </transition>
              </div>
       </label>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isDark = ref(false)
</script>

<style scoped>
.theme-toggle {
       position: relative;
       display: inline-block;
       cursor: pointer;
}

.toggle-checkbox {
       position: absolute;
       opacity: 0;
       width: 0;
       height: 0;
}

.icons-container {
       display: inline-block;
       position: relative;
       width: 24px;
       height: 24px;
}

.icon {
       position: absolute;
       width: 100%;
       height: 100%;
       transition: all 0.3s ease;
       fill: currentColor;
}

/* 太阳进入动画 */
.slide-enter-from {
       opacity: 0;
       transform: rotate(-30deg);
}

.slide-enter-to {
       opacity: 1;
       transform: rotate(0);
}

/* 月亮进入动画 */
.slide-leave-from {
       opacity: 1;
       transform: rotate(0);
}

.slide-leave-to {
       opacity: 0;
       transform: rotate(30deg);
}

/* 统一过渡效果 */
.slide-enter-active,
.slide-leave-active {
       transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
</style>