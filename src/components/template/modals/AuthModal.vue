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
        <MainButton v-if="authType === 'reg'" title="Регистрация" color="black" size="large"/>
        <MainButton v-else title="Вход" color="black" size="large"/>
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
import {ref, computed, watch} from "vue";
import MainInput from "@/components/ui/input/MainInput.vue";
import MainButton from "@/components/ui/button/MainButton.vue";

const emit = defineEmits<{
  (e: 'hide-modal'): void
}>()

const authType = ref<string>('reg');
const authData = ref<object>({
  email: "",
  password: "",
})
</script>

<style lang="scss" scoped>

</style>