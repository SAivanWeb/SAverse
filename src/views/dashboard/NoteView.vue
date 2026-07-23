<template>
  <MainWrapper :backTo="planet ? `/galaxy/${planet.id_galaxy}` : undefined">
    <div v-if="planet" class="note">
      <div class="note__header">
        <MainTitle :title="planet?.name"/>
        <span class="note__autosave" :class="saveStatus">
          <template v-if="saveStatus === 'saving'">Сохранение...</template>
          <template v-else-if="saveStatus === 'saved'">Сохранено</template>
        </span>
      </div>
      <div class="note__editor">
        <QuillEditor
          v-model:content="content"
          contentType="html"
          :toolbar="toolbarOptions"
        />
      </div>
      <div class="note__buttons">
        <MainButton title="Удалить" @click="showDelete = true"/>
        <MainButton class="note__buttons-save" title="Сохранить" @click="updatePlanet"/>
      </div>
    </div>
  </MainWrapper>
  <DeleteModal v-if="showDelete" @hide-modal="showDelete = false" @delete="deletePlanet"/>
</template>

<script lang="ts" setup>
import {ref, onMounted, watch, nextTick} from 'vue'
import MainWrapper from "@/components/template/MainWrapper.vue";
import MainButton from "@/components/ui/button/MainButton.vue";
import {useRoute, useRouter} from "vue-router";
import {useLoadingStore} from "@/store/useLoadingStore";
import api from '@/api'
import type { ApiInstance } from '@/api'
import MainTitle from "@/components/ui/title/MainTitle.vue";
import {Planet, UpdatePlanetPayload} from "@/api/modules/types/galaxy";
import galaxy from "@/api/modules/galaxy";
import DeleteModal from "@/components/template/modals/DeleteModal.vue";

const apiInstance: ApiInstance = api
const loadingStore = useLoadingStore();
const route = useRoute();
const router = useRouter();
const content = ref<string>('')
const planetId = ref<number>(0);
const planet = ref<Planet>()
const showDelete = ref<boolean>(false);
const isLoaded = ref<boolean>(false);
const saveStatus = ref<'idle' | 'saving' | 'saved'>('idle');
const saveTimer = ref<ReturnType<typeof setTimeout> | null>(null);
const lastSavedAt = ref<number>(0);
const THROTTLE_MS = 5_000;
const toolbarOptions = [
  [{header: ['1', '2', '3', false]}],
  ['bold', 'italic', 'underline', 'link'],
  [{list: 'ordered'}, {list: 'bullet'}, {list: 'check'}],
  ['clean']
];

async function fetchPlanet(id: number) {
  loadingStore.startLoading();
  try {
    const res = await apiInstance.galaxy.fetchPlanetById(id);
    if (res.code === 200) {
      planet.value = res.data.planet;
      content.value = planet.value.note;
      await nextTick();
      isLoaded.value = true;
      lastSavedAt.value = Date.now();
      loadingStore.stopLoading();
    }
  } catch (e) {
    loadingStore.setMessage('error', 'Ошибка получения планеты');
    await router.push(`/dashboard`);
  } finally {
    loadingStore.stopLoading();
  }
}

async function autoSave() {
  try {
    if (!planet.value) return;
    saveStatus.value = 'saving';
    lastSavedAt.value = Date.now();
    const payload: UpdatePlanetPayload = {
      name: planet.value.name,
      color: planet.value.color,
      note: content.value,
      id_galaxy: planet.value.id_galaxy
    };
    await api.galaxy.updatePlanet(planet.value.id, payload);
    saveStatus.value = 'saved';
    setTimeout(() => { saveStatus.value = 'idle'; }, 1000);
  } catch {
    loadingStore.setMessage('error', 'Ошибка автосохранения')
  }
}

async function updatePlanet() {
  if (!planet.value) return;
  loadingStore.startLoading();
  if (saveTimer.value) {
    clearTimeout(saveTimer.value);
    saveTimer.value = null;
  }
  const payload: UpdatePlanetPayload = {
    name: planet.value.name,
    color: planet.value.color,
    note: content.value,
    id_galaxy: planet.value.id_galaxy
  };
  const res = await api.galaxy.updatePlanet(planet.value.id, payload);
  if (res.code === 200) {
    await router.push(`/galaxy/${planet.value.id_galaxy}`);
  }
  loadingStore.stopLoading();
}

watch(content, () => {
  if (!isLoaded.value) return;
  if (saveTimer.value) clearTimeout(saveTimer.value);
  if (Date.now() - lastSavedAt.value >= THROTTLE_MS) {
    autoSave();
  } else {
    saveTimer.value = setTimeout(autoSave, 500);
  }
});

async function deletePlanet() {
  if (!planet.value) return;
  loadingStore.startLoading()
  const res = await api.galaxy.deletePlanet(planet.value.id);
  if (res.code === 200) {
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

  &__header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__buttons{
    display: flex;
    gap: 1rem;
    width: 100%;
    align-items: center;

    &-save{
      margin-left: auto;
    }
  }

  &__autosave {
    font-size: 0.8rem;
    opacity: 0;
    transition: opacity 0.3s ease;
    white-space: nowrap;

    &.saving {
      opacity: 0.6;
      color: #fff;
    }

    &.saved {
      opacity: 0.9;
      color: #6ee7b7;
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
}

/* Чек-листы */
.ql-container .ql-editor ul[data-checked] > li::before {
  content: '';
  display: inline-block;
  box-sizing: border-box;
  width: 1.1em;
  height: 1.1em;
  margin-left: -1.6em;
  margin-right: 0.5em;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.45);
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 60%;
  vertical-align: -0.15em;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}

.ql-container .ql-editor ul[data-checked=true] > li::before {
  border-color: #ffffff;
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230d1117' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='4 12 9 17 20 6'%3E%3C/polyline%3E%3C/svg%3E");
}

.ql-container .ql-editor ul[data-checked=true] > li {
  text-decoration: line-through;
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
