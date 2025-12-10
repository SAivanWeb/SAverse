<template>
  <MainWrapper>
    <div class="dashboard__container">
      <div class="dashboard__header">
        <MainTitle title="Ваши галактики"/>
        <MainButton title="Создать" @click="emit('show-galaxy')"/>
      </div>
      <div class="dashboard__list">
        <div
          v-for="(item, index) in galaxies"
          :class="['dashboard__list-item', { 'dashboard__list-item_even': index % 2 === 1 }]"
        >
          <Planet :title="item.name" :size="300" :color="item.color" type="star" :id="item.id"/>
        </div>
      </div>
    </div>
  </MainWrapper>
</template>

<script setup lang="ts">
import MainWrapper from "@/components/template/MainWrapper.vue";
import MainTitle from "@/components/ui/title/MainTitle.vue";
import Planet from "@/components/template/Planet.vue";
import {ref, computed, onMounted} from "vue";
import MainButton from "@/components/ui/button/MainButton.vue";
import {useGalaxyStore} from "@/store/useGalaxyStore";

const emit = defineEmits<{
  (e: 'show-galaxy'): void;
}>()

const store = useGalaxyStore();

const galaxies = computed(() => {
  return store.galaxies
})

async function fetchGalaxies() {
  await store.fetchGalaxies();
}

onMounted(() => {
  fetchGalaxies();
})
</script>

<style lang="scss" scoped>
.dashboard{
  &__container{
    display: flex;
    flex-direction: column;
    gap: 80px;
  }
  
  &__header{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__list{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 48px;

    &-item{
      width: 50%;
      display: flex;
      justify-content: center;
      &_even{
        margin-left: auto;
      }
    }
  }
}
</style>