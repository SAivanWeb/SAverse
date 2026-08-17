<template>
  <MainWrapper>
    <div class="dashboard__container">
      <div class="dashboard__header">
        <MainTitle title="Галактики"/>
        <Add class="dashboard__header-icon" @click="emit('show-galaxy')"/>
      </div>
      <div class="dashboard__list">
        <div
          v-for="(item, index) in galaxies"
          :class="['dashboard__list-item', { 'dashboard__list-item_even': index % 2 === 1 }]"
        >
          <Planet :title="item.name" :size="starSize" :color="item.color" type="star" :id="item.id" :view="item.view"/>
        </div>
      </div>
    </div>
  </MainWrapper>
</template>

<script setup lang="ts">
import MainWrapper from "@/components/template/MainWrapper.vue";
import MainTitle from "@/components/ui/title/MainTitle.vue";
import Planet from "@/components/template/Planet.vue";
import {computed, onMounted} from "vue";
import {useGalaxyStore} from "@/store/useGalaxyStore";
import Add from "@/assets/icons/add.vue";

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

const starSize = computed(() => {
  return window.innerWidth > 900 ? 300 : 150
})

onMounted(() => {
  fetchGalaxies();
})
</script>

<style lang="scss" scoped>
.dashboard{
  &__container{
    display: flex;
    flex-direction: column;
    gap: 5rem;
    padding-bottom: 72px;
  }
  
  &__header{
    display: flex;
    align-items: center;
    justify-content: space-between;

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

  &__list{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 3rem;

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