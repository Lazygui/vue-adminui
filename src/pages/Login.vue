<script setup lang="ts">
import ZCard from "@/components/library/ZCard.vue";
import ZInput from "@/components/library/ZInput.vue";
import ZCheckbox from "@/components/library/ZCheckbox.vue";
import ZButton from "@/components/library/ZButton.vue";
import { UserIcon, LockIcon } from "@/components/svg";
import ThemeButton from "@admin/login/ThemeButton.vue";
import { useLoading } from "@/hooks/private/usePlugin";
import { isExpire, diffSystem } from "@/hooks/useUtils";
useLoading.show();
interface Config {
       system: string;
}
interface IForm {
       username: string;
       password: string;
}
const router = useRouter();
const loading = ref<boolean>(false);
const form = ref<IForm>({
       username: "",
       password: ""
});
const config = ref<Config>({
       system: ""
});
const remember = ref<boolean>(false);
const disabled = ref<boolean>(false);
const submit = () => {
       disabled.value = true;
       //本地保存密码
       if (remember.value) {
              storage.setItem(StorageKeys.USERNAME, form.value.username);
              storage.setItem(StorageKeys.PASSWORD, form.value.password);
       }
       router.push(`/${config.value.system}`);
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
       <div class="login flex relative w-full h-full items-center justify-center to-indigo-900 from-blue-900\/70" v-if="loading">
              <z-card class="login-card w-96">
                     <div class="w-full">
                            <div class="text-center">
                                   <h2 class="text-3xl font-extrabold text-base-content tracking-tight mb-1">用户登录</h2>
                                   <p class="text-sm text-base-content">请输入您的账号和密码</p>
                            </div>
                            <div class="form w-full box-border mt-8">
                                   <form @submit.prevent="submit">
                                          <z-input
                                                 required
                                                 class="w-full"
                                                 label="账号"
                                                 :icon="UserIcon"
                                                 v-model="form.username"
                                                 placeholder="请输入账号"
                                          ></z-input>
                                          <z-input
                                                 required
                                                 class="w-full"
                                                 label="密码"
                                                 :icon="LockIcon"
                                                 type="password"
                                                 v-model="form.password"
                                                 placeholder="请输入密码"
                                          ></z-input>
                                          <div class="flex justify-between items-center mb-6">
                                                 <div class="flex items-center">
                                                        <z-checkbox label="记住密码" type="checkbox" v-model="remember"></z-checkbox>
                                                 </div>
                                                 <ThemeButton></ThemeButton>
                                          </div>
                                          <div class="text-center">
                                                 <z-button :disabled="disabled" type="primary" btn-type="submit">{{
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
