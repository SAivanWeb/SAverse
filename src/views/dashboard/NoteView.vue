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
import {ref, onMounted} from 'vue'
import MainWrapper from "@/components/template/MainWrapper.vue";
import MainButton from "@/components/ui/button/MainButton.vue";
import {useRoute, useRouter} from "vue-router";
import {useLoadingStore} from "@/store/useLoadingStore";
import api from '@/api'
import type { ApiInstance } from '@/api'
import MainTitle from "@/components/ui/title/MainTitle.vue";
import {Planet, UpdatePlanetPayload} from "@/api/modules/types/galaxy";
import galaxy from "@/api/modules/galaxy";

const apiInstance: ApiInstance = api
const loadingStore = useLoadingStore();
const route = useRoute();
const router = useRouter();
const content = ref<string>('')
const planetId = ref<number>(0);
const planet = ref<Planet>()

async function fetchPlanet(id: number) {
  loadingStore.startLoading();
  try {
    const res = await apiInstance.galaxy.fetchPlanetById(id);
    if (res.success) {
      planet.value = res.data;
      content.value = planet.value.note;
      loadingStore.stopLoading();
    }
  } catch (e) {
    loadingStore.setMessage('error', 'Ошибка получения планеты');
    await router.push(`/dashboard`);
  } finally {
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
    await router.push(`/galaxy/${planet.value.id_galaxy}`);
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

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: 'H1';
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: 'H2';
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: 'H3';
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: 'Text';
}

.ql-container .ql-editor {
  /* базовый размер текста: адаптивный */
  font-size: clamp(14px, 1.1vw, 16px);
  line-height: 1.6;
  color: #fff;

  /* чтобы длинные слова не ломали верстку */
  word-break: break-word;
}

/* Заголовки */
.ql-container .ql-editor h1 {
  font-size: clamp(24px, 3vw, 36px);
  line-height: 1.15;
  margin: 0 0 0.6em;
  font-weight: 700;
}

.ql-container .ql-editor h2 {
  font-size: clamp(20px, 2.3vw, 28px);
  line-height: 1.2;
  margin: 0 0 0.55em;
  font-weight: 700;
}

.ql-container .ql-editor h3 {
  font-size: clamp(18px, 1.9vw, 22px);
  line-height: 1.25;
  margin: 0 0 0.5em;
  font-weight: 600;
}

/* Обычный текст */
.ql-container .ql-editor p,
.ql-container .ql-editor li {
  margin: 0 0 0.6em;
}

/* Списки */
.ql-container .ql-editor ul,
.ql-container .ql-editor ol {
  padding-left: 1.25em;
  margin: 0 0 0.8em;
}

/* Цитата/код (если используешь) */
.ql-container .ql-editor blockquote {
  border-left: 3px solid rgba(255, 255, 255, 0.35);
  padding-left: 12px;
  margin: 0 0 1em;
  opacity: 0.95;
}

.ql-container .ql-editor pre {
  font-size: clamp(13px, 1vw, 15px);
  line-height: 1.5;
  padding: 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.06);
  overflow: auto;
}
</style>
