<template>
  <MainWrapper>
    <div class="dashboard__container">
      <MainTitle title="Ваши галактики"/>
      <div class="dashboard__list">
        <div
          v-for="(item, index) in planets"
          :class="['dashboard__list-item', { 'dashboard__list-item_even': index % 2 === 1 }]"
        >
          <Planet :title="item.title" size="300" type="star"/>
        </div>
      </div>
    </div>
  </MainWrapper>
</template>

<script setup lang="ts">
import MainWrapper from "@/components/template/MainWrapper.vue";
import MainTitle from "@/components/ui/title/MainTitle.vue";
import Planet from "@/components/template/Planet.vue";
import {ref, computed, watch} from "vue";

interface Planet {
  title: string;
  color: string;
}

const planets = ref<Array<Planet> | null>([
  {
    title: 'Места',
    color: '#cf99ff'
  },
  {
    title: 'Фильмы',
    color: '#6666ff'
  },
]);


</script>

<style lang="scss" scoped>
.dashboard{
  &__container{
    display: flex;
    flex-direction: column;
    gap: 48px;
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