<template>
  <ModalWrapper @hide-modal="emit('hide-modal')">
    <template #header>
      <h3 v-if="!edit" class="modal__title">
        Создать планету
      </h3>
      <h3 v-else class="modal__title">
        Редактировать планету
      </h3>
    </template>
    <template #body>
      <div class="modal__form">
        <MainInput v-model="galaxyData.name" id="name" name="name" placeholder="Введите название" type="text" label="Название"/>
        <ColorPicker v-model:modelValue="galaxyData.color" label="Цвет планеты"/>
      </div>
      <div class="modal__button-group">
        <div class="modal__button-group">
          <MainButton v-if="!edit" title="Создать" color="black" size="large" @click="createGalaxy" :disabled="createDisabled"/>
          <MainButton v-if="edit" title="Сохранить" color="black" size="large" @click=""/>
        </div>
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
import {CreatePlanetPayload, Planet} from "@/api/modules/types/galaxy";
import {useRoute} from "vue-router";
import type {ApiInstance} from "@/api";
import {apiKey} from "@/plugins/api";
import {useGalaxyStore} from "@/store/useGalaxyStore";
import {useLoadingStore} from "@/store/useLoadingStore";

interface PlanetModal {
  edit?: boolean;
  planet?: Planet
}

const props = withDefaults(defineProps<PlanetModal>(), {
  edit: false
})

const emit = defineEmits<{
  (e: 'hide-modal'): void
}>()

const route = useRoute();
const api = inject<ApiInstance>(apiKey)!;
const galaxyStore = useGalaxyStore();
const loadingStore = useLoadingStore();
const galaxyId = ref<number>();

const galaxyData = ref<CreatePlanetPayload>({
  name: "",
  color: "#000000",
  id_galaxy: null
})
const createDisabled = computed(() => {
  return !galaxyData.value.name || !galaxyData.value.color;
})

async function createGalaxy() {
  loadingStore.startLoading();
  galaxyId.value = Number(route.params.id);
  if (galaxyId.value && !props.edit) {
    galaxyData.value.id_galaxy = galaxyId.value;
  }
  const res = await api.galaxy.createPlanet(galaxyData.value);
  if (res.success) {
    emit('hide-modal');
    setTimeout(() => {
      galaxyId.value = Number(route.params.id);
      galaxyStore.fetchGalaxy(galaxyId.value);
    }, 1000)
    loadingStore.stopLoading();
  }
}
</script>

<style scoped lang="scss">

</style>