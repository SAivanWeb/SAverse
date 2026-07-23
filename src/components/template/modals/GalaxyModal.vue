<template>
  <ModalWrapper @hide-modal="emit('hide-modal')">
    <template #header>
      <h3 v-if="!edit" class="modal__title">
        Создать галактику
      </h3>
      <h3 v-else class="modal__title">
        Редактировать галактику
      </h3>
    </template>
    <template #body>
      <div class="modal__form">
        <MainInput v-model="galaxyData.name" id="name" name="name" placeholder="Введите название" type="text" label="Название"/>
        <div class="modal__form-row">
          <ColorPicker v-model:modelValue="galaxyData.color" label="Цвет галактики"/>
          <MainSelect v-model="galaxyData.view" id="view" label="Вид" placeholder="Выберите вид" :options="viewOptions"/>
        </div>
      </div>
      <div class="modal__button-group">
        <MainButton v-if="!edit" title="Создать" color="black" size="large" @click="createGalaxy" :disabled="createDisabled"/>
        <MainButton v-if="edit" title="Удалить" color="black" size="large" @click="showDelete = true"/>
        <MainButton v-if="edit" title="Сохранить" color="black" size="large" @click="updateGalaxy" :disabled="createDisabled"/>
      </div>
    </template>
  </ModalWrapper>

  <DeleteModal v-if="showDelete" @hide-modal="showDelete = false" @delete="deleteGalaxy"/>
</template>

<script setup lang="ts">
import ModalWrapper from "@/components/template/ModalWrapper.vue";
import MainInput from "@/components/ui/input/MainInput.vue";
import MainButton from "@/components/ui/button/MainButton.vue";
import MainSelect from "@/components/ui/select/MainSelect.vue";
import {computed, inject, ref, watch} from "vue";
import ColorPicker from "@/components/ui/picker/ColorPicker.vue";
import { apiKey } from '@/plugins/api';
import type {ApiInstance} from "@/api";
import {useLoadingStore} from "@/store/useLoadingStore";
import {useGalaxyStore} from "@/store/useGalaxyStore";
import {CreateGalaxyPayload, Galaxy} from "@/api/modules/types/galaxy";
import {useRouter} from "vue-router";
import DeleteModal from "@/components/template/modals/DeleteModal.vue";

const emit = defineEmits<{
  (e: 'hide-modal'): void
}>()

interface GalaxyModal {
  edit?: boolean;
  galaxy?: Galaxy
}

const props = withDefaults(defineProps<GalaxyModal>(), {
  edit: false
})

const router = useRouter();
const api = inject<ApiInstance>(apiKey)!;
const galaxyStore = useGalaxyStore();
const loadingStore = useLoadingStore();
const showDelete = ref<boolean>(false);

const viewOptions = [
  { label: 'Шар',    value: 'ball'      },
  { label: 'Звезда', value: 'star'      },
  { label: 'Сердце', value: 'heart'     },
  { label: 'Месяц',  value: 'moon'      },
  { label: 'Молния', value: 'lightning' },
]

const galaxyData = ref<CreateGalaxyPayload>({
  name: "",
  color: "#000000",
  view: "",
})
const createDisabled = computed(() => {
  return !galaxyData.value.name || !galaxyData.value.color;
})

watch(
  () => props.galaxy,
  (val) => {
    if (val && props.edit) {
      galaxyData.value = {
        name: val.name,
        color: val.color,
        view: val.view ?? "",
      };
    } else if (!props.edit) {
      galaxyData.value = {
        name: "",
        color: "#000000",
        view: "",
      };
    }
  },
  { immediate: true }
);

async function createGalaxy() {
  loadingStore.startLoading();
  const res = await api.galaxy.createGalaxy(galaxyData.value);
  if (res.code === 200) {
    emit('hide-modal');
    await galaxyStore.fetchGalaxies();
    loadingStore.stopLoading();
  }
}

async function updateGalaxy() {
  if (!props.galaxy) return;
  try {
    loadingStore.startLoading();
    const res = await api.galaxy.updateGalaxy(props.galaxy.id, galaxyData.value);
    if (res.code === 200) {
      await galaxyStore.fetchGalaxy(props.galaxy.id);
      emit("hide-modal");
    }
  } finally {
    loadingStore.stopLoading();
  }
}

async function deleteGalaxy() {
  if (!props.galaxy) return;
  try {
    loadingStore.startLoading();
    const res = await api.galaxy.deleteGalaxy(props.galaxy.id);
    if (res.code === 200) {
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000)
      emit("hide-modal");
    }
  } finally {
    loadingStore.stopLoading();
  }
}
</script>

<style scoped lang="scss">

</style>