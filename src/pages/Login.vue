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
    <z-card class="login-card">
      <div class="card-body">
        <div class="text-center">
          <h2>用户登录</h2>
          <p class="tips">请输入您的账户和密码</p>
        </div>
        <div class="form">
          <form @submit="submit">
            <z-input class="form-input" label="账号" :icon="UserIcon"></z-input>
            <z-input label="密码" :icon="LockIcon" type="password"></z-input>
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

  .login-card {
    width: 24rem;

    .card-body {
      width: 100%;

      .form {
        width: 100%;
        margin-top: 2rem;
        box-sizing: border-box;

        .form-input {
          width: 100%;
        }
      }

      .tips {
        font-size: 0.875rem;
        color: oklch(26% 0 0);
      }
    }
  }




}
</style>
