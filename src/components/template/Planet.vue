<template>
  <div class="planet" @click="handleClick" :class="classes">
    <div class="planet__icon">

      <template v-if="type === 'planet'">
        <svg
          :width="size"
          :height="size"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g>
            <path :fill="baseColor" d="M426.655,444.491c-85.064,74.278-206.9,83.839-299.319,29.581
              c-22.308-13.074-42.982-29.907-60.958-50.499C56,411.723,46.93,399.058,39.085,385.82C15.143,345.045,3.539,298.958,3.784,252.953
              c0.49-71.582,29.989-142.754,87.026-192.6C138.776,18.433,197.855-1.096,256.69,0.047c45.597,0.817,91.03,13.973,131.069,38.733
              c22.063,13.564,42.41,30.724,60.305,51.153c9.724,11.114,18.386,22.799,25.822,34.974
              C537.623,227.785,521.117,361.878,426.655,444.491z"/>

            <path :fill="baseColor" d="M107.7,89.244c99.915-87.35,248.817-74.175,333.815,23.051
              c84.998,97.226,75.388,243.379-24.528,330.729c-99.915,87.35-251.727,82.317-336.725-14.908S7.784,176.594,107.7,89.244z"/>

            <g>
              <path :fill="lighter(baseColor, 0.14)" d="M244.029,141.49c-17.92,37.27-63.032,51.341-100.302,33.421
                c-37.27-17.92-53.234-61.357-35.315-98.627c17.92-37.27,62.835-54.046,100.105-36.126
                C245.787,58.078,261.948,104.22,244.029,141.49z"/>
              <path :fill="darker(baseColor, 0.6)" fill-opacity="0.2" d="M128.086,97.65c17.92-37.27,62.835-54.046,100.105-36.126
                c4.127,1.984,7.994,4.316,11.586,6.942c-7.335-11.909-17.95-21.909-31.26-28.308c-37.27-17.92-82.185-1.144-100.105,36.126
                c-15.805,32.872-5.247,70.538,23.036,91.265C118.963,147.091,116.789,121.146,128.086,97.65z"/>
            </g>

            <path :fill="lighter(baseColor, 0.3)" d="M217.121,218.367c-1.17-5.733,2.71-11.178,8.442-12.348c5.733-1.17,11.248,2.359,12.418,8.091
              c1.17,5.733-2.456,11.466-8.189,12.635C224.06,227.916,218.291,224.099,217.121,218.367z"/>
            <path :fill="lighter(baseColor, 0.5)" d="M363.151,96.945c-1.17-5.733,2.71-11.178,8.442-12.348s11.248,2.359,12.418,8.091
              c1.17,5.733-2.456,11.466-8.189,12.636C370.089,106.493,364.32,102.677,363.151,96.945z"/>

            <path :fill="lighter(baseColor, 0.3)" d="M282.752,398.389c8.691-7.598,21.813-6.256,29.411,2.435c7.598,8.691,6.926,21.591-1.765,29.189
              c-8.691,7.598-22.059,6.972-29.657-1.719C273.143,419.603,274.061,405.987,282.752,398.389z"/>
            <path :fill="lighter(baseColor, 0.5)" d="M58.327,220.961c-1.17-5.733,2.71-11.178,8.442-12.348
              c5.733-1.17,11.248,2.359,12.418,8.091s-2.456,11.466-8.189,12.636C65.265,230.51,59.496,226.694,58.327,220.961z"/>
            <path :fill="lighter(baseColor, 0.3)" d="M468.947,281.701c-3.725,36.649-37.256,62.098-73.905,58.373
              c-36.649-3.725-63.177-35.279-59.452-71.928c3.725-36.649,36.272-64.305,72.921-60.58
              C445.16,211.292,472.673,245.052,468.947,281.701z"/>
          </g>
        </svg>
      </template>

      <template v-else-if="type === 'star'">
        <div class="planet_star" :style="{ width: size + 'px', height: size + 'px' }">
        <div
          class="planet_star__glow"
          :style="{
            filter: `
              drop-shadow(0 0 ${size * 0.2}px ${lighter(baseColor, 0.3)})
              drop-shadow(0 0 ${size * 0.4}px ${baseColor}80)
              drop-shadow(0 0 ${size * 0.8}px ${darker(baseColor, 0.2)}50)
            `,
            inset: `-${size}px`,
          }"
        >
          <svg :width="size" :height="size" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient :id="`rg-${id}`" gradientUnits="userSpaceOnUse" cx="50" cy="50" r="60">
                <stop offset="0%" :stop-color="lighter(baseColor, 0.5)"/>
                <stop offset="70%" :stop-color="baseColor"/>
                <stop offset="100%" :stop-color="darker(baseColor, 0.4)"/>
              </radialGradient>
              <mask v-if="view === 'moon'" :id="`moon-mask-${id}`">
                <rect width="100" height="100" fill="white"/>
                <circle cx="30" cy="42" r="38" fill="black"/>
              </mask>
            </defs>

            <!-- ball (default) -->
            <circle v-if="!view || view === 'ball'" cx="50" cy="50" r="50" :fill="`url(#rg-${id})`"/>
            <!-- 5-pointed star -->
            <polygon v-else-if="view === 'star'" points="50,2 61,37 98,37 68,57 79,93 50,71 21,93 32,57 2,37 39,37" :fill="`url(#rg-${id})`"/>
            <!-- heart -->
            <path v-else-if="view === 'heart'" d="M50,80 C20,60 0,45 0,28 C0,12 12,2 26,2 C38,2 47,10 50,16 C53,10 62,2 74,2 C88,2 100,12 100,28 C100,45 80,60 50,80 Z" :fill="`url(#rg-${id})`"/>
            <!-- crescent moon -->
            <circle v-else-if="view === 'moon'" cx="50" cy="50" r="48" :fill="`url(#rg-${id})`" :mask="`url(#moon-mask-${id})`"/>
            <!-- lightning bolt -->
            <polygon v-else-if="view === 'lightning'" points="58,2 22,50 48,50 38,98 78,48 52,48" :fill="`url(#rg-${id})`"/>
            <!-- fallback -->
            <circle v-else cx="50" cy="50" r="50" :fill="`url(#rg-${id})`"/>
          </svg>
        </div>
        </div>
      </template>

    </div>

    <h3 class="planet__title" :class="{ 'planet__title_planet': type === 'planet' }"
        :style="{'max-width': size + 'px'}">
      {{ title }}
    </h3>
  </div>
