<template>
  <div class="system">
    <div class="system__center">
      <template v-if="planets && planets.length">
        <div
          v-for="(item, index) in planets"
          :key="item.id + '-orbit'"
          class="system__orbit"
          :style="{ '--radius': `${110 + index * 85}px` }"
        ></div>


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
            animationDuration: `${60}s`,
            animationDelay: randomDelays[index] + 's',
            '--radius': `${110 + index * 85}px`
          }"
        />
      </template>

      <template v-if="star">
        <Planet
          class="system__star"
          :title="star.title"
          :size="100"
          :color="star.color"
          :type="star.type"
          :id="star.id"
          text="text-hidden"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Planets } from "@/types/interfaces";
import Planet from "@/components/template/Planet.vue";
import { computed } from "vue";

const props = defineProps<{ items: Planets[] }>();

const star = computed(() => props.items.find(item => item.type === "star"));
const planets = computed(() => props.items.filter(item => item.type === "planet"));

const randomDelays = planets.value.map(() => -Math.random() * 30);
</script>

<style lang="scss" scoped>
.system {
  position: relative;
  height: calc(100vh - 240px);
  display: flex;
  justify-content: center;

  &__center {
    position: relative;
    width: min(60vh, 60vw);
    height: min(60vh, 60vw);
    margin-top: 60px;
  }

  &__star {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: auto;
    z-index: 10;
  }

  &__orbit {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(var(--radius) * 2);
    height: calc(var(--radius) * 2);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    pointer-events: none;
  }

  &__planet {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(0deg) translateX(var(--radius)) rotate(0deg);
    animation: orbit linear infinite;
    cursor: pointer;
    pointer-events: auto;
    z-index: 20;

    &:hover {
      transform: rotate(0deg) translateX(var(--radius)) scale(1.1) rotate(0deg);
      transition: transform 0.2s ease;
    }
  }
}

@keyframes orbit {
  from {
    transform: translate(-50%, -50%) rotate(0deg) translateX(var(--radius)) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg) translateX(var(--radius)) rotate(-360deg);
  }
}
</style>
