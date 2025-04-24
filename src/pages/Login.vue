<script setup lang="ts">
import ZCard from '@/components/library/ZCard.vue'
import ZInput from '@/components/library/ZInput.vue'
import ZCheckbox from '@/components/library/ZCheckbox.vue'
import ZButton from '@/components/library/ZButton.vue'
import { UserIcon, LockIcon } from '@/components/svg'
import ThemeButton from "@pages/login/ThemeButton.vue"
interface Config {
  system: string
}
interface IForm {
  username: string
  password: string
}
const router = useRouter()
const fequest = useFequest()
const form = ref<IForm>({
  username: '',
  password: '',
})
const config = ref<Config>({
  system: ''
})
const remember = ref<boolean>(false)
const disabled = ref<boolean>(false)
const submit = () => {
  disabled.value = true
  //本地保存密码
  if (remember.value) {
    storage.setItem(StorageKeys.USERNAME, form.value.username)
    storage.setItem(StorageKeys.PASSWORD, form.value.password)
  }
  router.push(`/${config.value.system}`)
  disabled.value = false
}
onMounted(async () => {
  form.value.password = ''
  form.value.username = ''
  // 判断浏览器地址是否包含admin或user
  const includes = location.hash.includes('/admin') || location.hash.includes('/user')
  if (includes) {
    config.value.system = location.hash.split('/')[1]
    return
  }
  // 获取配置文件
  const configuration: any = await fequest('/config.json', { method: 'get' })
  if (configuration) {
    config.value = configuration as Config
  }
})
</script>

<template>
  <div class="login flex items-center justify-center to-indigo-900 from-blue-900\/70">
    <z-card class="login-card">
      <div class="card-body">
        <div class="text-center">
          <h2 class="h2 text-base-content">用户登录</h2>
          <p class="tips text-base-content">请输入您的账号和密码</p>
        </div>
        <div class="form">
          <form @submit.prevent="submit">
            <z-input required class="form-input" label="账号" :icon="UserIcon" v-model="form.username"
              placeholder="请输入账号"></z-input>
            <z-input required label="密码" :icon="LockIcon" type="password" v-model="form.password"
              placeholder="请输入密码"></z-input>
            <div class="form-config flex justify-between items-center">
              <div class="flex items-center">
                <z-checkbox label="记住密码" type="checkbox" v-model="remember"></z-checkbox>
              </div>
              <ThemeButton></ThemeButton>
            </div>
            <div class="text-center">
              <z-button :disabled="disabled" type="primary" btn-type="submit">{{ disabled ? '登录中...' : '登录'
              }}</z-button>
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
  background-image: linear-gradient(to right, rgba(28, 57, 142, 0.7), transparent), url('/background.png');
  background-size: cover;
  background-repeat: no-repeat;
  inset: 0;
  // background-image: linear-gradient(to right in oklab);



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

        .form-config {
          margin-block-start: 0;
          margin-block-end: 1.5rem;
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

.to-indigo-900\/50 {
  --tw-gradient-to: color-mix(in oklab, var(--color-indigo-900)
      /* oklch(0.359 0.144 278.697) = #312c85 */
      50%, transparent);
  --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));
}

@property --tw-gradient-position {
  syntax: "*";
  inherits: false;
}

@property --tw-gradient-from {
  syntax: "<color>";
  inherits: false;
  initial-value: #0000;
}

@property --tw-gradient-via {
  syntax: "<color>";
  inherits: false;
  initial-value: #0000;
}

@property --tw-gradient-to {
  syntax: "<color>";
  inherits: false;
  initial-value: #0000;
}

@property --tw-gradient-stops {
  syntax: "*";
  inherits: false;
}

@property --tw-gradient-via-stops {
  syntax: "*";
  inherits: false;
}

@property --tw-gradient-from-position {
  syntax: "<length-percentage>";
  inherits: false;
  initial-value: 0%;
}

@property --tw-gradient-via-position {
  syntax: "<length-percentage>";
  inherits: false;
  initial-value: 50%;
}

@property --tw-gradient-to-position {
  syntax: "<length-percentage>";
  inherits: false;
  initial-value: 100%;
}
</style>