</template>

<script setup lang="ts">
import tinycolor from "tinycolor2";
import { useRouter } from "vue-router";
import { computed } from "vue";

const router = useRouter();

const props = defineProps<{
  id: number;
  title: string;
  color?: string;
  size?: number;
  type?: string;
  text?: string;
  view?: string;
}>();

const size = props.size ?? 100;

const baseColor = computed(() => {
  const c = props.color || "#6666ff";

  if (/^#([0-9a-fA-F]{8})$/.test(c)) {
    return "#" + c.slice(1, 7);
  }

  return c;
});

const lighter = (c: string, amt = 0.2) =>
  tinycolor(c).lighten(amt * 100).toHexString();

const darker = (c: string, amt = 0.2) =>
  tinycolor(c).darken(amt * 100).toHexString();

const withAlpha = (c: string, alpha: number) =>
  tinycolor(c).setAlpha(alpha).toRgbString();

const toGalaxy = () => {
  router.push(`/galaxy/${props.id}`);
};

const toPlanet = () => {
  router.push(`/planet/${props.id}`);
};

const handleClick = () => {
  if (props.type === "star") {
    toGalaxy();
  } else {
    toPlanet();
  }
};

const classes = computed(() => {
  const classes: string[] = [];
  if (props.text) classes.push(`planet_${props.text}`);
  return classes;
});
</script>

<style lang="scss" scoped>
.planet{
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  width: fit-content;
  gap: 24px;

  &_small{
    gap: 0;

    &:hover{
      & .planet__title{
        color: #F5F5F5;
      }
    }
    & .planet__title{
      font-size: 18px;
      color: rgba(245, 245, 245, 0.6);
    }
  }

  &_text-hidden{
    cursor: default;
    pointer-events: none;
    gap: 0;
    & .planet__title{
      display: none;
    }
  }

  &__title{
    font-size: clamp(0.8rem, 4vw, 1.4rem);
    color: #F5F5F5;
    transition: filter 0.3s, transform 0.3s;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &_planet {
      max-width: 150px !important;
    }
  }

  &:hover{
    & .planet__title{
      filter:
        drop-shadow(0 0 12px rgba(255, 255, 255, 0.55))
        drop-shadow(0 0 25px rgba(255, 255, 255, 0.2));
      transform: translateY(-2px);
    }
  }

  &_star{
    position: relative;

    &__glow {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
    }
  }
}
</style>