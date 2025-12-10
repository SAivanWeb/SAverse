<template>
  <div class="system">
    <div class="system__center">
      <template v-if="planets && planets.length">
        <div
          v-for="(item, index) in planets"
          :key="item.id + '-orbit'"
          class="system__orbit"
          :style="{ '--radius': `${150 + index * 110}px` }"
        ></div>

        <div
          v-for="(item, index) in planets"
          :key="item.id + '-wrapper'"
          class="system__planet-wrapper"
          :style="{
            animationDuration: `${60}s`,
            animationDelay: randomDelays[index] + 's',
            '--radius': `${150 + index * 110}px`
          }"
        >
          <Planet
            class="system__planet"
            :title="item.title"
            :size="50"
            :color="item.color"
            :type="item.type"
            :id="item.id"
            text="small"
          />
        </div>
      </template>

      <!-- Звезда -->
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
import Planet from "@/components/template/Planet.vue";
import { computed } from "vue";
import {GalaxyResponseData} from "@/api/modules/types/galaxy";

const props = defineProps<{ item: GalaxyResponseData }>();

const star = computed(() => ({
  id: props.item.id,
  title: props.item.name,
  color: props.item.color,
  type: 'star' as const
}));

const planets = computed(() =>
  props.item.planets?.map(p => ({
    id: p.id,
    title: p.name,
    color: p.color,
    type: 'planet' as const
  }))
);
const randomDelays = computed(() =>
  planets.value.map(() => -Math.random() * 30)
);
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
    z-index: 10;
  }

  &__orbit {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scaleY(0.6);
    width: calc(var(--radius) * 2);
    height: calc(var(--radius) * 2);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    pointer-events: none;
  }

  &__planet-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scaleY(0.6)
    rotate(0deg) translateX(var(--radius)) rotate(0deg);
    animation: orbit linear infinite;
    pointer-events: none;
  }

  &__planet {
    transform: scaleY(calc(1 / 0.6));
    cursor: pointer;
    pointer-events: auto;
    transition: transform 0.3s ease;
  }
}

@keyframes orbit {
  from {
    transform: translate(-50%, -50%) scaleY(0.6)
    rotate(0deg) translateX(var(--radius)) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) scaleY(0.6)
    rotate(360deg) translateX(var(--radius)) rotate(-360deg);
  }
}
</style>
