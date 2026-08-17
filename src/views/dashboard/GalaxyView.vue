<template>
  <MainWrapper>
    <div v-if="system" class="galaxy__header">
      <div class="galaxy__header-title">
        <Back class="galaxy__header-back" @click="goBack"/>
        <MainTitle :title="system.name" />
      </div>
      <div class="galaxy__header-btns">
        <Add v-if="system.planets.length < 5" class="galaxy__header-icon" @click="emit('show-planet')"/>
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
import {useRoute, useRouter} from "vue-router";
import StarSystem from "@/components/template/StarSystem.vue";
import {useGalaxyStore} from "@/store/useGalaxyStore";
import {Galaxy} from "@/api/modules/types/galaxy";
import Edit from "@/assets/icons/edit.vue";
import Add from "@/assets/icons/add.vue";
import Back from "@/assets/icons/back.vue";

const emit = defineEmits<{
  (e: 'show-planet'): void;
  (e: 'show-galaxy', galaxy: Galaxy): void;
}>();

const store = useGalaxyStore();
const route = useRoute();
const router = useRouter();

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

function goBack() {
  router.push('/dashboard');
}
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
    gap: 1rem;

    @media (max-width: 600px) {
      margin-bottom: 1rem;
    }

    &-title{
      display: flex;
      align-items: center;
      gap: 0.5rem;
      min-width: 0;
      flex: 1;
    }

    &-back{
      flex-shrink: 0;
      width: 22px;
      height: 22px;
      color: #fff;
      cursor: pointer;

      &:hover {
        filter:
          drop-shadow(0 0 12px rgba(255, 255, 255, 0.55))
          drop-shadow(0 0 25px rgba(255, 255, 255, 0.2));
      }
    }

    &-btns{
      flex-shrink: 0;
      display: flex;
      align-items: center;
      gap: 2rem;
      @media (max-width: 900px){
        gap: 0.8rem;
      }
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
