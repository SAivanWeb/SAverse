<template>
  <ModalWrapper @hide-modal="emit('hide-modal')">
    <template #header>
      <h3 class="modal__title">
        Создать галактику
      </h3>
    </template>
    <template #body>
      <div class="modal__form">
        <MainInput v-model="galaxyData.name" id="name" name="name" placeholder="Введите название" type="text" label="Название"/>
        <ColorPicker v-model:modelValue="galaxyData.color" label="Цвет галактики"/>
      </div>
      <div class="modal__button-group">
        <MainButton title="Создать" color="black" size="large" @click="createGalaxy()"/>
      </div>
    </template>
  </ModalWrapper>
</template>

<script setup lang="ts">
import ModalWrapper from "@/components/template/ModalWrapper.vue";
import MainInput from "@/components/ui/input/MainInput.vue";
import MainButton from "@/components/ui/button/MainButton.vue";
import {inject, ref} from "vue";
import {GalaxyData} from "@/types/interfaces";
import ColorPicker from "@/components/ui/picker/ColorPicker.vue";
import { apiKey } from '@/plugins/api';
import type {ApiInstance} from "@/api";
import {useLoadingStore} from "@/store/useLoadingStore";
const api = inject<ApiInstance>(apiKey)!;

const emit = defineEmits<{
  (e: 'hide-modal'): void
}>()

const loadingStore = useLoadingStore();

const galaxyData = ref<GalaxyData>({
  name: "",
  color: "#000000"
})

async function createGalaxy() {
  loadingStore.startLoading();
  const res = await api.galaxy.createGalaxy(galaxyData.value);
  if (res.success) {
    emit('hide-modal');
    
    loadingStore.stopLoading();
  }
}
</script>

<style scoped lang="scss">

</style>