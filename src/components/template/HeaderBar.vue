<template>
  <div class="header">
    <div class="header__container">
      <h4 class="header__logo">SAverse</h4>
      <div class="header__menu">
        <MainButton v-if="!isAuth" title="Вход" @click="emit('show-auth')"/>
        <MainButton v-else title="Выход" @click="logout"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MainButton from "@/components/ui/button/MainButton.vue";
import {computed, watch} from "vue";
import {useUserStore} from "@/store/useUserStore";

const store = useUserStore();
const emit = defineEmits<{
  (e: 'show-auth'): void;
}>()

const isAuth = computed(() => {
  return store.isAuth;
})

const logout = () => {
  store.logout();
}
</script>

<style lang="scss" scoped>
.header {
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  height: 4rem;
  display: flex;
  align-items: center;
  
  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 20px;
  }
}
</style>