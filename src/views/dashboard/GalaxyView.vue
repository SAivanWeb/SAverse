<template>
  <MainWrapper>
    <div v-if="system" class="galaxy__header">
      <MainTitle :title="system.name" />
      <div class="galaxy__header-btns">
        <MainButton v-if="system?.planets.length < 6" title="Создать" @click="emit('show-planet')"/>
        <MainButton title="Редактировать" @click="editGalaxy"/>
      </div>
    </div>

    <div v-if="system" class="galaxy__content">
      <StarSystem :item="system"/>
    </div>
  </MainWrapper>
</template>

<script setup lang="ts">
import MainWrapper from "@/components/template/MainWrapper.vue";
import MainTitle from "@/components/ui/title/MainTitle.vue";
import { computed, onMounted } from "vue";
import {useRoute} from "vue-router";
import StarSystem from "@/components/template/StarSystem.vue";
import MainButton from "@/components/ui/button/MainButton.vue";
import {useGalaxyStore} from "@/store/useGalaxyStore";
import {Galaxy} from "@/api/modules/types/galaxy";

const emit = defineEmits<{
  (e: 'show-planet'): void;
  (e: 'show-galaxy', galaxy: Galaxy): void;
}>();

const store = useGalaxyStore();
const route = useRoute();

const system = computed(() => {
  return store.galaxy
});

async function fetchGalaxy(id: number) {
  await store.fetchGalaxy(id);
}

const galaxy = computed<Galaxy | null>(() => {
  if (!system.value) return null;
  return {
    id: system.value.id,
    name: system.value.name,
    color: system.value.color
  };
});

const editGalaxy = () => {
  if (galaxy.value) {
    emit('show-galaxy', galaxy.value);
  }
};
onMounted(() => {
  const id: number = Number(route.params.id);

  if (id) {
    fetchGalaxy(id);
  }
});
</script>

<style lang="scss" scoped>
.galaxy{
  &__header{
    margin-bottom: 5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-btns{
      display: flex;
      align-items: center;
      gap: 2rem;
    }
  }

}
</style>
