<script setup lang="ts">
import ZCard from "@/components/library/ZCard.vue";
import ZInput from "@/components/library/ZInput.vue";
import ZCheckbox from "@/components/library/ZCheckbox.vue";
import ZButton from "@/components/library/ZButton.vue";
import ThemeButton from "@/components/layout/ThemeButton.vue";
import { useLoading } from "@/hooks/private/usePlugin";
import { isExpire, diffSystem } from "@/hooks/private/useUtils";
useLoading.show();
interface Config {
       system: string;
}
interface IForm {
       username: string;
       password: string;
}
interface SignIn {
       token: string
       user_name: string
       phone: string
}
const fequest = useFequest()
const router = useRouter();
const loading = ref<boolean>(false);
const form = ref<IForm>({
       username: "",
       password: ""
});
const config = ref<Config>({
       system: ""
});
const remember = ref<boolean>(true);
const disabled = ref<boolean>(false);
const submit = async () => {
       disabled.value = true;
       const res = await fequest<SignIn>('/api/auth/signIn-phone', {
              method: "post",
              body: {
                     phone: form.value.username,
                     password: form.value.password
              }
       })
       if (res && res.code === 200) {
              //本地保存密码
              if (remember.value) {
                     storage.setItem(StorageKeys.USERNAME, res.data.user_name);
                     storage.setItem(StorageKeys.TOKEN, res.data.token);
                     storage.setItem(StorageKeys.PHONE, res.data.phone);
              }
              router.push(`/${config.value.system}`);
       }
       disabled.value = false;
};
onMounted(async () => {
       const system = await diffSystem();
       if (!isExpire()) {
              useLoading.hidden();
              router.push(`/${system}`);
              return;
       }
       form.value.password = "";
       form.value.username = "";
       loading.value = true;
       useLoading.hidden();
       config.value.system = system;
});
</script>

<template>
       <div class="login flex relative w-full h-full items-center justify-center to-indigo-900 from-blue-900\/70"
              v-if="loading">
              <z-card class="w-108">
                     <div class="w-full">
                            <div class="text-center">
                                   <h2 class="text-3xl font-extrabold text-base-content tracking-tight mb-1">用户登录</h2>
                                   <p class="text-sm text-base-content">请输入您的账号和密码</p>
                            </div>
                            <div class="form w-full box-border mt-8">
                                   <form @submit.prevent="submit" class="w-full">
                                          <z-input required class="w-full" label="账号" icon="User"
                                                 v-model="form.username" placeholder="请输入电话号码"></z-input>
                                          <z-input required class="w-full" label="密码" icon="LockClosed" type="password"
                                                 v-model="form.password" placeholder="请输入密码"></z-input>
                                          <div class="flex justify-between items-center mb-6">
                                                 <div class="flex items-center">
                                                        <z-checkbox label="记住密码" type="checkbox"
                                                               v-model="remember"></z-checkbox>
                                                 </div>
                                                 <ThemeButton></ThemeButton>
                                          </div>
                                          <div class="text-center">
                                                 <z-button class="w-full" :disabled="disabled" type="primary"
                                                        btn-type="submit">{{
                                                               disabled ? "登录中..." : "登录"
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
       background-image: linear-gradient(to right, rgba(28, 57, 142, 0.7), transparent), url("/background.png");
       background-size: cover;
       background-repeat: no-repeat;
}
</style>
