<template>
  <MainWrapper>
    <div class="dashboard__container">
      <div class="dashboard__header">
        <MainTitle title="Ваши галактики"/>
        <MainButton title="Создать" @click="emit('show-galaxy')"/>
      </div>
      <div class="dashboard__list">
        <div
          v-for="(item, index) in planets"
          :class="['dashboard__list-item', { 'dashboard__list-item_even': index % 2 === 1 }]"
        >
          <Planet :title="item.title" :size="300" :color="item.color" type="star" :id="item.id"/>
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
import {Planets} from "@/types/interfaces";
import MainButton from "@/components/ui/button/MainButton.vue";

const emit = defineEmits<{
  (e: 'show-galaxy'): void;
}>()
const planets = ref<Array<Planets> | null>([
  {
    id: 1,
    title: 'Места',
    color: '#cf99ff'
  },
  {
    id: 2,
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