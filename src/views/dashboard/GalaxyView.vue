<template>
  <MainWrapper>
    <div v-if="system" class="galaxy__header">
      <MainTitle :title="system.name" />
      <div class="galaxy__header-btns">
        <MainButton v-if="system.planets.length < 5" title="Создать" @click="emit('show-planet')"/>
        <Edit class="galaxy__header-icon" @click="editGalaxy"/>
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
import Edit from "@/assets/icons/edit.vue";

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

    @media (max-width: 600px) {
      margin-bottom: 1rem;
    }

    &-btns{
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    &-icon{
      color: #fff;
      width: 32px;
      height: 32px;
      cursor: pointer;
      &:hover {
        filter:
          drop-shadow(0 0 12px rgba(255, 255, 255, 0.55))
          drop-shadow(0 0 25px rgba(255, 255, 255, 0.2));
      }
    }
  }

  &__content{
    @media (max-width: 600px) {
      margin: 0 -20px 0 -20px !important;
    }
  }
}
</style>
