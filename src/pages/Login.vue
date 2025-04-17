<script setup lang="ts">
import ZCard from '@/components/library/ZCard.vue'
import ZInput from '@/components/library/ZInput.vue'
import ZCheckbox from '@/components/library/ZCheckbox.vue'
import { UserIcon, LockIcon } from '@/components/svg'
import ThemeButton from "@pages/login/ThemeButton.vue"
interface IForm {
  username: string
  password: string
}
const form = ref<IForm>({
  username: '',
  password: '',
})
const remember = ref<boolean>(true)
const submit = () => {
  console.log("🚀 ~ submit ~ payload:", form.value, remember.value)
}
const rememberPass = () => {
  // remember.value = !remember.value
  console.log("🚀 ~ submit ~ payload:", remember.value)

}
onMounted(() => {
  form.value.password = ''
  form.value.username = ''
})
</script>

<template>
  <div class="login flex items-center justify-center">
    <z-card class="login-card">
      <div class="card-body">
        <div class="text-center">
          <h2 class="h2 text-base-content">用户登录</h2>
          <p class="tips text-base-content">请输入您的账户和密码</p>
        </div>
        <div class="form">
          <form @submit.prevent="submit">
            <z-input class="form-input" label="账号" :icon="UserIcon" v-model="form.username"></z-input>
            <z-input label="密码" :icon="LockIcon" type="password" v-model="form.password"></z-input>
            <div class="flex justify-between">
              <!-- <z-input label="记住密码" :icon="LockIcon" type="checkbox" v-model="remember" @click="rememberPass"></z-input> -->
              <z-checkbox label="记住密码" :icon="LockIcon" type="checkbox" v-model="remember"
                @click="rememberPass"></z-checkbox>
              <div className="flex items-center gap-2">
                <ThemeButton></ThemeButton>
              </div>
            </div>
            <div class="text-center">
              <button>111</button>
            </div>
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

      .h2 {
        margin-top: 0;
        font-size: 1.875rem;
        line-height: calc(2.25 / 1.875);
        letter-spacing: -0.025rem;
        font-weight: 800;
        margin-bottom: 0.25rem;
      }

      .tips {
        font-size: 0.875rem;
      }
    }
  }




}
</style>
