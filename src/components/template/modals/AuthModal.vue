<template>
  <ModalWrapper @hide-modal="emit('hide-modal')">
    <template #header>
      <h3 v-if="authType === 'reg'" class="modal__title">
        Регистрация
      </h3>
      <h3 v-else class="modal__title">
        Вход
      </h3>
    </template>
    <template #body>
      <div class="modal__form">
        <MainInput v-model="authData.email" id="email" name="email" placeholder="Почта" type="email" label="Почта"/>
        <MainInput v-model="authData.password" id="password" name="password" placeholder="Пароль" type="password" label="Пароль"/>
      </div>
      <div class="modal__button-group">
        <MainButton v-if="authType === 'reg'" title="Регистрация" color="black" size="large" @click="register"/>
        <MainButton v-else title="Вход" color="black" size="large" @click="login"/>
      </div>
      <div class="modal__additional">
        <p v-if="authType === 'auth'">Еще нет аккаунта?
          <span @click="authType = 'reg'">Зарегестрируйтесь</span>
        </p>
        <p v-else>Уже есть аккаунт?
          <span @click="authType = 'auth'">Войдите</span>
        </p>
      </div>
    </template>
  </ModalWrapper>
</template>

<script setup lang="ts">
import ModalWrapper from "@/components/template/ModalWrapper.vue";
import {ref} from "vue";
import MainInput from "@/components/ui/input/MainInput.vue";
import MainButton from "@/components/ui/button/MainButton.vue";
import type {AuthData} from "@/api/modules/types/user";
import {useUserStore} from "@/store/useUserStore";
import {useRouter} from "vue-router";

const router = useRouter();
const store = useUserStore();
const emit = defineEmits<{
  (e: 'hide-modal'): void
}>()

const authType = ref<string>('reg');
const authData = ref<AuthData>({
  email: "",
  password: "",
})


async function login() {
  const res: boolean = await store.login(authData.value)
  if(res){
    emit('hide-modal')
    setTimeout(() => {
      router.push({ path: '/dashboard' })
    }, 2000)
  }
}

async function register() {
  const res: boolean = await store.register(authData.value)
  if(res){
    emit('hide-modal')
    setTimeout(() => {
      router.push({ path: '/dashboard' })
    }, 2000)
  }
}

</script>

<style lang="scss" scoped>

</style>