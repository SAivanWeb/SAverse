<template>
  <MainWrapper>
    <div class="galaxy__header">
      <MainTitle title="Система" />
    </div>

    <div class="galaxy__content">
      <StarSystem :items="system"/>
    </div>
  </MainWrapper>
</template>

<script setup lang="ts">
import MainWrapper from "@/components/template/MainWrapper.vue";
import MainTitle from "@/components/ui/title/MainTitle.vue";
import { ref, onMounted } from "vue";
import {useRoute} from "vue-router";
import StarSystem from "@/components/template/StarSystem.vue";
import {Planets} from "@/types/interfaces";


// const route = useRoute();
//
// const galaxyId = ref<string | null>(null);
//
// async function fetchGalaxy(): Promise<void> {
//
// }
//
// onMounted(() => {
//   const id = route.params.id
//   galaxyId.value = Array.isArray(id) ? id[0] : id ?? null
//   if (galaxyId.value) {
//     fetchGalaxy();
//   }
// });

const system = ref<Array<Planets>>([
  {
    id: 1,
    title: 'Общее',
    color: '#cf99ff',
    type: 'star'
  },
  {
    id: 2,
    title: 'Фильмы',
    color: '#6666ff',
    type: 'planet'
  },
  {
    id: 3,
    title: 'Места',
    color: '#0a6b00',
    type: 'planet'
  },
  {
    id: 4,
    title: 'Музеи',
    color: '#414184',
    type: 'planet'
  },
  {
    id: 5,
    title: 'Кафе',
    color: '#670901',
    type: 'planet'
  },
  {
    id: 6,
    title: 'Стихи',
    color: '#806e07',
    type: 'planet'
  },
]);
</script>

<style lang="scss" scoped>
.galaxy{
  &__header{
    margin-bottom: 80px;
  }

  &__content{
    width: 100%;
    height: 100%;
  }
}
</style>
