<template>
  <div class="system">
    <Planet
      v-for="(item, index) in planets"
      :key="item.id"
      class="system__planet"
      :title="item.title"
      :size="50"
      :color="item.color"
      :type="item.type"
      :id="item.id"
      text="small"
      :style="{
        animationDuration: `${10 + index * 5}s`,
        transformOrigin: 'center',
        '--radius': `${150 + index * 100}px`
      }"
    />

    <template v-if="star">
      <Planet class="system__star"  :title="star.title" :size="100" :color="star.color" :type="star.type" :id="star.id" text="text-hidden"/>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Planets } from "@/types/interfaces";
import Planet from "@/components/template/Planet.vue";
import {computed, ref} from "vue";
const props = defineProps<{
  items: Planets[]
}>();

const star = computed(() => {
  return props.items.find(item => item.type === "star")
});

const planets = computed(() => {
  return props.items.filter(item => item.type === "planet")
});
</script>

<style lang="scss" scoped>
.system {
  position: relative;

  &__star{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &__planet{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: rotate(0deg) translateX(var(--radius)) rotate(0deg);
    animation: orbit linear infinite;
  }
}

@keyframes orbit {
  from {
    transform: rotate(0deg) translateX(var(--radius)) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translateX(var(--radius)) rotate(-360deg);
  }
}
</style>