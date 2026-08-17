<template>
  <ModalWrapper @hide-modal="emit('hide-modal')">
    <template #header>
      <h3 class="modal__title">
        Создать планету
      </h3>
    </template>
    <template #body>
      <div class="modal__form">
        <MainInput v-model="planetData.name" id="name" name="name" placeholder="Введите название" type="text" label="Название"/>
        <ColorPicker v-model:modelValue="planetData.color" label="Цвет планеты"/>
      </div>
      <div class="modal__button-group">
        <MainButton title="Создать" color="black" size="large" @click="createPlanet" :disabled="createDisabled"/>
      </div>
    </template>
  </ModalWrapper>
</template>

<script setup lang="ts">
import ModalWrapper from "@/components/template/ModalWrapper.vue";
import MainInput from "@/components/ui/input/MainInput.vue";
import MainButton from "@/components/ui/button/MainButton.vue";
import {computed, inject, ref} from "vue";
import ColorPicker from "@/components/ui/picker/ColorPicker.vue";
import {CreatePlanetPayload} from "@/api/modules/types/galaxy";
import {useRoute} from "vue-router";
import type {ApiInstance} from "@/api";
import {apiKey} from "@/plugins/api";
import {useGalaxyStore} from "@/store/useGalaxyStore";
import {useLoadingStore} from "@/store/useLoadingStore";

const emit = defineEmits<{
  (e: 'hide-modal'): void
}>()

const route = useRoute();
const api = inject<ApiInstance>(apiKey)!;
const galaxyStore = useGalaxyStore();
const loadingStore = useLoadingStore();

const planetData = ref<CreatePlanetPayload>({
  name: "",
  color: "#000000",
  id_galaxy: null
})
const createDisabled = computed(() => {
  return !planetData.value.name || !planetData.value.color;
})

async function createPlanet() {
  loadingStore.startLoading();
  const galaxyId = Number(route.params.id);
  planetData.value.id_galaxy = galaxyId;

  try {
    const res = await api.galaxy.createPlanet(planetData.value);
    if (res.code === 200) {
      emit('hide-modal');
      await galaxyStore.fetchGalaxy(galaxyId);
    }
  } finally {
    loadingStore.stopLoading();
  }
}
</script>

<style scoped lang="scss">

</style>