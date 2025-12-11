<template>
  <MainWrapper>
    <div v-if="planet" class="note">
      <MainTitle :title="planet?.name"/>
      <div class="note__editor">
        <QuillEditor
          v-model:content="content"
          contentType="html"
        />
      </div>
      <div class="note__buttons">
        <MainButton title="Удалить" @click="deletePlanet"/>
        <MainButton class="note__buttons-save" title="Сохранить" @click="updatePlanet"/>
      </div>
    </div>
  </MainWrapper>
</template>

<script lang="ts" setup>
import {ref, onMounted, inject} from 'vue'
import MainWrapper from "@/components/template/MainWrapper.vue";
import MainButton from "@/components/ui/button/MainButton.vue";
import {useRoute, useRouter} from "vue-router";
import {useLoadingStore} from "@/store/useLoadingStore";
import type {ApiInstance} from "@/api";
import {apiKey} from "@/plugins/api";
import MainTitle from "@/components/ui/title/MainTitle.vue";
import {Planet, UpdatePlanetPayload} from "@/api/modules/types/galaxy";

const api = inject<ApiInstance>(apiKey);
const loadingStore = useLoadingStore();
const route = useRoute();
const router = useRouter();
const content = ref<string>('')
const planetId = ref<number>(0);
const planet = ref<Planet>()

async function fetchPlanet(id: number) {
  loadingStore.startLoading();
  const res = await api.galaxy.fetchPlanetById(id);
  if (res.success) {
    planet.value = res.data;
    content.value = planet.value.note;
    loadingStore.stopLoading();
  }
}

async function updatePlanet() {
  if (!planet.value) return;
  loadingStore.startLoading()
  const payload: UpdatePlanetPayload = {
    name: planet.value.name,
    color: planet.value.color,
    note: content.value,
    id_galaxy: planet.value.id_galaxy
  };
  const res = await api.galaxy.updatePlanet(planet.value.id, payload);
  if (res.success) {
    await fetchPlanet(planetId.value);
  }
  loadingStore.stopLoading();
}

async function deletePlanet() {
  if (!planet.value) return;
  loadingStore.startLoading()
  const res = await api.galaxy.deletePlanet(planet.value.id);
  if (res.success) {
    await router.push(`/galaxy/${planet.value.id_galaxy}`);
  }
  loadingStore.stopLoading();
}

onMounted(() => {
  planetId.value = Number(route.params.id);
  if (planetId.value) {
    fetchPlanet(planetId.value)
  }
})
</script>

<style lang="scss">
.note {
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__buttons{
    display: flex;
    gap: 1rem;
    width: 100%;

    &-save{
      margin-left: auto;
    }
  }
}

.ql-snow .ql-stroke{
  stroke: #fff;
}
.ql-snow .ql-fill{
  fill: #fff;
}
.ql-snow .ql-picker{
  color: #fff;
}
.ql-snow.ql-toolbar button:hover, .ql-snow .ql-toolbar button:hover, .ql-snow.ql-toolbar button:focus, .ql-snow .ql-toolbar button:focus, .ql-snow.ql-toolbar .ql-picker-label:hover, .ql-snow .ql-toolbar .ql-picker-label:hover, .ql-snow.ql-toolbar .ql-picker-item:hover, .ql-snow .ql-toolbar .ql-picker-item:hover{
  background-color: rgba(255, 255, 255, 0.1);
}
.ql-toolbar.ql-snow{
  border-radius: 20px 20px 0 0;
}
.ql-container.ql-snow{
  max-height: calc(100vh - 8rem - 100px - (2rem * 1.2));
  height: calc(100vh - 8rem - 100px - (2rem * 1.2));
  overflow-y: auto;
  scrollbar-color: #fff transparent;
  scrollbar-width: thin;
}

.ql-snow .ql-picker.ql-header .ql-picker-item::before{
  color: #0d1117;
}
</style>
