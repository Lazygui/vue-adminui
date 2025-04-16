<script setup lang="ts">
import ZCard from '@/components/library/ZCard.vue'
import ZInput from '@/components/library/ZInput.vue'
import { UserIcon, LockIcon } from '@/components/svg'
const submit = (payload: Event) => {
  console.log("🚀 ~ submit ~ payload:", payload)
}
</script>

<template>
  <div class="login flex items-center justify-center">
    <z-card>
      <div>
        <div class="text-center">
          <h2>用户登录</h2>
          <p class="tips">请输入您的账户和密码</p>
        </div>
        <div class="form">
          <form action="" @submit="submit">
            <z-input label="账号" :icon="UserIcon"></z-input>
            <z-input label="密码" :icon="LockIcon"></z-input>
            <button>111</button>
          </form>
        </div>
      </div>
    </z-card>
  </div>
</template>

<style scoped lang="scss">
.login {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  background-image: url('/background.png');
  background-size: cover;
  background-repeat: no-repeat;

  .tips {
    font-size: 0.875rem;
    color: oklch(26% 0 0);
  }

  .form {
    margin-top: 2rem;
    box-sizing: border-box;
  }
}
</style>
